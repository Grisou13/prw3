// https://github.com/jeffbski/redux-logic/blob/master/docs/where-business-logic.md#redux-logic---a-new-approach
import { createLogic } from 'redux-logic';
import axios from 'axios'

import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL,TAX_SPENDING_FETCH_SUCCESS,TAX_SPENDING_FETCH_FAILED} from '../../consts/taxSpending'
import {TAX_CALCULATION_FETCH,TAX_CALCULATION_FETCH_CANCEL,TAX_CALCULATION_FETCH_SUCCESS, TAX_CALCULATION_FETCH_FAILED} from '../../consts/taxCalculation'
import {APP_BOOT, APP_READY} from '../../consts/app'

import {fetchTaxCalculations, fetchTaxSpendings} from '../../actions/taxData'
import {appReady as appReadyAction} from '../../actions/app'

const fetchTaxSpendingsLogic = createLogic({
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
    return axios.get(`http://46.101.134.181/api/me?token=root`)
      .then(resp => resp.data);
  }
});

const fetchTaxCalculationsLogic = createLogic({
  // declarative behavior
  type: TAX_CALCULATION_FETCH,  // filter for actions of this type
  cancelType: TAX_CALCULATION_FETCH_CANCEL, // cancel when this action is dispatched
  latest: true, // only provide the latest if fired many times

  processOptions: { // options influencing the process hook, default {}
    dispatchReturn: true, // dispatch from the resolved/rejected promise
    successType: TAX_CALCULATION_FETCH_SUCCESS,  // use this action type for success
    failType: TAX_CALCULATION_FETCH_FAILED       // use this action type for errors
  },

  // No need to dispatch since we are using the returned promise
  // and automatically applying the actions to the raw values which
  // get mapped to the action payload
  process({ getState, action }) {
    return axios.get(`http://46.101.134.181/api/me?token=root`)
      .then(resp => resp.data);
  }
});

const appBoot = createLogic({
  type: APP_BOOT,
  processOptions: { // options influencing the process hook, default {}
    dispatchReturn: false, // dispatch from the resolved/rejected promise
    successType: null,  // use this action type for success
    failType: null       // use this action type for errors
  },

  process({getState, action}, dispatch, done){
    dispatch(fetchTaxCalculations())
    dispatch(fetchTaxSpendings())
    done()
  }
})
const appReady = createLogic({
  type: [TAX_CALCULATION_FETCH_SUCCESS, TAX_SPENDING_FETCH_SUCCESS],
  processOptions: { // options influencing the process hook, default {}
    dispatchReturn: false, // dispatch from the resolved/rejected promise
    successType: null,  // use this action type for success
    failType: null       // use this action type for errors
  },

  process({getState, action}, dispatch, done){
    let state = getState();
    if(state.calculation && state.spendings)
      dispatch(appReadyAction())
    //return done()
  }
})

export default [
  fetchTaxCalculationsLogic,
  fetchTaxSpendingsLogic,
  appReady,
  appBoot
]