import {TAX_SPENDING_FETCH,TAX_SPENDING_FETCH_CANCEL} from '../consts/taxSpending'

export const fetchTaxSpendings = () => ({ type: TAX_SPENDING_FETCH })

export const cancelTaxSpendingFetch = () => ({type: TAX_SPENDING_FETCH_CANCEL})