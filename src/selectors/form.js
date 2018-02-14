import { createSelector } from 'reselect'
// https://github.com/reactjs/reselect

// TODO create selectors for all the tax spendings, and accumulate them in a total
// TODO create percentages with that and the total amount of income and taxes a person payes
const taxSpendingSelector = state => state.spending
const taxSectionSelector = key => state => state.spending[key]
const taxable = state => state.form.income + state.form.fortune
const deductionsSelector = state => state.form.deductions
const formSelector = state => state.form

export const deductedForCivilStatus = createSelector(
    state.form.civilStatus,
    state.calculations.civilStatus,
    (status, data)=> data[status]
)

export const deductedForChildren = createSelector(
    state.form.nb_children,
    state.calculations.nb_children,
    (status, data)=> data[status]
)

export const totalAmountPayed = createSelector(
    formSelector,
    (form)=> ({total: Object.keys(form).reduce((acc, cur)=>acc + parseFloat(form[cur]), 0 )})
)