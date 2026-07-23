/**
 * 実行環境に注入される既定のコード片。
 *
 * 標準入出力のフックは `AC_JS_DEBUGGER` オブジェクト経由で値をやり取りする。
 * このオブジェクトは実行時に Worker 側から関数引数として渡されるため、
 * ユーザーが書き換えたフックコードからもそのまま参照できる。
 */

export const DEFAULT_CODE = `"use strict"
function main(arg) {
    console.log(arg.trim().split("\\n")[0])
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));`;

export const DEFAULT_STDIN_HOOK = `/**
 * 標準入力
 */
let require = (arg) => {
  return {
    readFileSync : (type, string_type) => {
      return AC_JS_DEBUGGER.__STDIN__
    }
  }
}`;

export const DEFAULT_STDOUT_HOOK = `/**
 * 標準出力
 */
console.log = (arg) => {
    AC_JS_DEBUGGER.__STDOUT__ += String(arg) + "\\n"
}`;

export const DEFAULT_STDERR_HOOK = `/**
 * 標準エラー出力
 */
console.error = (arg) => {
    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"
}
console.warn =  (arg) => {
    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"
}`;

export const SAMPLE_STDIN = '';
