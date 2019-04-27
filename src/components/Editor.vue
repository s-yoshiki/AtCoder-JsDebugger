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
        <b-navbar  type="dark">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template slot="button-content">
                  <em><i class="fas fa-bars"></i></em>
                </template>
                <b-dropdown-item href="#">
                  <i class="fas fa-cog"></i>
                  Settings 
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
  
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
          <label>output</label>
          <div class="std-wrapper">
            <monaco-editor
              style="height:200px;"
              class="editor-min"
              v-model="stdout"
              language
              ref="stdin"
              theme="vs-dark"
            ></monaco-editor>
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

export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: `function main(arg) {
  console.log(arg.trim().split("\\n")[0])
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));`,
      stdin: "",
      stdout: ""
    };
  },
  methods: {
    run() {
      this.stdout = "";
      let code = this.getStdio() + "\n";
      code += this.code;
      console.log = arg => {
        this.stdout += String(arg) + "\n";
      };
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
    let editor = this.$refs.editor.getMonaco();
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
.fullheight {
  height: 100%;
}

label {
  color: #f3f3f3
}

.std-wrapper {
  background-color: #fff;
  /* margin: 1px; */
  padding:1px;
}
</style>
