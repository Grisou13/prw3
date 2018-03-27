import React from 'react'
import PropTypes from "prop-types";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './style.sass'

const Step = ({component, active}) => {
  const classes = ["step", "step--"+ (active ? "active" : "inactive")]
return (
  <div className={classes.join(' ')}>
    {component}
  </div>
)
}

class MultiStep extends React.Component {
  constructor(props){
    console.log(props)
    super();
    this.state = {
      currentStep:0,
      stepCount:props.children.length - 1
    }
  }
  gotoNextStep = () => {
    this.setState((prevState, props) => {
      return {currentStep : prevState.currentStep += 1}
    })
  }
  onFinish = () => {
    this.props.onFinish()
  }
  gotoPreviousStep = () => {
    this.setState((prevState, props) => {
      return {currentStep : prevState.currentStep -= 1}
    })
  }
  gotoStep = (index) => {
    this.setState((prevState, props) => {
      return {currentStep : index}
    })
  }
  render(){
    return (
      <div className="step-container">

        <div className="steps-counter">
          { this.props.children.map( (step, index, array) => (<span onClick={()=>this.gotoStep(index)} key={index} className={["step-counter","step-counter--"+(index == this.state.currentStep ? "active" : index <= this.state.currentStep ? "done": "inactive")].join(' ')}><span>{index}</span></span>) )}
        </div>
        <div className="steps">

              {this.props.children.map( (step, index, array) => (<Step key={index} active={this.state.currentStep === index} component={step} />) )}
            
        </div>
        <div className="controls">
          { this.state.currentStep > 0 ? (<button onClick={this.gotoPreviousStep}><span>Previous</span></button>) : null}
          { this.state.currentStep === this.state.stepCount ? (<button onClick={this.onFinish}><span>See my results</span></button>) : (<button onClick={this.gotoNextStep}><span>Next</span></button>)}
        </div>
      </div>
    )
  }
}
MultiStep.propTypes = {
  children: PropTypes.node,
  onFinish: PropTypes.func
}

export default MultiStep
