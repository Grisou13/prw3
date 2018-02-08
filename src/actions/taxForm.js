import {UPDATE_TAX_FORM, RESET_TAX_FORM} from '../consts/taxForm'

export const updateTaxInputFormData = (payload) => ({type:UPDATE_TAX_FORM,payload})
export const resetTaxInputForm = () => ({type:RESET_TAX_FORM})