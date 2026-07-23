/** AtCoder と同様に、行末や連続空白の違いを無視してトークン列を比較する。 */
export function isOutputAccepted(expected: string, actual: string): boolean {
  const tokens = (value: string) => value.trim().split(/\s+/);
  const expectedTokens = tokens(expected);
  const actualTokens = tokens(actual);

  if (expectedTokens.length !== actualTokens.length) {
    return false;
  }
  return expectedTokens.every((token, index) => token === actualTokens[index]);
}
