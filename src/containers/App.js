import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import Error from "./Error";
import TaxForm from "./TaxForm"
import Graph from "./Graph"

import SwissMap from '../assets/switzerland.svg'
import './App.sass'

import {totalSelector, spendingsSelector} from '../selectors/taxCalculation'
import {calculateTaxes, spendingsPerSection} from '../selectors/taxSpending'


const mapStateToProps = (state) => {    return {
        spendings: state.app.ready? spendingsSelector(state): 0,
        taxes: state.app.ready ? calculateTaxes(state) : 0,
        spendingsSection : state.app.ready ? spendingsPerSection(state) : null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component{
    render(){
        console.log(this.props)
      console.log("Rendering app")
        return (
            <div className="App" id="outer-container" style={{height:"100vh", width: "100vw"}}>
                <header><Error /></header>

                <main>
                    
                    <TaxForm />
                    <Graph />
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
