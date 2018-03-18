import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'
import {debounce} from 'lodash'

import {updateTaxInputFormData,resetTaxInputForm,completeTaxForm} from '../actions/taxForm'

import './TaxForm.sass'

import MultiStep from '../components/MultiStep'

const doesFieldHaveErrors = (fieldName, errors) => {
  return errors.reduce( (acc, error)=>{
    if(error.field == fieldName) acc = true

    return acc
  } ,false)
}

const mapStateToProps = (state) => {
    return {
        form: state.form.fields,
        errors: state.form.errors,
        completed: state.form.completed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInput: (formData) => dispatch(updateTaxInputFormData(formData)),
        reset:()=>dispatch(resetTaxInputForm()),
        formCompleted:()=>dispatch(completeTaxForm())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class TaxForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            form: {
                ...props.form
            },
            finished : this.props.completed
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

    handleChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
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
        this.setState({form: Object.assign({},this.props.form, {married:false, children: false})})
        this.props.reset()
    }
    form = () => {
      const field = (displayName, fieldname, type="text") => (
        <label><span>{displayName}: </span><input type={type} name={fieldname} className={[doesFieldHaveErrors(fieldname, this.props.errors) ? 'error' : null]} onChange={this.handleChange} value={this.state.form[fieldname]}/></label>
      )
      return [
          <div>
            {field("Firstname", "firstname")}
            {field("Last name", "lastname")}
            {field("Email", "email")}
          </div>,
          <div>
            {field("Income", "income")}
            {field("Fortune", "fortune")}
            {field("Deductions", "deductions")}
          </div>,
          <div>
            {field("Children?","children", "checkbox")}
            { this.state.form.children ? field("Number of children", "nb_children") : null}
          </div>,
          <div>
            {field("Married","married","checkbox")}
          </div>
        ]
    }
    handleFormCompleted = () => {
      this.props.formCompleted()
    }
    render(){
        return (
            <div className="form-container">
            {
              this.state.finished ?
                (
                  <div className="form-container--finished">
                    {this.form()}
                    <button onClick={this.resetForm}><span>reset</span></button>
                  </div>
                )
                :
                (
                  <div className="form-container--unfinished">
                    <MultiStep onFinish={this.handleFormCompleted}>
                        {this.form()}
                    </MultiStep>
                  </div>
                )
            }

            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
