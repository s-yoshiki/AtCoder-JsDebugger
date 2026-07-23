/// <reference lib="webworker" />
import * as ts from 'typescript';
import type { RunRequest, RunResponse } from './protocol';

const AsyncFunction = Object.getPrototypeOf(async () => undefined)
  .constructor as new (
  ...args: string[]
) => (...values: unknown[]) => Promise<void>;

function describe(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ?? `${error.name}: ${error.message}`;
  }
  return String(error);
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'bigint') {
    return `${value}n`;
  }
  if (value instanceof Error) {
    return value.stack ?? `${value.name}: ${value.message}`;
  }
  if (typeof value === 'object' && value !== null) {
    try {
      return JSON.stringify(
        value,
        (_key, nested) => (typeof nested === 'bigint' ? `${nested}n` : nested),
        2,
      );
    } catch {
      return String(value);
    }
  }
  return String(value);
}

function formatLine(values: unknown[]): string {
  return `${values.map(formatValue).join(' ')}\n`;
}

function formatDiagnostic(diagnostic: ts.Diagnostic): string {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  if (!diagnostic.file || diagnostic.start === undefined) {
    return `TS${diagnostic.code}: ${message}`;
  }
  const position = diagnostic.file.getLineAndCharacterOfPosition(
    diagnostic.start,
  );
  return `${position.line + 1}:${position.character + 1} TS${diagnostic.code}: ${message}`;
}

function compile(code: string, language: RunRequest['language']) {
  if (language === 'javascript') {
    return { code, error: null };
  }

  const result = ts.transpileModule(code, {
    fileName: 'main.ts',
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      strict: true,
    },
  });
  const errors = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );

  return {
    code: result.outputText,
    error: errors.length > 0 ? errors.map(formatDiagnostic).join('\n') : null,
  };
}

self.onmessage = async (event: MessageEvent<RunRequest>) => {
  const { code, language, stdin } = event.data;
  let stdout = '';
  let stderr = '';
  const compiled = compile(code, language);

  if (compiled.error) {
    const response: RunResponse = {
      stdout,
      stderr,
      error: compiled.error,
      errorKind: 'compile',
    };
    self.postMessage(response);
    return;
  }

  const consoleShim = {
    log: (...values: unknown[]) => {
      stdout += formatLine(values);
    },
    info: (...values: unknown[]) => {
      stdout += formatLine(values);
    },
    error: (...values: unknown[]) => {
      stderr += formatLine(values);
    },
    warn: (...values: unknown[]) => {
      stderr += formatLine(values);
    },
  };
  const fs = {
    readFileSync: (_path: unknown, _encoding?: unknown) => stdin,
  };
  const requireShim = (moduleName: string) => {
    if (moduleName === 'fs' || moduleName === 'node:fs') {
      return fs;
    }
    throw new Error(`Module "${moduleName}" is not available in the browser.`);
  };
  const processShim = {
    stdin: { fd: 0 },
    stdout: { write: (value: unknown) => (stdout += String(value)) },
    stderr: { write: (value: unknown) => (stderr += String(value)) },
  };
  const moduleShim = { exports: {} as unknown };

  let error: string | null = null;
  try {
    const run = new AsyncFunction(
      'require',
      'console',
      'process',
      'module',
      'exports',
      compiled.code,
    );
    await run(
      requireShim,
      consoleShim,
      processShim,
      moduleShim,
      moduleShim.exports,
    );
  } catch (caught) {
    error = describe(caught);
  }

  const response: RunResponse = {
    stdout,
    stderr,
    error,
    errorKind: error ? 'runtime' : null,
  };
  self.postMessage(response);
};
