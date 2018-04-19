import axios from 'axios'
export default class Api {
  static fetchCalculations(canton = null) {
    return axios.get("calculation.json").then(resp => resp.data)
  }
  static fetchSpendings(){
    return axios.get("spendings.json").then(resp => resp.data)
  }
  static postData(data){
    console.log(process.env)
    let uri = process.env.REACT_APP_LOG_URL + "/api/projects/" + process.env.REACT_APP_PROJECT_NAME
    let fd = new FormData()
    fd.append('data',JSON.stringify(data))
    return axios.post(uri, fd)
  }
}
