import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'
import {debounce} from 'lodash'

import {updateTaxInputFormData,resetTaxInputForm} from '../actions/taxForm'

import './TaxForm.sass'

const mapStateToProps = (state) => {
    return {
        form: state.form.fields
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInput: (formData) => dispatch(updateTaxInputFormData(formData)),
        reset:()=>dispatch(resetTaxInputForm())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class TaxForm extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            form: {
                ...props.form
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }
    
    handleChange(e){
        const {name, value} = e.target
        this.setState( ({form}) => (
            {
                form:{
                    ...form,
                    [name]:value
                }
            }
        ), ()=>{
            /*let isFormCompleted = Object.keys(this.state.form).every(val => this.state.form[val] && this.state.form[val].length >= 1);
        
            if(isFormCompleted)*/
            debounce(()=>this.props.updateInput({name, value}),1000)()
        })
    }
    resetForm(){
        this.setState({form: this.props.form})
        this.props.reset()
    }
    render(){

        return (
            <div className="form-container">
                <label><span>Fortune: </span><input type="text" name="fortune" onChange={this.handleChange} value={this.state.form.fortune}/></label>
                <label><span>Income: </span><input type="text" name="income" onChange={this.handleChange} value={this.state.form.income}/></label>
                <label><span>Deductions: </span><input type="text" name="deductions" onChange={this.handleChange} value={this.state.form.deductions}/></label>
                <label><span>Nb children: </span><input type="text" name="nb_children" onChange={this.handleChange} value={this.state.form.nb_children}/></label>
                <label><span>Married: </span><input type="checkbox" name="married" onChange={this.handleChange} value={this.state.form.married}/></label>

                <button onClick={this.resetForm} ><span>Reset</span></button>
            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
