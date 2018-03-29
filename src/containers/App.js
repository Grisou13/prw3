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
    constructor(props){
        super(props)
        this.state = {
            sidebarOpened : true
        }
    }
    toggleSidebar = () => {
        console.log("TAMER")
        this.setState( (prevState, props) => ({sidebarOpened: !prevState.sidebarOpened}))
    }
    withSidebar = () => {
        return (
            <div className="app">
                <div className={["sidebar", "sidebar--"+ (this.state.sidebarOpened ? "opened" : "closed") ].join(" ")}>
                    <TaxForm />
                </div>
                <div className="sidebar-toggle" onClick={()=>this.toggleSidebar()}>
                    <span className="btn-toggle"><i style={ {height:20} } className={["fa", "fa-"+(this.state.sidebarOpened ? "angle-left":"angle-right")].join(" ")}></i></span>
                </div>
                <div className="content">
                    { this.props.formCompleted ? <Graph /> : null}
                </div>
                
            </div>
        )
    }
    withoutSidebar = () => {
        return (
            <div className="app">
                
                <div className="content">
                    <TaxForm />
                </div>
                
            </div>
        )
    }
  app = () => {
    return this.props.formCompleted ? this.withSidebar() : this.withoutSidebar()
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
