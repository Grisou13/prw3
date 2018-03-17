import {UPDATE_TAX_FORM, RESET_TAX_FORM, INVALID_TAX_FORM,FORM_COMPLETED} from '../consts/taxForm'

const intitialState = {
    fields: {
        firstname: "",
        lastname: "",
        email: "",
        fortune: "",
        income: "",
        deductions: "",
        children: false,
        nb_children: "",
        married: false
    },
    errors: [],
    valid: true,
    completed: false
}
export default (state = intitialState, action) => {
    const { type, payload } = action
    switch(type){
        case FORM_COMPLETED:{
            return {
              ...state,
              completed: true
            }
        }
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
