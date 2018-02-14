import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL} from '../consts/taxSpending'
import { TAX_CALCULATION_FETCH, TAX_CALCULATION_FETCH_CANCEL } from '../consts/taxCalculation';

export const fetchTaxSpendings = () => ({ type: TAX_SPENDING_FETCH })
export const cancelTaxSpendingFetch = () => ({type: TAX_SPENDING_FETCH_CANCEL})

export const fetchTaxCalculations = () => ({type: TAX_CALCULATION_FETCH})
export const cancelFetchTaxCalculations = () => ({type:TAX_CALCULATION_FETCH_CANCEL})
