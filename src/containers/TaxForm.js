import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import {updateTaxInputFormData,resetTaxInputForm} from '../actions/taxForm'

const mapStateToProps = (state) => {
    return {
        form: state.taxForm
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInput: (formData) => dispatch(updateTaxInputFormData(formData)),
        reset:()=>dispatch(resetTaxInputForm())
    }
}

const defaultState = {
    form: {
        fortune: "",
        income: "",
        deductions: ""
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class TaxForm extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            form: props.form || this.defaultState.form
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }
    
    handleChange(key, data){
        this.setState( ({form}) => (
            {
                form:{
                    ...form,
                    [key]:data
                }
            }
        ), ()=>{
            let isFormCompleted = Object.keys(this.state.form).every(val => this.state.form[val] && this.state.form[val].length >= 1);
        
            if(isFormCompleted)
                this.props.updateInput(this.state.form)
        })
        
    }
    resetForm(){
        this.setState({
            ...this.defaultState
        })
        this.props.reset()
    }
    render(){

        return (
            <div>
                <label><span>Fortune: </span><input name="fortune" onChange={e=>this.handleChange("fortune",e.target.value)} value={this.state.form.fortune}/></label>
                <label><span>Income: </span><input name="income" onChange={e=>this.handleChange("income",e.target.value)} value={this.state.form.income}/></label>
                <label><span>Deductions: </span><input name="deductions" onChange={e=>this.handleChange("deductions",e.target.value)} value={this.state.form.deductions}/></label>
                <button onClick={this.resetForm} ><span>Reset</span></button>
            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
