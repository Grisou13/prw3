import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import Error from "./Error";
import TaxForm from "./TaxForm"
import Graph from "./Graph"
import Loader from '../components/Loader'

import './App.sass'

const mapStateToProps = (state) => {    return {
        ready: state.app.ready,
        formCompleted: state.form.completed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component{
  app = () => {
    return (
        <div>
            <TaxForm />
            { this.props.formCompleted ? <Graph /> : null}
        </div>
    )
  }
    render(){
        return (
            <div className="App" id="outer-container" style={{height:"100vh", width: "100vw"}}>
                <header><Error /></header>

                <main>
                    { this.props.ready ? this.app() : <Loader /> }
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
