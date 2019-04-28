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
    }
    /**
     * アイテム取得
     */
    get() {
        return JSON.parse(localStorage.getItem(this.storageKey))
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
}