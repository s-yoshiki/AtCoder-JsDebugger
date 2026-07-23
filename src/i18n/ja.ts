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
    expected: string;
    output: string;
    error: string;
    language: string;
    format: string;
    toggleWrap: string;
    toggleMinimap: string;
    focus: string;
    exitFocus: string;
    nextProblem: string;
    status: {
      ready: string;
      running: string;
      completed: string;
      accepted: string;
      wrongAnswer: string;
      failed: string;
    };
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
    'AtCoder の JavaScript・TypeScript 提出コードをブラウザ上で実行・デバッグできるエディタ。標準入出力と出力判定に対応し、コードはローカルに保存されます。',

  pages: {
    editor: {
      title: 'Editor',
      description:
        'JavaScript・TypeScript を、標準入力と期待出力を与えてブラウザ上で実行できます。',
      documentTitle: 'AtCoder-JsDebugger | ブラウザで動く TypeScript 実行環境',
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
    expected: 'Expected',
    output: 'Output',
    error: 'Error',
    language: '実行言語',
    format: 'ドキュメントを整形 (Shift + Alt + F)',
    toggleWrap: '行の折り返しを切り替え (Alt + Z)',
    toggleMinimap: 'ミニマップを切り替え',
    focus: 'エディタを広げる',
    exitFocus: '入出力ペインを表示',
    nextProblem: '次の問題へ移動 (F8)',
    status: {
      ready: 'Ready',
      running: 'Running',
      completed: 'Completed',
      accepted: 'Accepted',
      wrongAnswer: 'Wrong Answer',
      failed: 'Failed',
    },
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
        title: 'TypeScript 対応',
        body: 'Monaco の型診断を使いながら、TypeScript をブラウザ内でコンパイル・実行できます。',
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
          '保存されたコードや入出力を含め、すべてを初期状態に戻します。',
      },
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
      { title: 'JavaScript / TypeScript', body: 'ES2022 / Web Worker 対応' },
    ],
    linksHeading: 'リンク',
    blogLabel: 's-yoshiki / tech blog',
  },
};
