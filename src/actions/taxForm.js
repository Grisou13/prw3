import {UPDATE_TAX_FORM, RESET_TAX_FORM, INVALID_TAX_FORM,FORM_COMPLETED} from '../consts/taxForm'

export const updateTaxInputFormData = (payload) => ({type:UPDATE_TAX_FORM,payload})
export const resetTaxInputForm = () => ({type:RESET_TAX_FORM})
export const taxFormInvalid = (errors, field) => ({type:INVALID_TAX_FORM, payload: {errors, field}})
export const completeTaxForm = () => ({type: FORM_COMPLETED})
