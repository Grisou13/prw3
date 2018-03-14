import {UPDATE_TAX_FORM, RESET_TAX_FORM, INVALID_TAX_FORM} from '../consts/taxForm'

const intitialState = {
    fields: {
        fortune: "",
        income: "",
        deductions: "",
        nb_children: "",
        married: false
    },
    errors: [],
    valid: true
}
export default (state = intitialState, action) => {
    const { type, payload } = action
    switch(type){
        
        case UPDATE_TAX_FORM:{
                // updates fields and clears errors
            const fieldUpdate = action.payload;
            const updatedFields = {
                ...state.fields,
                [fieldUpdate.name]: fieldUpdate.value
            };
            return {
                ...state,
                fields: updatedFields,
                errors: [],
                valid: true,
            };
        }
        case INVALID_TAX_FORM:{
                // updates fields but displays errors
            const { errors, field } = action.payload;
            const updatedFields = {
                ...state.fields,
                [field.name]: field.value
            };
            return {
                ...state,
                fields: updatedFields,
                errors: errors,
                valid: false,
            };
        } 
        case RESET_TAX_FORM:
            return {...intitialState}
        default:
            return state;
    }
}
