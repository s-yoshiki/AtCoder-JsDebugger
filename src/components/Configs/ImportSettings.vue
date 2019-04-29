<template>
  <b-container fluid>
    <b-button variant="success" v-on:click="save">Save</b-button>
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
import MonacoEditor from "vue-monaco"
import { keys, EditorSettingsStorage } from "@/libs/Storages"
import LocalStorage from "@/libs/LocalStorage"
import {defaultCode} from '@/libs/StaticStrings'
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code:'{}',
      showMsg:'',
      editor:(new EditorSettingsStorage()).get(),
    }
  },
  methods: {
    save() {
      try {
        let obj = JSON.parse(this.code)
        for (let key in keys) {
            if (obj.data[key]) {
                let storage = new LocalStorage(key)
                storage.set(obj.data[key])
            }
        }
        this.showMsg = '保存しました'
      } catch(e) {
        this.showMsg = 'エラー' + e
      }
    },
  },
  mounted() {
  }
}
</script>