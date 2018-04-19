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
                    {/*<div className="sidebar-toggle" onClick={()=>this.toggleSidebar()}>
                        <span className="btn-toggle"><i style={ {height:20} } className={["fa", "fa-"+(this.state.sidebarOpened ? "angle-left":"angle-right")].join(" ")}></i></span>
                    </div>*/}
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
            <div className="App" id="outer-container">
                <header><Error /></header>

                <main>
                    <div class="container-wide">
                        <div class="row block hero">
                            <h2>Where are my taxes?</h2>
                            <p>Où vont mes taxes dans les caisses de l'état?</p>
                        </div>
                        
                    </div>
                    <div class="container-wide" style={{marginTop:-35}}>
                        <div class="row block description" >
                            <h2>Data</h2>
                        </div>
                    </div>
                    <div class="container">
                            { this.props.ready ? this.app() : <Loader /> }
                    </div>
                    <div class="container-wide">
                        <div class="block author">
                            <div class=" row">
                                <div class="col s12">
                                    <h2 class="block__title">Author</h2>
                                </div>
                                <div class="col s12">
                                    <img src="https://avatars1.githubusercontent.com/u/8183656?s=460&v=4" alt="profil picture" class="circle responsive-img author__img" />
                                    <h3 class="author__name">Thomas Ricci</h3>
                                    <ul class="author__social-media">
                                        <li class="author__social-media__icon author__social-media__icon--github">
                                            <a href="https://github.com/Grisou13" target="_blank">
                                                <i style={{fontSize:100}} class="fa fa-github fa-10x"></i>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
