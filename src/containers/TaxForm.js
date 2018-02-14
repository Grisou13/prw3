import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'
import {debounce} from 'lodash'

import {updateTaxInputFormData,resetTaxInputForm} from '../actions/taxForm'

const mapStateToProps = (state) => {
    return {
        form: state.form
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
            debounce(()=>this.props.updateInput(this.state.form),1000)()
        })
    }
    resetForm(){
        
        this.props.reset()
    }
    render(){

        return (
            <div>
                <label><span>Fortune: </span><input name="fortune" onChange={this.handleChange} value={this.state.form.fortune}/></label>
                <label><span>Income: </span><input name="income" onChange={this.handleChange} value={this.state.form.income}/></label>
                <label><span>Deductions: </span><input name="deductions" onChange={this.handleChange} value={this.state.form.deductions}/></label>
                <label><span>Nb children: </span><input name="nb_children" onChange={this.handleChange} value={this.state.form.nb_children}/></label>

                <button onClick={this.resetForm} ><span>Reset</span></button>
            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
