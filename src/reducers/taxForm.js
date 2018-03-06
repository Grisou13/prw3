import {UPDATE_TAX_FORM, RESET_TAX_FORM} from '../consts/taxForm'

const intitialState = {
    fortune: "",
    income: "",
    deductions: "",
    nb_children: ""
}
export default (state = intitialState, action) => {
    const { type, payload } = action
    switch(type){
        case UPDATE_TAX_FORM:
            return {...state, ...payload}
        case RESET_TAX_FORM:
            return {...intitialState}
        default:
            return state;
    }
}
