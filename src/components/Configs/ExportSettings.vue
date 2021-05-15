<template>
  <b-container fluid>
    <div class="text-right">
      <a
        class="btn btn-secondary"
        href="#"
        download="settings.json"
        ref="download-link"
        >download JSON</a
      >
    </div>
    &nbsp;
    <MonacoEditor
      style="height: 350px; width: 95%"
      class="editor"
      v-model="code"
      language="javascript"
      ref="editor"
      :theme="editor.themeColor"
    ></MonacoEditor>
  </b-container>
</template>

<script>
/* eslint-disable */
import MonacoEditor from "vue-monaco";
import { keys, EditorSettingsStorage } from "@/libs/Storages";
import LocalStorage from "@/libs/LocalStorage";
import { defaultCode } from "@/libs/StaticStrings";
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code: "{}",
      showMsg: "",
      editor: new EditorSettingsStorage().get(),
    };
  },
  methods: {
    init() {
      this.code = this.getJsonCodes();
    },
    download() {
      let bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      let content = this.getJsonCodes();
      let blob = new Blob([bom, content], { type: "text/json" });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "settings.json");
        window.navigator.msSaveOrOpenBlob(blob, "settings.json");
      } else {
        return window.URL.createObjectURL(blob);
      }
    },
    getJsonCodes() {
      let result = {
        header: {
          name: "atcoder-jsdebugger",
          v: "1.0.0",
          datetime: String(new Date()),
        },
        data: {},
      };
      for (let i in keys) {
        let storage = new LocalStorage(keys[i]);
        if (["editor_chache"].includes(keys[i])) {
          continue;
        }
        result.data[keys[i]] = storage.get();
      }
      return JSON.stringify(result, null, "\t");
    },
  },
  mounted() {
    this.init();
    let downloadLink = this.$refs["download-link"];
    downloadLink.addEventListener("click", () => {
      downloadLink.href = this.download();
    });
  },
};
</script>
