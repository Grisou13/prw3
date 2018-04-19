import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'

import {updateTaxInputFormData,resetTaxInputForm,completeTaxForm} from '../actions/taxForm'

import './TaxForm.sass'
// import './form.sass'
import MultiStep from '../components/MultiStep'

import Slider from 'react-rangeslider' 
import 'react-rangeslider/lib/index.css' 
import Switch from 'react-toggle-switch'
import NumericInput from 'react-numeric-input';

const doesFieldHaveErrors = (fieldName, errors) => {
  return errors.reduce( (acc, error)=>{
    if(error.field === fieldName) acc = true

    return acc
  } ,false)
}
const errorsForField = (fieldName, errors) => {
    return errors.reduce( (acc, error)=>{
        if(error.field === fieldName) acc.push(error.message)
        return acc
      } ,[])
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
        return this.updateField(name, value)
    }
    updateField = (name, value) => {
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
            this.props.updateInput({name, value})
            console.log(this.state)
        })
    }
    resetForm(){
        this.setState({form: Object.assign({},this.props.form, {married:false, children: false})})
        this.props.reset()
    }
    form = (props) => {
      const field = (displayName, fieldname, type="text", autofocus = false) => {         
          return (
            <div className="form-input">
                <input type={type} name={fieldname} className={[doesFieldHaveErrors(fieldname, this.props.errors) ? 'error' : 'valid', "input"].join(" ")} onChange={this.handleChange} value={this.state.form[fieldname]}/>
                <label>{displayName}</label>
                {
                    doesFieldHaveErrors(fieldname, this.props.errors) ? 
                    (
                        <div className="requirements">
                            {errorsForField(fieldname, this.props.errors).map(t => (<span>{t}</span>))}
                        </div>
                    )
                    :
                    null
                }
                
            </div>
          )
          
      }
      return [
          <div key="first-step">
            {field("Firstname", "firstname", "text",true)}
            {field("Last name", "lastname")}
            {field("Email", "email")}
          </div>,
          <div  key="second-step">
            {field("Income", "income","text", true)}
            {field("Fortune", "fortune")}
            {field("Deductions", "deductions")}
          </div>,
          <div key="third-step">
            <div className="form-input">
                <label>Children?</label>
                <Switch className="input" onClick={()=>this.updateField("children", !this.state.form.children)} on={this.state.form.children}/>
            </div>
            { this.state.form.children ? field("Number of children", "nb_children") : null}
          </div>,
          <div key="fourth-step">
            <div className="form-input">
                <label>Married?</label>
                <Switch className="input" onClick={()=>this.updateField("married", !this.state.form.married)} on={this.state.form.married}/>
            </div>
          </div>
        ]
    }
    formCompleted = () => {
        const v = (name) => (val) => this.props.updateInput({name, value: val.toString()})  
    return (
        <div>
            <span>Fortune :</span>
            <Slider 
                min={0} 
                max={parseFloat(this.state.form.fortune) + 2^6} 
                step={Math.round(Math.log10(this.props.form.fortune))} 
                value={parseFloat(this.props.form.fortune)} 
                orientation={"horizontal"} 

                onChange={v("fortune")} 
            /> 

            <span>Income :</span>
            <Slider 
                min={0} 
                max={parseFloat(this.state.form.income) + 2^6 } 
                step={Math.round(Math.log10(this.props.form.income))} 
                value={parseFloat(this.props.form.income)} 
                orientation={"horizontal"} 

                onChange={v("income")} 
            />
            <span>Deductions :</span>
            <Slider 
                min={0} 
                max={parseFloat(this.state.form.deductions) + 2^6 } 
                step={Math.round(Math.log10(this.props.form.deductions))} 
                value={parseFloat(this.props.form.deductions)} 
                orientation={"horizontal"} 

                onChange={v("deductions")} 
            />
            <Switch onClick={()=>this.props.updateInput({name: "children",value: !this.props.form.children})} on={this.props.form.children}/>
            {this.props.children ? <NumericInput value={this.props.nb_children} onChange={(val)=>this.props.updateInput({name:"nb_children", value: val})} /> : null}
            <Switch onClick={()=>this.props.updateInput({name: "married",value: !this.props.form.married})} on={this.props.form.married}/> 
            <button onClick={this.resetForm}><span>reset</span></button>
        </div>
    )}
    handleFormCompleted = () => {        
        this.props.formCompleted()
    }
    render(){
        console.log("IS FORM FINISHED?",this.props)
        return (
            <div className={["form-container", this.state.finished ? "form-container--finished": "form-container--unfinished"].join(" ")}>
                <div className="form">
                    {
                    this.props.completed ?
                        (
                            this.form()
                        )
                        :
                        (
                            <MultiStep onFinish={this.handleFormCompleted}>
                                {this.form()}
                            </MultiStep>
                        )
                    }
                </div>
            </div>
        )
    }
}
TaxForm.propTypes = {
}

export default TaxForm
