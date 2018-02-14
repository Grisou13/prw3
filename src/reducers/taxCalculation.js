import {TAX_CALCULATION_FETCH_SUCCESS} from '../consts/taxCalculation'

const initialState = null
export default (state = initialState, {type, payload, ...meta}) => {
    switch(type){
        case TAX_CALCULATION_FETCH_SUCCESS:
            return {...state, ...payload}
        default:
            return state;
    }
}