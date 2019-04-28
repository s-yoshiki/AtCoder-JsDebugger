<template>
  <b-container>
    <h1>Snippets</h1>
    <p>初期状態で表示されるエディタのコードを編集します。</p>
    <hr>
    <b-button variant="success" v-on:click="save">Save</b-button>
    <b-button variant="light" v-on:click="clear">初期化</b-button>
    &nbsp; {{showMsg}}
    <br>&nbsp;
    <MonacoEditor
      style="height:350px;width:80%;"
      class="editor"
      v-model="code"
      language="javascript"
      ref="editor"
      theme="vs-dark"
    ></MonacoEditor>
  </b-container>
</template>
<script>
import MonacoEditor from "vue-monaco"
import SnippetsStorage from '@/libs/SnippetsStorage'
import {defaultCode} from '@/libs/StaticStrings'
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code:'',
      showMsg:'',
      storage: new SnippetsStorage()
    }
  },
  methods: {
    init() {
      this.code = this.storage.get()
    },
    save() {
      this.storage.set(this.code)
      this.showMsg = '保存しました'
    },
    clear() {
      this.code = defaultCode
      this.storage.set(defaultCode)
      this.showMsg = '初期化しました'
    }
  },
  mounted() {
    this.init()
  }
}
</script>