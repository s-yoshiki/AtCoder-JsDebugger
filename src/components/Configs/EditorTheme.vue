<template>
  <div>
    <h1>Editor Theme</h1>
    <p>エディタの設定を行います。</p>
    <hr>

    <b-row>
      <b-col>
        <strong>エラーコンソールの有効化 (非推奨)</strong><br>
        <small>console.error() や console.warn() を利用できるようにします。</small>
      </b-col>
      <b-col>
        <b-form-checkbox v-model="status.errorpaineStatus" name="check-button" switch></b-form-checkbox>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col>
        <strong>キャッシュの有効化</strong><br>
        <small>エディタを開いた際に最後に編集していた内容を表示します。</small>
      </b-col>
      <b-col>
        <b-form-checkbox v-model="status.chacheStatus" name="check-button" switch disabled></b-form-checkbox>
      </b-col>
    </b-row>

    <hr>
    <b-button variant="success" v-on:click="save">Save</b-button>
    <b-button variant="light" v-on:click="clear">初期化</b-button>
    &nbsp;{{saveMsg}}
  </div>
</template>
<script>
import EditorSettingsStorage from '@/libs/EditorSettingsStorage'

export default {
  data() {
    return {
      storage: new EditorSettingsStorage(),
      saveMsg:'',
      status: {
        errorpaineStatus: false,
      }
    };
  },
  methods: { 
    init() {
      let settings = this.storage.get()
      if (settings != null) {
        this.status = settings
      }
    },
    save() {
      this.storage.set(this.status)
      this.saveMsg = '保存しました'
    },
    clear() {
      this.status = {}
      this.storage.set(null)
      this.saveMsg = '初期化しました'
    },
  },
  mounted() {
    this.init();
  }
};
</script>