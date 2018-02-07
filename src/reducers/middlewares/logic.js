// https://github.com/jeffbski/redux-logic/blob/master/docs/where-business-logic.md#redux-logic---a-new-approach
import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL,TAX_SPENDING_FETCH_SUCCESS,TAX_SPENDING_FETCH_FAILED} from '../../consts/taxSpending'

const fetchTaxSpendings = createLogic({
    // declarative behavior
    type: TAX_SPENDING_FETCH,  // filter for actions of this type
    cancelType: TAX_SPENDING_FETCH_CANCEL, // cancel when this action is dispatched
    latest: true, // only provide the latest if fired many times
  
    processOptions: { // options influencing the process hook, default {}
      dispatchReturn: true, // dispatch from the resolved/rejected promise
      successType: TAX_SPENDING_FETCH_SUCCESS,  // use this action type for success
      failType: TAX_SPENDING_FETCH_FAILED       // use this action type for errors
    },
  
    // No need to dispatch since we are using the returned promise
    // and automatically applying the actions to the raw values which
    // get mapped to the action payload
    process({ getState, action }) {
      return axios.get(`https://localhost/taxData`)
        .then(resp => resp.data);
    }
  });