import {UPDATE_TAX_FORM} from '../consts/taxForm'

const intitialState = {
    fortune: null,
    income: null,
    deductions: null
}
export default (state = null, action) => {
    const { type, error } = action
    switch(type){
        case UPDATE_TAX_FORM:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
