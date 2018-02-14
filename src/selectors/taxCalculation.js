import { createSelector } from 'reselect'
// https://github.com/reactjs/reselect

const formSelector = state => state.form
const spendingSelector = state => state.spending

const taxSpendingSelector = state => state.spending
const taxSectionSelector = key => state => state.spending[key]

// sums up an object that has float/integer values and gives you the sum
// this method is recursive on an object
// this method can't be used with complex json objects

const sum = ( obj ) => {
  return Object.keys( obj )
        .reduce( function( sum_, key ){
          if(typeof obj[key] ==="array" || typeof obj[key] ==="object" ){
          return sum_ + sum(obj[key])
          }else{
            console.log(sum_)
          return sum_ + parseFloat( obj[key] );
          }
        
        }, 0 );
}

export const totalForSection = sectionKey => createSelector(
  taxSectionSelector(sectionKey),
  (section) => ({total: sum(section) })
)
// gets the percent the state spends (in percent) for a section of the spendings budget
// -> get the total spent
// devide by total of section
export const percentPerSection = createSelector(
  spendingsSelector,
  totalSelector,
  (spendings, total) => Object.keys(spendings).reduce((r,k)=>r[k] = spendings[k]/total,{})
)
//spendings for all the section
export const spendingsSelector = createSelector(
  taxSpendingSelector,
  totalSelector,
  (spendings, total) => {
    return Object.keys(spendings).reduce( (r, k) => r[k] = sum(spendings[k]), {})
  }
)

// get the total spent by the state
export const totalSelector = createSelector(
  spendingsSelector,
  (spendings) => Object.keys(spendings).reduce( (sum_, key)=> sum_+spendings[key],0 )
)
