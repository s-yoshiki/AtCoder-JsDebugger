import type { PageKey } from '@/config/routes';

export interface PageMeta {
  /** 画面の見出し。 */
  title: string;
  /** 見出しの下と meta description に使う一文。 */
  description: string;
  /** <title> に使う、単体で意味が通る文言。 */
  documentTitle?: string;
}

export interface Dictionary {
  localeName: string;
  siteTitle: string;
  siteDescription: string;
  pages: Record<PageKey, PageMeta>;
  notFound: {
    documentTitle: string;
    title: string;
    back: string;
  };
  header: {
    nav: string;
    editor: string;
    config: string;
    toDark: string;
    toLight: string;
    github: string;
    language: string;
  };
  editor: {
    run: string;
    stop: string;
    reset: string;
    shortcutHint: string;
    source: string;
    input: string;
    output: string;
    error: string;
    copy: (label: string) => string;
    clear: (label: string) => string;
    resize: string;
    loading: string;
  };
  runner: {
    timeout: (ms: number) => string;
    aborted: string;
    unknown: string;
  };
  configIndex: {
    highlights: { title: string; body: string }[];
  };
  settings: {
    intro: string;
    saved: string;
    cleared: string;
    confirmClear: string;
    themeOptions: { auto: string; light: string; dark: string; hc: string };
    paneSizeOptions: {
      small: string;
      default: string;
      large: string;
      xlarge: string;
    };
    timeoutOptions: (seconds: number) => string;
    rows: {
      stderr: { title: string; description: string };
      cache: { title: string; description: string };
      theme: { title: string; description: string };
      fontSize: { title: string; description: string };
      wordWrap: { title: string; description: string };
      minimap: { title: string; description: string };
      paneSize: { title: string; description: string };
      timeout: { title: string; description: string };
      reset: { title: string; description: string };
    };
  };
  codeSetting: {
    save: string;
    reset: string;
    saved: string;
    resetDone: string;
  };
  hooks: {
    snippets: string;
    stdin: string;
    stdout: string;
    stderr: string;
  };
  exportSettings: {
    intro: string;
    download: string;
    copy: string;
  };
  importSettings: {
    intro: string;
    save: string;
    chooseFile: string;
    applied: (count: number) => string;
    errors: {
      invalidJson: string;
      notAnObject: string;
      missingData: string;
      nothingApplied: string;
    };
  };
  about: {
    lead: string;
    shortcutsHeading: string;
    shortcuts: { keys: string; description: string }[];
    environmentHeading: string;
    environment: { title: string; body: string }[];
    linksHeading: string;
    blogLabel: string;
  };
}

