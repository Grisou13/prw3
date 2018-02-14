import { TAX_SPENDING_FETCH_SUCCESS } from "../consts/taxSpending";

const initialState = null
export default (state = initialState, {type, payload, ...meta}) => {
    switch(type){
        case TAX_SPENDING_FETCH_SUCCESS:
            return {...state, ...payload}
        default:
            return state;
    }
}