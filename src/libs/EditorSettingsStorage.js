import LocalStorage from './LocalStorage'
/**
 * スニペット管理
 */
export default class extends LocalStorage {
    constructor() {
        super('EDITOR_SETTINGS_STORAGE')
    }
}