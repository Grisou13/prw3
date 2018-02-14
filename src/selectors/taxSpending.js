import { createSelector } from 'reselect'
import { percentPerSection } from './taxCalculation';
// https://github.com/reactjs/reselect

const taxSpendingSelector = state => state.spending
const taxSectionSelector = key => state => state.spending[key]
const formSelector = state => state.form
const calculationSelector = state => state.calculation


// get the value object if val is in between 2 keys
// e.g
/*
obj = {
  1: 0.01,
  2: 0.02,
  5: 0.05
}
val = 4

return = 0.02 -> since 4 is in between 2 and 5 we return the value of 
*/
const getValueInRange = (obj, val) => {
  return Object.keys(obj).reverse().reduce((t, k)=>{
    if(k > val)
      return obj[k]
  },0)
  /*keys.reduce( (t, k)=>{
    if(keys.indexOf(k) == keys.length)
      return obj[k]
    const next = keys.indexOf(k)+1

    if(val > k && val < next)
      t = obj[k]
  } ,0 )*/
}

const taxCalculationMapping = {
  fortune: {
    formKey:"fortune",
    // data is the data from the form
    // calc is calculation data for the fortune
    cb : (data, calc) => data * getValueInRange(calc, data)// TODO get the percent from calc
  },
  income: {
    formKey:"income",
    cb: (data, calc) => data*getValueInRange(calc, data)
  },
  nb_children:{
    formKey:"nb_children",
    cb: (data, calc) => calc[data]
  },
  federalTax:{
    formKey: "income",
    cb: (data, calc) => data * getValueInRange(calc, data)
  }
}

// get the total spent in taxes
export const calculateTaxes = createSelector(
  calculationSelector,
  formSelector,
  (calculus, form) => {
    // we calculate taxes by looping through all the calculable fields

    return Object.keys(calculus).reduce((t, k)=> {
      let formData = form[taxCalculationMapping[k].formKey]
      total += taxCalculationMapping[k].cb(formData, calculus[k])
    }, 0)
  }
)
// spendings per section of budget
export const spendingsPerSection = createSelector(
  calculateTaxes,
  percentPerSection,
  (totalTaxes, percentPerSection) => Object.keys(percentPerSection).reduce( (r,k)=>r[k] = totalTaxes * percentPerSection[k],{} )
)