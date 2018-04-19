// https://github.com/jeffbski/redux-logic/blob/master/docs/where-business-logic.md#redux-logic---a-new-approach
import { createLogic } from 'redux-logic';

import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL,TAX_SPENDING_FETCH_SUCCESS,TAX_SPENDING_FETCH_FAILED} from '../../consts/taxSpending'
import {TAX_CALCULATION_FETCH,TAX_CALCULATION_FETCH_CANCEL,TAX_CALCULATION_FETCH_SUCCESS, TAX_CALCULATION_FETCH_FAILED} from '../../consts/taxCalculation'
import {FORM_COMPLETED} from '../../consts/taxForm'
import {APP_BOOT} from '../../consts/app'

import {fetchTaxSpendings, fetchTaxCalculations} from '../../actions/taxData'
import {appReady as appReadyAction} from '../../actions/app'

import { UPDATE_TAX_FORM } from '../../consts/taxForm';
import { formSelector } from '../../selectors/form'
import { taxFormInvalid, updateTaxInputFormData } from './../../actions/taxForm'

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
    return api.fetchSpendings()
      
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
    return api.fetchCalculations() 
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
    dispatch(fetchTaxCalculations())
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
    //let state = getState();
    if(true){ //TODO define custom logic for app ready

      dispatch(appReadyAction())
      dispatch(updateTaxInputFormData({name:"firstname", value:""}))
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
  if(fields.children && !fields.nb_children.trim().length) errors.push({field:"nb_children",message:"Number of children field can't be empty"})
  if(fields.children && !parseFloat(fields.nb_children)) errors.push({field:"nb_children",message:"Number of children must be a number"})

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
    if(state.form.errors.length <= 0 && state.form.valid)
      allow(action)
    else
      reject()
  },
  async process({getState, action}, dispatch, done){
    //TODO define actions to perform on form completion
    const {data} = await api.fetchCalculations()
    dispatch({type:TAX_CALCULATION_FETCH_SUCCESS, payload: data})
    done();
  }
})

const logDataForDatalab = createLogic({
  type: FORM_COMPLETED,
  process({getState, action}, dispatch, done){
    const state = getState()
    api.postData(state.form.fields)
  }
})

export default [
  fetchTaxCalculationsLogic,
  fetchTaxSpendingsLogic,
  appReady,
  appBoot,
  validateFormUpdate,
  validateFormCompleted,
  logDataForDatalab
]
