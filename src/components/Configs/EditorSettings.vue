<template>
  <b-container fluid>
    <b-row>
      <b-col cols="10">
        <strong>エラーコンソールの有効化 (非推奨)</strong>
        <br>
        <small>
          console.error() や console.warn() などの標準エラー出力用のコンソールを表示します。
          <br>
          ※コードとは関係ないエラーまで拾ってしまうため非推奨としています。
        </small>
      </b-col>
      <b-col class="text-center">
        <b-form-checkbox v-model="status.errorpaineStatus" name="check-button" switch></b-form-checkbox>
      </b-col>
    </b-row>

    <hr>

    <b-row>
      <b-col cols="10">
        <strong>キャッシュの有効化</strong>
        <br>
        <small>エディタを開いた際に、最後に編集していた内容を表示します。</small>
      </b-col>
      <b-col class="text-center">
        <b-form-checkbox v-model="status.chacheStatus" name="check-button" switch></b-form-checkbox>
      </b-col>
    </b-row>

    <hr>
    <b-row>
      <b-col cols="10">
        <strong>テーマの変更</strong>
        <br>
        <small>エディタに適用するテーマカラーを変更します。</small>
      </b-col>
      <b-col class="text-center">
        <b-form-select
          v-model="status.themeColor"
          :options="themeColorOption"
          class="mb-3"
          size="sm"
        ></b-form-select>
      </b-col>
    </b-row>

    <hr>
    <b-row>
      <b-col cols="10">
        <strong>標準入出力ペインのサイズ</strong>
        <br>
        <small>標準入出力ペインのサイズを変更します。</small>
      </b-col>
      <b-col class="text-center">
        <b-form-select
          v-model="status.paineSize"
          :options="paineSizeOption"
          class="mb-3"
          size="sm"
        ></b-form-select>
      </b-col>
    </b-row>

    <hr>
    <b-row>
      <b-col cols="10">
        <strong>設定の初期化</strong>
        <br>
        <small>全ての設定を初期状態にします。</small>
      </b-col>
      <b-col class="text-center">
        <b-button variant="danger" v-on:click="clear">delete</b-button>
      </b-col>
    </b-row>

    <hr>
    <b-button variant="success" v-on:click="save">Save</b-button>
    &nbsp;{{saveMsg}}
  </b-container>
</template>
<script>
import { SnippetsStorage, EditorSettingsStorage } from "@/libs/Storages";
import LocalStorage from "@/libs/LocalStorage";
export default {
  data() {
    return {
      storage: new EditorSettingsStorage(),
      saveMsg: "",
      themeColorOption: [
        { value: "vs", text: "default" },
        { value: "vs-dark", text: "dark" },
        { value: "hc-black", text: "high contrast" }
      ],
      paineSizeOption: [
        { value: "150", text: "small" },
        { value: "200", text: "default" },
        { value: "250", text: "large" }
      ],
      status: {
        errorpaineStatus: false,
        chacheStatus: false,
        themeColor: 'vs',
        paineSize: '200',
      }
    };
  },
  methods: {
    init() {
      let settings = this.storage.get();
      if (settings != null) {
        this.status = settings;
      }
    },
    save() {
      this.storage.set(this.status);
      this.saveMsg = "保存しました";
    },
    clear() {
      this.status = {};
      this.storage.set(this.status);
      for (let key in keys) {
        (new LocalStorage(keys[key])).set({})
      }
      this.saveMsg = "初期化しました";
    }
  },
  mounted() {
    this.init();
  }
};
</script>