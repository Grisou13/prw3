import arrLogic from './logic'
import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import ErrorMiddleware from './error';
import { createLogicMiddleware } from 'redux-logic';
// import promiseMiddleware from 'redux-promise';

const deps = { // optional injected dependencies for logic
    // anything you need to have available in your logic
    
};
const logicMiddleware = createLogicMiddleware(arrLogic, deps);

export default applyMiddleware(thunk, ErrorMiddleware, logicMiddleware)