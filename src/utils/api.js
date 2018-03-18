import axios from 'axios'
export default class Api {
  static fetchCalculations(canton = null) {
    return axios.get("/calculations.json")
  }
  static fetchSpendings(){
    return axios.get("/spendings.json")
  }
}
