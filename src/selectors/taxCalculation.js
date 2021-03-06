import { createSelector } from 'reselect'

// https://github.com/reactjs/reselect

export const taxSpendingSelector = state => state.spendings
export const taxSectionSelector = key => state => state.spending[key]

// sums up an object that has float/integer values and gives you the sum
// this method is recursive on an object
// this method can't be used with complex json objects

export const sum = (obj) => {
  return Object.keys(obj)
    .reduce(function (sum_, key) {
      if (typeof obj[key] === "array" || typeof obj[key] === "object") {
        return sum_ + sum(obj[key])
      } else {
        return sum_ + parseFloat(obj[key]);
      }
    }, 0);
}

export const totalForSection = sectionKey => createSelector(
  taxSectionSelector(sectionKey),
  (section) => ({ total: sum(section) })
)
//spendings for all the section
export const spendingsSelector = createSelector(
  taxSpendingSelector,
  (spendings) => {
    return Object.keys(spendings).reduce((r, k) => { r[k] = sum(spendings[k]); return r }, {})
  }
)

// get the total spent by the state
export const totalSelector = createSelector(
  taxSpendingSelector,
  (spendings) => Object.keys(spendings).reduce((sum_, key) => sum_ + sum(spendings[key]), 0)
)
// gets the percent the state spends (in percent) for a section of the spendings budget
// -> get the total spent
// devide by total of section
export const percentPerSection = createSelector(
  spendingsSelector,
  totalSelector,
  (spendings, total) => {

    let ret = {}
    Object.keys(spendings).forEach( k => ret[k] = (spendings[k] / total ) )
    return ret
  }
)