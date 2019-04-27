<template>
  <div class="editor-container fullheight">
    <b-row class="fullheight">
      <b-col class="fullheight">
        <monaco-editor
          class="editor"
          v-model="code"
          language="javascript"
          ref="editor"
          theme="vs-dark">
        </monaco-editor>
      </b-col>
      <b-col>
        <b-container>
            <b-form-group label-cols="3" label-cols-lg="1" label="Input" label-for="input-default">
              <b-form-textarea
                id="textarea"
                v-model="stdin"
                placeholder=""
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group label-cols="3" label-cols-lg="1" label="Output" label-for="input-default">
              <b-form-textarea
                id="textarea"
                v-model="stdout"
                placeholder=""
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </b-form-group>
            <div class="text-right">
              <b-button
                block variant="primary"
                v-on:click="run"
              >Run</b-button>
            </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'

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
      stdin:'',
      stdout:'',
    }
  },
  methods: {
    run() {
      this.stdout = ""
      let code = this.getStdio() + "\n"
      code += this.code
      console.log = (arg) => {
        this.stdout += String(arg) + "\n"
      }
      let callback = new Function(code)
      callback()
    },
    getStdio() {
      return `
      let require = (arg)  => {
       return {
          readFileSync : (type, string_type) => {
            return \`${this.stdin}\`  
          }
        }
      }
      `
    }
  },
  mounted() {
    let editor = this.$refs.editor.getMonaco()
  }
}
</script>

<style>
.editor-container {
  height: 100%;
}
.left-container {
  padding:0px;
  margin: 0;
  height: 100%;
  width:50%;
}
.editor {
  height: 100%;
  width:100%;
  position: absolute;
}
.fullheight {
  height:100%;
}
</style>
