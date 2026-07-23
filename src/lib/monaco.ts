import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import type { EditorTheme } from './settings';
import type { AppTheme } from './theme';

/**
 * Monaco を自前でバンドルする。
 * `@monaco-editor/react` は既定で CDN から読み込むが、このアプリは
 * 「コードを外部に送信しない」ことが売りなので同梱する。
 *
 * monaco-editor 0.56 の言語ワーカーは `new Worker(new URL(..., import.meta.url))`
 * で生成されるため、Vite がそのまま解決してくれる。
 * `MonacoEnvironment` の手当ては不要。
 */

export const MONACO_LIGHT = 'ajd-light';
export const MONACO_DARK = 'ajd-dark';

// アプリ側のパレット (globals.css) と地の色を揃え、
// エディタが周囲から浮かないようにする。
monaco.editor.defineTheme(MONACO_LIGHT, {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#ffffff',
    'editor.lineHighlightBackground': '#f4f5f8',
    'editorLineNumber.foreground': '#a8b0bd',
    'editorLineNumber.activeForeground': '#616b7a',
    'editorGutter.background': '#ffffff',
    'editorIndentGuide.background1': '#e3e6ec',
    'editorWidget.background': '#ffffff',
    'editorWidget.border': '#e3e6ec',
    'scrollbarSlider.background': '#ccd1da66',
  },
});

monaco.editor.defineTheme(MONACO_DARK, {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#171a21',
    'editor.foreground': '#e7e9ee',
    'editor.lineHighlightBackground': '#1e222b',
    'editorLineNumber.foreground': '#4d5566',
    'editorLineNumber.activeForeground': '#9aa3b2',
    'editorGutter.background': '#171a21',
    'editorIndentGuide.background1': '#272c37',
    'editorWidget.background': '#1e222b',
    'editorWidget.border': '#272c37',
    'scrollbarSlider.background': '#3a415066',
  },
});

loader.config({ monaco });

const runtimeTypes = `
declare module "fs" {
  export function readFileSync(
    path: string | number,
    encoding?: "utf8" | "utf-8"
  ): string;
}
declare module "node:fs" {
  export * from "fs";
}
declare function require(moduleName: "fs" | "node:fs"): typeof import("fs");
declare const process: {
  stdin: { fd: 0 };
  stdout: { write(value: unknown): void };
  stderr: { write(value: unknown): void };
};
`;

const compilerOptions: monaco.typescript.CompilerOptions = {
  target: monaco.typescript.ScriptTarget.ESNext,
  module: monaco.typescript.ModuleKind.CommonJS,
  moduleResolution: monaco.typescript.ModuleResolutionKind.NodeJs,
  allowNonTsExtensions: true,
  esModuleInterop: true,
  strict: true,
};

monaco.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
monaco.typescript.javascriptDefaults.setCompilerOptions({
  ...compilerOptions,
  allowJs: true,
  checkJs: false,
});
monaco.typescript.typescriptDefaults.addExtraLib(
  runtimeTypes,
  'file:///atcoder-runtime.d.ts',
);
monaco.typescript.javascriptDefaults.addExtraLib(
  runtimeTypes,
  'file:///atcoder-runtime.d.ts',
);

/** 設定値とアプリのテーマから、実際に使う Monaco のテーマ名を決める。 */
export function resolveMonacoTheme(
  setting: EditorTheme,
  appTheme: AppTheme,
): string {
  switch (setting) {
    case 'light':
      return MONACO_LIGHT;
    case 'dark':
      return MONACO_DARK;
    case 'high-contrast':
      return 'hc-black';
    default:
      return appTheme === 'dark' ? MONACO_DARK : MONACO_LIGHT;
  }
}
