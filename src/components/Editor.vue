<template>
  <div class="editor-container fullheight">
    <b-row class="fullheight">
      <b-col class="fullheight">
        <monaco-editor
          class="editor"
          v-model="code"
          language="javascript"
          ref="editor"
          theme="vs-dark"
        ></monaco-editor>
      </b-col>
      <b-col>
        <GlobalHeader></GlobalHeader>
        <b-container class="fullheight">
          <label>input</label>
          <div class="std-wrapper">
            <monaco-editor
              style="height:200px;"
              class="editor-min"
              v-model="stdin"
              language
              ref="stdin"
              theme="vs-dark"
            ></monaco-editor>
          </div>
          <div v-if="editorStatus.errorpaineStatus">
            <table>
              <tr>
                <td>
                  <label>output</label>
                <div class="std-wrapper">
                  <monaco-editor
                    style="height:200px;"
                    class="editor-min"
                    v-model="stdout"
                    language
                    ref="stdout"
                    theme="vs-dark"
                  ></monaco-editor>
                </div>
                </td>
                <td>
                                  <label>error</label>
                <div class="std-wrapper">
                  <monaco-editor
                    style="height:200px;"
                    class="editor-min"
                    v-model="stderr"
                    language
                    ref="stderr"
                    theme="vs-dark"
                  ></monaco-editor>
                </div>
                </td>
              </tr>
            </table>
            <!-- <b-row>
              <b-col>
                <label>output</label>
                <div class="std-wrapper">
                  <monaco-editor
                    style="height:100px;"
                    class="editor-min"
                    v-model="stdout"
                    language
                    ref="stdout"
                    theme="vs-dark"
                  ></monaco-editor>
                </div>
              </b-col>
              <b-col>
                <label>error</label>
                <div class="std-wrapper">
                  <monaco-editor
                    style="height:100px;"
                    class="editor-min"
                    v-model="stderr"
                    language
                    ref="stderr"
                    theme="vs-dark"
                  ></monaco-editor>
                </div>
              </b-col>
            </b-row> -->
          </div>
          <div v-else>
            <b-row>
              <b-col>
                <label>output</label>
                <div class="std-wrapper">
                  <monaco-editor
                    style="height:200px;"
                    class="editor-min"
                    v-model="stdout"
                    language
                    ref="stdout"
                    theme="vs-dark"
                  ></monaco-editor>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="text-right">
            <br>
            <b-button block variant="primary" v-on:click="run">Run</b-button>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";
import GlobalHeader from "./GlobalHeader";
import SnippetsStorage from "@/libs/SnippetsStorage";
import { defaultCode } from "@/libs/StaticStrings";
import EditorSettingsStorage from "@/libs/EditorSettingsStorage";

export default {
  components: {
    MonacoEditor,
    GlobalHeader
  },
  data() {
    return {
      code: '',
      stdin: "",
      stdout: "",
      stderr: "",
      editorStatus: {}
    };
  },
  methods: {
    run() {
      this.stdout = "";
      this.stderr = "";
      let code = this.getStdio() + "\n";
      code += this.code;
      eval(`
      console.log = arg => {this.stdout += String(arg) + "\n"}
      console.error = arg => {this.stderr += String(arg) + "\n"}
      `)
      let callback = new Function(code);
      callback();
    },
    getStdio() {
      return `
      let require = (arg)  => {
        return {
          readFileSync : (type, string_type) => {
            return \`${this.stdin}\`  
          }
        }
      }`;
    }
  },
  mounted() {
    let snippetsStorage = new SnippetsStorage();
    if (snippetsStorage.get() != null) {
      this.code = snippetsStorage.get();
    } else {
      this.code = defaultCode;
    }
    let editorStorage = new EditorSettingsStorage();
    if (editorStorage.get() !== null) {
      this.editorStatus = editorStorage.get();
    }
  }
};
</script>

<style>
.editor-container {
  overflow: hidden;
  height: 100%;
  background-color: #1f1f1f;
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

.editor-half {
  height: 200px;
  border-color: #fff;
  width: 50%;
}
.fullheight {
  height: 100%;
}

label {
  color: #f3f3f3;
}

.std-wrapper {
  background-color: #fff;
  /* margin: 1px; */
  padding: 1px;
}

table {
  width:100%;
}
table > tr {
  width: 100%;
}
tr > td {
  width: 50%;
}
</style>
