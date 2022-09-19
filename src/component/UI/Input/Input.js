import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
const inputClasses = ['InputElement'];

if (props.invalid && props.shouldValidate && props.touched){
    inputClasses.push('Invalid');
}
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
            className = {inputClasses.join(' ')} 
            {...props.elementConfig}
            value = {props.value}
             onChange = {props.change} />
            break;
        case ('textarea'):
            inputElement = <textarea
            className = {inputClasses.join(' ')} 
            {...props.elementConfig}
            value = {props.value}  
            onChange = {props.change} />
            break;
        case ('select'):
            inputElement = 
            <select
            className = {inputClasses.join(' ')} 
            {...props.elementConfig}
            value = {props.value}
            onChange = {props.change} >
            {props.elementConfig.options.map(option => (
                <option key = {option.value} value = {option.value}>
                    {option.displayValue}
                </option>
            ))} 
            </select>
            break;
    
        default:
            inputElement = <input 
            className = {inputClasses.join(' ')} 
            {...props.elementConfig}
            value = {props.value} />
            break;
    }
    return(
        <div>
            <label className = 'Label'>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;