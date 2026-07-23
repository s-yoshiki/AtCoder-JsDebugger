import type { Dictionary } from './ja';

export const en: Dictionary = {
  localeName: 'English',
  siteTitle: 'AtCoder-JsDebugger',
  siteDescription:
    'Run and debug AtCoder JavaScript and TypeScript submissions in the browser. Test standard input against expected output while keeping code on your own machine.',

  pages: {
    editor: {
      title: 'Editor',
      description:
        'Run JavaScript and TypeScript in the browser with standard input and expected-output judging.',
      documentTitle: 'AtCoder-JsDebugger | TypeScript playground for AtCoder',
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
    expected: 'Expected',
    output: 'Output',
    error: 'Error',
    language: 'Execution language',
    format: 'Format document (Shift + Alt + F)',
    toggleWrap: 'Toggle word wrap (Alt + Z)',
    toggleMinimap: 'Toggle minimap',
    focus: 'Expand the editor',
    exitFocus: 'Show input and output',
    nextProblem: 'Go to next problem (F8)',
    status: {
      ready: 'Ready',
      running: 'Running',
      completed: 'Completed',
      accepted: 'Accepted',
      wrongAnswer: 'Wrong Answer',
      failed: 'Failed',
    },
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
        title: 'TypeScript ready',
        body: 'Use Monaco type diagnostics, then compile and run TypeScript entirely in the browser.',
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
          'Restores every setting, saved draft, input and expected output.',
      },
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
      { title: 'JavaScript / TypeScript', body: 'ES2022 and Web Workers' },
    ],
    linksHeading: 'Links',
    blogLabel: 's-yoshiki / tech blog',
  },
};
