import type { Dictionary } from './ja';

export const en: Dictionary = {
  localeName: 'English',
  siteTitle: 'AtCoder-JsDebugger',
  siteDescription:
    'Run and debug AtCoder JavaScript submissions in the browser, unmodified. It emulates standard input and output, and keeps your code and settings on your own machine.',

  pages: {
    editor: {
      title: 'Editor',
      description:
        'Write JavaScript the way you submit it to AtCoder, feed it standard input, and run it right here.',
      documentTitle: 'AtCoder-JsDebugger | JavaScript playground for AtCoder',
    },
    config: {
      title: 'Config',
      description: 'Settings',
      documentTitle: 'Settings',
    },
    editorSettings: {
      title: 'Editor Settings',
      description: 'Change how the editor looks and behaves.',
    },
    snippets: {
      title: 'Snippets',
      description: 'Edit the code the editor starts with.',
    },
    stdin: {
      title: 'Standard Input',
      description: 'Configure how standard input is emulated.',
    },
    stdout: {
      title: 'Standard Output',
      description: 'Configure how standard output is captured.',
    },
    stderr: {
      title: 'Standard Error',
      description: 'Configure how standard error is captured.',
    },
    importSettings: {
      title: 'Import Settings',
      description: 'Load settings from a JSON file.',
    },
    exportSettings: {
      title: 'Export Settings',
      description: 'Write the current settings out as JSON.',
    },
    about: {
      title: 'About',
      description: 'About AtCoder-JsDebugger',
    },
  },

  notFound: {
    documentTitle: 'Page not found',
    title: 'Page not found',
    back: 'Back to the editor',
  },

  header: {
    nav: 'Main',
    editor: 'Editor',
    config: 'Config',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    github: 'GitHub repository (opens in a new tab)',
    language: 'Language',
  },

  editor: {
    run: 'Run',
    stop: 'Stop',
    reset: 'Reset',
    shortcutHint: 'to run',
    source: 'Source code',
    input: 'Input',
    output: 'Output',
    error: 'Error',
    copy: (label) => `Copy ${label.toLowerCase()}`,
    clear: (label) => `Clear ${label.toLowerCase()}`,
    resize: 'Resize panes',
    loading: 'Loading the editor',
  },

  runner: {
    timeout: (ms) =>
      `Stopped after ${ms} ms. Check whether the code is caught in an infinite loop.`,
    aborted: 'Execution was stopped.',
    unknown: 'An unknown error occurred while running the code.',
  },

  configIndex: {
    highlights: [
      {
        title: 'Stored locally',
        body: 'Settings live in your browser’s localStorage.',
      },
      {
        title: 'Never sent anywhere',
        body: 'Neither the code you write nor your settings leave the browser.',
      },
      {
        title: 'Runs in a Worker',
        body: 'Code runs inside a Web Worker, so an infinite loop never freezes the page.',
      },
    ],
  },

  settings: {
    intro: 'Changes are saved as you make them.',
    saved: 'Saved',
    cleared: 'Reset to defaults',
    confirmClear: 'This resets every setting and any saved code.',
    themeOptions: {
      auto: 'Follow the app theme',
      light: 'Light',
      dark: 'Dark',
      hc: 'High contrast',
    },
    paneSizeOptions: {
      small: 'Small (150px)',
      default: 'Default (200px)',
      large: 'Large (250px)',
      xlarge: 'X-large (320px)',
    },
    timeoutOptions: (seconds) => `${seconds} seconds`,
    rows: {
      stderr: {
        title: 'Show the error console',
        description: 'Adds a pane for console.error() and console.warn().',
      },
      cache: {
        title: 'Restore the last session',
        description: 'Reopens the editor with whatever you last had in it.',
      },
      theme: {
        title: 'Editor theme',
        description: 'Choose the colour scheme applied to the editor.',
      },
      fontSize: {
        title: 'Font size',
        description: 'Change the size of the text in the editor.',
      },
      wordWrap: {
        title: 'Word wrap',
        description: 'Wrap long lines at the width of the editor.',
      },
      minimap: {
        title: 'Minimap',
        description: 'Show the scaled-down overview on the right edge.',
      },
      paneSize: {
        title: 'Input and output pane height',
        description: 'Change how tall the input and output panes are.',
      },
      timeout: {
        title: 'Execution timeout',
        description:
          'Runs longer than this are cut off, so an infinite loop never locks up the tab.',
      },
      reset: {
        title: 'Reset everything',
        description:
          'Restores the defaults, including snippets and the standard I/O hooks.',
      },
    },
  },

  codeSetting: {
    save: 'Save',
    reset: 'Reset',
    saved: 'Saved',
    resetDone: 'Reset to defaults',
  },

  hooks: {
    snippets:
      'The code loaded when you open the editor and when you press Reset.',
    stdin:
      'Evaluated before your code. AC_JS_DEBUGGER.__STDIN__ holds the contents of the Input pane, so you can swap out require("fs") to emulate standard input.',
    stdout:
      'Whatever you append to AC_JS_DEBUGGER.__STDOUT__ shows up in the Output pane.',
    stderr:
      'Whatever you append to AC_JS_DEBUGGER.__STDERR__ shows up in the Error pane. You can toggle that pane under Editor Settings.',
  },

  exportSettings: {
    intro:
      'Writes the current settings out as JSON. The code you are editing (the cache) is not included.',
    download: 'Download JSON',
    copy: 'Copy',
  },

  importSettings: {
    intro:
      'Paste JSON produced by Export Settings, or load it from a file, then save. Existing settings are overwritten.',
    save: 'Save',
    chooseFile: 'Choose a file',
    applied: (count) => `Loaded ${count} setting${count === 1 ? '' : 's'}`,
    errors: {
      invalidJson: 'That is not valid JSON',
      notAnObject: 'The top level of the JSON is not an object',
      missingData: '"data" is missing',
      nothingApplied: 'Nothing in the file could be imported',
    },
  },

  about: {
    lead: 'Your code runs inside a Web Worker and is never sent over the network.',
    shortcutsHeading: 'Keyboard shortcuts',
    shortcuts: [
      { keys: 'Ctrl / ⌘ + Enter', description: 'Run the code' },
      { keys: 'Ctrl / ⌘ + F', description: 'Search within the editor' },
      { keys: 'Alt + ↑ / ↓', description: 'Move the current line' },
    ],
    environmentHeading: 'Requirements',
    environment: [
      {
        title: 'Browser',
        body: 'A recent Chrome, Edge, Firefox or Safari',
      },
      { title: 'Screen', body: '1280 x 720 or larger recommended' },
      { title: 'JavaScript', body: 'ES2022 and Web Workers' },
    ],
    linksHeading: 'Links',
    blogLabel: 's-yoshiki / tech blog',
  },
};
