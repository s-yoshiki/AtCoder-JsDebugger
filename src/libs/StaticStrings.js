/* eslint-disable */
export default ''

export const defaultCode = `"use strict"
function main(arg) {
    console.log(arg.trim().split("\\n")[0])
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));`

export const defaultStdin = `
/**
 * 標準入力
 */
let require = (arg) => {
  return {
    readFileSync : (type, string_type) => {
      return AC_JS_DEBUGGER.__STDIN__
    }
  }
}
`.trim()
export const defaultStdout = `
/**
 * 標準出力
 */
console.log = (arg) => {
    AC_JS_DEBUGGER.__STDOUT__ += String(arg) + "\\n"
}
`.trim()
export const defaultStderr = `
/**
 * 標準エラー出力
 */
console.error = (arg) => {
    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"
}
console.warn =  (arg) => {
    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"
}
`.trim()