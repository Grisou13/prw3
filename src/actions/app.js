import {APP_BOOT,APP_READY} from '../consts/app'
export const appReady = () =>({type:APP_READY})
export const appBoot = () =>({type:APP_BOOT})