export const ja: Dictionary = {
  localeName: '日本語',
  siteTitle: 'AtCoder-JsDebugger',
  siteDescription:
    'AtCoder の JavaScript 提出コードを、書き換えずにブラウザ上で実行・デバッグできるエディタ。標準入出力を再現し、コードも設定もローカルに保存されます。',

  pages: {
    editor: {
      title: 'Editor',
      description:
        'AtCoder 提出用の JavaScript を、標準入力を与えてそのまま実行できるエディタです。',
      documentTitle: 'AtCoder-JsDebugger | ブラウザで動く JavaScript 実行環境',
    },
    config: {
      title: 'Config',
      description: '設定',
      documentTitle: '設定',
    },
    editorSettings: {
      title: 'Editor Settings',
      description: 'エディタの設定を変更します。',
    },
    snippets: {
      title: 'Snippets',
      description: '初期状態で表示されるエディタのコードを編集します。',
    },
    stdin: {
      title: 'Standard Input',
      description: 'コード実行時の標準入力の設定を行います。',
    },
    stdout: {
      title: 'Standard Output',
      description: 'コード実行時の標準出力の設定を行います。',
    },
    stderr: {
      title: 'Standard Error',
      description: 'コード実行時の標準エラー出力の設定を行います。',
    },
    importSettings: {
      title: 'Import Settings',
      description: '設定情報の JSON を読み込みます。',
    },
    exportSettings: {
      title: 'Export Settings',
      description: '設定情報を JSON に出力します。',
    },
    about: {
      title: 'About',
      description: 'AtCoder-JsDebugger について',
    },
  },

  notFound: {
    documentTitle: 'ページが見つかりません',
    title: 'ページが見つかりません',
    back: 'エディタに戻る',
  },

  header: {
    nav: 'メイン',
    editor: 'Editor',
    config: 'Config',
    toDark: 'ダークモードに切り替え',
    toLight: 'ライトモードに切り替え',
    github: 'GitHub リポジトリ (新しいタブで開く)',
    language: '言語',
  },

  editor: {
    run: 'Run',
    stop: 'Stop',
    reset: 'Reset',
    shortcutHint: 'で実行',
    source: 'ソースコード',
    input: 'Input',
    output: 'Output',
    error: 'Error',
    copy: (label) => `${label} をコピー`,
    clear: (label) => `${label} をクリア`,
    resize: 'ペインの幅を変更',
    loading: 'エディタを読み込んでいます',
  },

  runner: {
    timeout: (ms) =>
      `実行時間が ${ms} ms を超えたため中断しました。無限ループになっていないか確認してください。`,
    aborted: '実行を中断しました。',
    unknown: '実行中に不明なエラーが発生しました。',
  },

  configIndex: {
    highlights: [
      {
        title: 'ローカル保存',
        body: '設定内容はブラウザの localStorage に保存されます。',
      },
      {
        title: '外部送信なし',
        body: 'エディタで書いたコードや設定は外部に送信されません。',
      },
      {
        title: 'Worker 実行',
        body: 'コードは Web Worker 内で動くため、無限ループでも画面は固まりません。',
      },
    ],
  },

  settings: {
    intro: '変更した内容はその場で保存されます。',
    saved: '保存しました',
    cleared: '初期化しました',
    confirmClear: 'すべての設定と保存されたコードを初期化します。',
    themeOptions: {
      auto: 'アプリのテーマに追従',
      light: 'ライト',
      dark: 'ダーク',
      hc: 'ハイコントラスト',
    },
    paneSizeOptions: {
      small: 'small (150px)',
      default: 'default (200px)',
      large: 'large (250px)',
      xlarge: 'x-large (320px)',
    },
    timeoutOptions: (seconds) => `${seconds} 秒`,
    rows: {
      stderr: {
        title: 'エラーコンソールの有効化',
        description:
          'console.error() / console.warn() の出力ペインを表示します。',
      },
      cache: {
        title: 'キャッシュの有効化',
        description:
          'エディタを開いた際に、最後に編集していた内容を復元します。',
      },
      theme: {
        title: 'テーマの変更',
        description: 'エディタに適用する配色を変更します。',
      },
      fontSize: {
        title: 'フォントサイズ',
        description: 'エディタの文字の大きさを変更します。',
      },
      wordWrap: {
        title: '折り返し',
        description: '長い行をエディタの幅で折り返します。',
      },
      minimap: {
        title: 'ミニマップ',
        description: 'エディタ右側にコード全体の縮小表示を出します。',
      },
      paneSize: {
        title: '標準入出力ペインのサイズ',
        description: '入力・出力ペインの高さを変更します。',
      },
      timeout: {
        title: '実行タイムアウト',
        description:
          'この時間を超えた実行は打ち切ります。無限ループを書いてしまってもタブは固まりません。',
      },
      reset: {
        title: '設定の初期化',
        description:
          'スニペットや標準入出力の設定を含め、すべてを初期状態に戻します。',
      },
    },
  },

  codeSetting: {
    save: '保存',
    reset: '初期化',
    saved: '保存しました',
    resetDone: '初期化しました',
  },

  hooks: {
    snippets:
      'エディタを開いたとき、および Reset を押したときに読み込まれるコードです。',
    stdin:
      'ユーザーコードの前に評価されます。AC_JS_DEBUGGER.__STDIN__ に Input ペインの内容が入るので、require("fs") などを差し替えて標準入力を再現します。',
    stdout:
      'AC_JS_DEBUGGER.__STDOUT__ に追記した文字列が Output ペインに表示されます。',
    stderr:
      'AC_JS_DEBUGGER.__STDERR__ に追記した文字列が Error ペインに表示されます。Error ペインは Editor Settings から表示を切り替えられます。',
  },

  exportSettings: {
    intro:
      '現在の設定を JSON として書き出します。編集中のコード (キャッシュ) は含まれません。',
    download: 'JSON をダウンロード',
    copy: 'コピー',
  },

  importSettings: {
    intro:
      'Export Settings で書き出した JSON を貼り付けるか、ファイルから読み込んで保存してください。既存の設定は上書きされます。',
    save: '保存',
    chooseFile: 'ファイルを選択',
    applied: (count) => `${count} 件の設定を読み込みました`,
    errors: {
      invalidJson: 'JSON として解釈できませんでした',
      notAnObject: 'JSON のトップレベルがオブジェクトではありません',
      missingData: '"data" が見つかりません',
      nothingApplied: '取り込める設定が含まれていません',
    },
  },

  about: {
    lead: 'コードは Web Worker の中で実行され、ネットワークには送信されません。',
    shortcutsHeading: 'キーボードショートカット',
    shortcuts: [
      { keys: 'Ctrl / ⌘ + Enter', description: 'コードを実行' },
      { keys: 'Ctrl / ⌘ + F', description: 'エディタ内を検索' },
      { keys: 'Alt + ↑ / ↓', description: '行を移動' },
    ],
    environmentHeading: '動作環境',
    environment: [
      {
        title: 'ブラウザ',
        body: 'Chrome / Edge / Firefox / Safari の最新版',
      },
      { title: '画面サイズ', body: '1280 x 720 以上を推奨' },
      { title: 'JavaScript', body: 'ES2022 / Web Worker 対応' },
    ],
    linksHeading: 'リンク',
    blogLabel: 's-yoshiki / tech blog',
  },
};
