import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import Error from "./Error";
import SwissMap from '../assets/switzerland.svg'
import './App.sass'

const mapStateToProps = (state) => {
    return {
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
        console.log(SwissMap)
      console.log("Rendering app")
        return (
            <div className="App" id="outer-container" style={{height:"100vh", width: "100vw"}}>
                <header><Error /></header>

                <main>
                    <p>{"APP HERE EH"}</p>
                    <img src={SwissMap} alt=""/>
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
