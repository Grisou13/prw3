// https://github.com/jeffbski/redux-logic/blob/master/docs/where-business-logic.md#redux-logic---a-new-approach
import { createLogic } from 'redux-logic';
import axios from 'axios'

import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL,TAX_SPENDING_FETCH_SUCCESS,TAX_SPENDING_FETCH_FAILED} from '../../consts/taxSpending'
import {TAX_CALCULATION_FETCH,TAX_CALCULATION_FETCH_CANCEL,TAX_CALCULATION_FETCH_SUCCESS, TAX_CALCULATION_FETCH_FAILED} from '../../consts/taxCalculation'
import {FORM_COMPLETED} from '../../consts/taxForm'
import {APP_BOOT, APP_READY} from '../../consts/app'

import {fetchTaxCalculations, fetchTaxSpendings} from '../../actions/taxData'
import {appReady as appReadyAction} from '../../actions/app'
import {isEmpty} from 'lodash'
import { UPDATE_TAX_FORM } from '../../consts/taxForm';
import { formSelector } from '../../selectors/form'
import { taxFormInvalid } from './../../actions/taxForm'

import api from '../../utils/api'
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
    return api.fetchSpendings() /*{
      education:{
        total: 20000, // normally tax data should include all the sub categories of spending for a given district, but for now since we don't have a way of autmating that, we just get the total which will give us a final computed value for total of the total, which is dumb
    },
    envirronement:{
        total:10000, //same here

    },
    health:{
        total: 10000
    },
    sports: {
        total:10000,

    },
    humanRessources:{
        total:10000
    },
    court:{
        total: 10000,

    },
    secretariat:{
        total:10000,

    }
  }*/
    //return axios.get(`http://46.101.134.181/api/me?token=root`)
    //  .then(resp => resp.data);
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
    return api.fetchCalculations() /*{
      fortune:{
        0:0,
        40000: 0.014, //fortuneMinima : tax percent taken

    },
    income:{
        0:0,
        40000: 0.014,

    },
    nb_children:{
        0:0,
        1:-700,
        2:-1400,
        3:-2100
    },
    federalTaxSingleAsF:{
        0:0,
        40000: 0.014,
    },
    federalTaxMarried:{
      0:0,
      40000: 0.4,
    },
  }*/
    //return axios.get(`http://46.101.134.181/api/me?token=root`)
    //  .then(resp => resp.data);
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
    //TODO define actions to dispatch and fetch on app start
    dispatch(fetchTaxSpendings())
    done()
  }
})
const appReady = createLogic({
  type: APP_BOOT,
  processOptions: { // options influencing the process hook, default {}
    dispatchReturn: false, // dispatch from the resolved/rejected promise
    successType: null,  // use this action type for success
    failType: null       // use this action type for errors
  },
  warnTimeout : 2000,
  process({getState, action}, dispatch, done){
    let state = getState();
    if(true){ //TODO define custom logic for app ready

      dispatch(appReadyAction())
      done()
    }
  }
})

const validateFields = (fields) => {
  const errors = []
  if(!fields.fortune.trim().length) errors.push({field:"fortune", message: "Fortune field is required"})
  if(!fields.income.trim().length) errors.push({field:"income", message: "Income field is required"})
  if(!parseFloat(fields.income)) errors.push({field:"income",message:"Income field must be a number"})
  if(!parseFloat(fields.fortune)) errors.push({field:"fortune",message:"Fortune field must be a number"})
  if(fields.deductions !== "" && !parseFloat(fields.deductions)) errors.push({field:"deductions",message:"Deductions field must be a number"})

  return errors
}

const validateFormUpdate = createLogic({
  type: UPDATE_TAX_FORM,
  validate({getState, action}, allow, reject){
    const state = getState();
    const fields = {
      ...formSelector(state),
      [action.payload.name]: action.payload.value
    };
    const errors = validateFields(fields)
    if(!errors.length){
      allow(action)
    }
    else{
      reject(taxFormInvalid(errors, action.payload))
    }
  }
})

const validateFormCompleted = createLogic({
  type: FORM_COMPLETED,
  validate({getState, action}, allow, reject){
    const state = getState()
    console.log("TAMER")
    if(state.form.errors.length <= 0 && state.form.valid)
      allow(action)
    else
      reject()
  },
  async process({getState, action}, dispatch, done){
    //TODO define actions to perform on form completion
    let state = getState();
    const {data} = await api.fetchCalculations()
    dispatch({type:TAX_CALCULATION_FETCH_SUCCESS, payload: data})
    done();
  }
})

export default [
  fetchTaxCalculationsLogic,
  fetchTaxSpendingsLogic,
  appReady,
  appBoot,
  validateFormUpdate,
  validateFormCompleted
]
