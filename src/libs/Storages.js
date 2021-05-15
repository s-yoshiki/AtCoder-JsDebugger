/* eslint-disable */
import LocalStorage from './LocalStorage'
import { defaultCode, defaultStdin, defaultStdout, defaultStderr } from '@/libs/StaticStrings'

export default undefined

export const keys = {
  EDITOR_SETTINGS: 'editor_settings',
  SNIPPETS: 'snippets',
  STDIN: 'stdin',
  STDOUT: 'stdout',
  STDERR: 'stderr',
  EDITOR_CHACHE: 'editor_chache',
}

/**
 * エディタ設定
 */
export class EditorSettingsStorage extends LocalStorage {
  constructor() {
    super(keys.EDITOR_SETTINGS, {
      errorpaineStatus: false,
      chacheStatus: false,
      themeColor: 'vs',
      paineSize: '200',
    })
  }
}
/**
 * スニペット
 */
export class SnippetsStorage extends LocalStorage {
  constructor() {
    super(keys.SNIPPETS, defaultCode)
  }
}
/**
 * 標準入力
 */
export class StdinStorage extends LocalStorage {
  constructor() {
    super(keys.STDIN, defaultStdin)
  }
}
/**
 * 標準出力
 */
export class StdoutStorage extends LocalStorage {
  constructor() {
    super(keys.STDOUT, defaultStdout)
  }
}
/**
 * 標準エラー出力
 */
export class StderrStorage extends LocalStorage {
  constructor() {
    super(keys.STDERR, defaultStderr)
  }
}
/**
 * エディタキャッシュ
 */
export class EditorChacheStorage extends LocalStorage {
  constructor() {
    super(keys.EDITOR_CHACHE, '')
  }
}