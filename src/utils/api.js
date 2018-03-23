import axios from 'axios'
export default class Api {
  static fetchCalculations(canton = null) {
    return axios.get("/calculation.json").then(resp => resp.data)
  }
  static fetchSpendings(){
    return axios.get("/spendings.json").then(resp => resp.data)
  }
}
