import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png' ;
import './Logo.css';
const logo = () => (
    <div className = 'Logo'> 
        <img src = {burgerLogo} alt ='Logo'/>
    </div>
);

export default logo;
