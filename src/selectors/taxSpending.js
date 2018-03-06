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

return = 0.02 -> since 4 is in between 2 and 5 we return the value of the lowest found
*/
const getValueInRange = (obj, search) => {
  let ret = null
  let objectKeys = Object.keys(obj).sort()
  objectKeys.forEach((currentValue, index, arr)=>{
    if(index >= arr.length - 1 && ret === null){
      ret = obj[currentValue]
      return true
    }
    let nextValue = objectKeys[ index + 1 ]
    if(search >= currentValue && search < nextValue){
      ret = obj[currentValue] 
      return true
    }

  })
  return ret;

}

const taxCalculationMapping = {
  fortune: {
    formKey:"fortune",
    // cb is how the data should be added to the total of taxes
    // data is the data from the form
    // calc is calculation data for the form key
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

    let total = Object.keys(calculus).reduce((total, k)=> {
      let formData;
      if(typeof taxCalculationMapping[k].formKey === "array")
        formData = Object.keys(form).reduce((t,k2)=> t += taxCalculationMapping[k].formKey.indexof(k2) ? ( parseFloat(form[k2]) ? parseFloat(form[k2]) : 0 ) : 0,0)
      else{
        if(!form[taxCalculationMapping[k].formKey].length)
          return total
        formData = parseFloat(form[taxCalculationMapping[k].formKey])
      }
        
      return total += taxCalculationMapping[k].cb(formData, calculus[k])
    }, 0)
    console.log("TOTAL: ",total)
    return total;
  }
)
// spendings per section of budget
export const spendingsPerSection = createSelector(
  calculateTaxes,
  percentPerSection,
  (payedTaxes, percentPerSection) => {
    let ret = {}
    Object.keys(percentPerSection).forEach( k => ret[k] = payedTaxes * percentPerSection[k],{} )
    return ret
  }
)