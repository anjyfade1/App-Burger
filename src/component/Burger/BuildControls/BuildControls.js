    import React from 'react';
    import './BuildControls.css';
    import BuildControl from '../BuildControls/BuildControl/BuildControl';

    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' },
    ];
    
    const buildcontrols = (props) =>(
        <div className = 'BuildControls'>
        <p><strong>Current Price: {props.price.toFixed(2)} </strong></p>

            {controls.map(ctrl => {return <BuildControl 
             key={ctrl.label}
             label={ctrl.label}
             more={()=>props.ingredientAdded(ctrl.type)} 
             less={()=>props.ingredientRemoved(ctrl.type)} 
             disabled ={props.disable[ctrl.type]}/>})}

         <button className= 'OrderButton' 
         disabled = {!props.purchasable} onClick = {props.purchase}> {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'} </button>
        </div>
    );  

    export default buildcontrols;