import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import Error from "./Error";
import TaxForm from "./TaxForm"
import Graph from "./Graph"
import Loader from './Loader'

import SwissMap from '../assets/switzerland.svg'
import './App.sass'

const mapStateToProps = (state) => {    return {
        ready: state.app.ready
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}

const app = () => (
    <div>
        <TaxForm />
        
        <Graph />
    </div>
)

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component{
    render(){
        return (
            <div className="App" id="outer-container" style={{height:"100vh", width: "100vw"}}>
                <header><Error /></header>

                <main>
                    { this.props.ready ? app() : <Loader /> }
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
