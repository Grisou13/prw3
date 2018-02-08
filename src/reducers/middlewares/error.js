import {RESET_ERROR_MESSAGE} from '../../consts/error'

var prev = null;
const ErrorMiddleware = store => next => action => {
    let res = next(action)
    if(action.hasOwnProperty("error")){
        if(prev != null)
          clearTimeout(prev);
        prev = setTimeout(()=>{
          console.log("resetting errors")
          store.dispatch({type: RESET_ERROR_MESSAGE})
        }, 10000); //reset error after 10s
    }
    return res
}

export default ErrorMiddleware
