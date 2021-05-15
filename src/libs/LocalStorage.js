/* eslint-disable */

/**
 * localStorage管理基底クラス
 */
export default class LocalStorage {
  /**
   * ストレージキー
   * @param {String} key オブジェクトのキー
   */
  constructor (key, defaultParam = {}) {
    // メンバ変数
    this.storageKey = key
    this.defaultParam = null
    // 初期処理
    this.setDefaultParam(defaultParam)
    if (!this.hasItem()) {
      this.reset()
    }
  }
  /**
   * アイテム取得
   */
  get () {
    let item = localStorage.getItem(this.storageKey)
    if (!this.hasItem()) {
      return {}
    }
    return JSON.parse(item)
  }
  /**
   * アイテム保存
   * @param {Object} itemObj アイテム名
   */
  set (itemObj) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(itemObj)
    )
  }
  /**
   * ストレージキー
   * @return {String} StorageKey
   */
  getStorageKey () {
    return this.storageKey
  }
  /**
   * アイテムがあるか
   * @return {Bool} status
   */
  hasItem () {
    let item = localStorage.getItem(this.storageKey)
    if (item === null || item === undefined || item === {}) {
      return false
    }
    return true
  }
  /**
   * アイテムの初期化値を設定
   */
  reset () {
    this.set(this.defaultParam)
  }
  /**
   * デフォルト値を持たせる
   */
  setDefaultParam (arg) {
    this.defaultParam = arg
  }
}
