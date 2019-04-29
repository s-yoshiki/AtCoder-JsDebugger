/**
 * localStorage管理基底クラス
 */
export default class LocalStorage {
  /**
   * ストレージキー
   * @param {String} key 
   */
  constructor(key) {
    this.storageKey = key
    if (!this.hasItem()) {
      this.reset()
    }
  }
  /**
   * アイテム取得
   */
  get() {
    let item = localStorage.getItem(this.storageKey)
    if (!this.hasItem()) {
      return {}
    }
    return JSON.parse(item)
  }
  /**
   * アイテム保存
   * @param {String} storageId 
   * @param {Object} itemObj
   */
  set(itemObj) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(itemObj)
    );
  }
  /**
   * ストレージキー
   * @return {String} StorageKey
   */
  getStorageKey() {
    return this.storageKey
  }
  /**
   * アイテムがあるか
   * @return {Bool} status
   */
  hasItem() {
    let item = localStorage.getItem(this.storageKey)
    if (item == null || item == undefined || item === {}) {
      return false
    }
    return true
  }
  /**
   * アイテムの初期化値を設定
   */
  reset() {
    this.set({})
  }
}