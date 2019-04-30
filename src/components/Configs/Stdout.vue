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
import { EditorSettingsStorage, StdoutStorage } from '@/libs/Storages'
export default {
  components: {
    MonacoEditor
  },
  data () {
    return {
      code: '',
      showMsg: '',
      editor: (new EditorSettingsStorage()).get(),
      storage: new StdoutStorage()
    }
  },
  methods: {
    init () {
      if (this.storage.get()) {
        this.code = this.storage.get()
      }
    },
    save () {
      try {
        this.storage.set(this.code)
        this.showMsg = '保存しました'
      } catch (e) {
        this.showMsg = 'エラー ' + e
      }
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
