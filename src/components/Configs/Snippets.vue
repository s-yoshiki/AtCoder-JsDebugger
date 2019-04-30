<template>
  <b-container fluid>
    <b-button variant="success" v-on:click="save">Save</b-button>
    <b-button variant="light" v-on:click="clear">初期化</b-button>
    &nbsp; {{showMsg}}
    <br>&nbsp;
    <MonacoEditor
      style="height:350px;width:95%;"
      class="editor"
      v-model="code"
      language="javascript"
      ref="editor"
      :theme="editor.themeColor"
    ></MonacoEditor>
  </b-container>
</template>
<script>
import MonacoEditor from 'vue-monaco'
import {SnippetsStorage, EditorSettingsStorage} from '@/libs/Storages'
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code:'',
      showMsg:'',
      storage: new SnippetsStorage(),
      editor:(new EditorSettingsStorage()).get(),
    }
  },
  methods: {
    init () {
      this.code = this.storage.get()
    },
    save () {
      this.storage.set(this.code)
      this.showMsg = '保存しました'
    },
    clear () {
      this.storage.reset()
      this.code = this.storage.get()
      this.showMsg = '初期化しました'
    }
  },
  mounted () {
    this.init()
  }
}
</script>
