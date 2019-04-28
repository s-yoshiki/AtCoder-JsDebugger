export default ''

export const defaultCode = `function main(arg) {
    console.log(arg.trim().split("\\n")[0])
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));`