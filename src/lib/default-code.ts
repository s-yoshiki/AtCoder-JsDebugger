export type SourceLanguage = 'javascript' | 'typescript';

export interface EditorDrafts {
  javascript: string;
  typescript: string;
}

export const DEFAULT_CODE: EditorDrafts = {
  javascript: `const main = (input) => {
  const values = input.trim().split(/\\s+/).map(Number);
  console.log(values.reduce((sum, value) => sum + value, 0));
};

main(require("fs").readFileSync(0, "utf8"));`,
  typescript: `const main = (input: string): void => {
  const values = input.trim().split(/\\s+/).map(Number);
  console.log(values.reduce((sum, value) => sum + value, 0));
};

main(require("fs").readFileSync(0, "utf8"));`,
};

export const DEFAULT_LANGUAGE: SourceLanguage = 'typescript';
export const SAMPLE_STDIN = '1 2 3';
