<template>
  <div class="editor-container fullheight">
    <b-row class="fullheight">
      <b-col class="fullheight">
        <monaco-editor
          class="editor"
          v-model="code"
          language="javascript"
          ref="editor"
          :theme="editorStatus.themeColor"
        ></monaco-editor>
      </b-col>
      <b-col>
        <GlobalHeader></GlobalHeader>
        <b-container :class="css.theme + ' fullheight'">
          <!-- <b-container class="fullheight" :style="`background-color:${backGroundColor}}`"> -->
          <label>input</label>
          <div :class="css.wrapper">
            <monaco-editor
              :style="`height:${editorStatus.paineSize}px`"
              class="editor-min"
              v-model="stdin"
              language
              ref="stdin"
              :theme="editorStatus.themeColor"
            ></monaco-editor>
          </div>
          <div v-if="editorStatus.errorpaineStatus">
            <table>
              <tr>
                <td>
                  <label>output</label>
                  <div :class="css.wrapper">
                    <monaco-editor
                      :style="`height:${editorStatus.paineSize}px`"
                      class="editor-min"
                      v-model="stdout"
                      language
                      ref="stdout"
                      :theme="editorStatus.themeColor"
                    ></monaco-editor>
                  </div>
                </td>
                <td>
                  <label>error</label>
                  <div :class="css.wrapper">
                    <monaco-editor
                      :style="`height:${editorStatus.paineSize}px`"
                      class="editor-min"
                      v-model="stderr"
                      language
                      ref="stderr"
                      :theme="editorStatus.themeColor  "
                    ></monaco-editor>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div v-else>
            <b-row>
              <b-col>
                <label>output</label>
                <div :class="css.wrapper">
                  <monaco-editor
                    :style="`height:${editorStatus.paineSize}px`"
                    class="editor-min"
                    v-model="stdout"
                    language
                    ref="stdout"
                    :theme="editorStatus.themeColor "
                  ></monaco-editor>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="text-right">
            <br>
            <b-row>
              <b-col cols="10">
                <b-button block variant="primary" v-on:click="run">Run</b-button>
              </b-col>
              <b-col>
                <b-button block variant="dark" v-on:click="initEditor">Init</b-button>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import GlobalHeader from './GlobalHeader'
import { defaultCode } from '@/libs/StaticStrings'
import {
  SnippetsStorage,
  EditorSettingsStorage,
  EditorChacheStorage,
  StdinStorage,
  StdoutStorage,
  StderrStorage
} from '@/libs/Storages'

export default {
  components: {
    MonacoEditor,
    GlobalHeader
  },
  data () {
    return {
      code: '',
      stdin: '',
      stdout: '',
      stderr: '',
      css: {
        theme: 'default-theme',
        wrapper: 'default-std-wrapper'
      },
      editorStatus: new EditorSettingsStorage().get()
    }
  },
  watch: {
    code () {
      new EditorChacheStorage().set(this.code)
    }
  },
  methods: {
    run () {
      this.stdout = ''
      this.stderr = ''
      let code = ''
      let stdinCode = new StdinStorage().get()
      let stdoutCode = new StdoutStorage().get()
      let stderrCode = new StderrStorage().get()
      let AC_JS_DEBUGGER = {
        __STDIN__: this.stdin,
        __STDOUT__: '',
        __STDERR__: ''
      }
      stdinCode = stdinCode
        .split('AC_JS_DEBUGGER.__STDIN__')
        .join(`\`${this.stdin}\``)
      stdoutCode = stdoutCode
        .split('AC_JS_DEBUGGER.__STDOUT__')
        .join('this.stdout')
      stderrCode = stderrCode
        .split('AC_JS_DEBUGGER.__STDERR__')
        .join('this.stderr')
      eval(stdoutCode)
      eval(stderrCode)
      code = stdinCode + '\n\n' + this.code
      let callback = new Function(code)
      callback()
    },
    initEditor () {
      let code = new SnippetsStorage().get()
      this.code = code
    }
  },
  mounted () {
    let snippetsStorage = new SnippetsStorage()
    if (snippetsStorage.get() != null) {
      this.code = snippetsStorage.get()
    } else {
      this.code = defaultCode
    }

    if (this.editorStatus.chacheStatus === true) {
      this.code = new EditorChacheStorage().get()
    }

    let theme = this.editorStatus.themeColor
    if (theme === 'vs-dark' || theme === 'hc-black') {
      this.css = {
        theme: 'dark-theme',
        wrapper: 'dark-std-wrapper'
      }
    } else {
      this.css = {
        theme: 'default-theme',
        wrapper: 'default-std-wrapper'
      }
    }

    window.addEventListener('resize', (e) => {
      location.reload()
    })
  }
}
</script>
<style>
.dark-theme {
  background-color: #1f1f1f;
  color: #f1f1f1;
}

.default-theme {
  background-color: #ffffff;
  color: #3f3f3f;
}

.editor-container {
  overflow: hidden;
  height: 100%;
}
.editor {
  height: 100%;
  width: 100%;
  position: absolute;
}
.editor-min {
  height: 200px;
  border-color: #fff;
  width: 100%;
}

.fullheight {
  height: 100%;
}

.dark-std-wrapper {
  background-color: #f1f1f1;
  padding: 1px;
}

.default-std-wrapper {
  background-color: #1f1f1f;
  padding: 1px;
}

table {
  width: 100%;
}∏
table > tr {
  width: 100%;
}
tr > td {
  width: 50%;
}
</style>
