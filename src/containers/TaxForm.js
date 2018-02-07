import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import {updateTaxInputFormData} from '../actions/taxForm'

const mapStateToProps = (state) => {
    return {
        form: state.taxForm
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInput: (formData) => dispatch(updateTaxInputFormData(formData))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class TaxForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: props.form || {
                fortune: 0,
                income: 0,
                deductions: 0
            }
        }
    }
    handleChange(key, data){
        this.setState( ({form}) => (
            {
                form:{
                    ...form,
                    [key]:data
                }
            }
        ))
        const isFormCompleted = Object.keys(this.state.form).reduce((prev,current, i, all)=>{
            return prev && this.state.form[current] !== null
        },false)
        console.log(isFormCompleted)
        if(isFormCompleted)
            this.props.updateInput(this.state)
    }
    render(){

        return (
            <div>
                <input name="fortune" onChange={e=>this.handleChange("fortune",e.target.value)} value={this.state.form.fortune}/>
                <input name="income" onChange={e=>this.handleChange("income",e.target.value)} value={this.state.form.income}/>
                <input name="deductions" onChange={e=>this.handleChange("deductions",e.target.value)} value={this.state.form.deductions}/>
            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
