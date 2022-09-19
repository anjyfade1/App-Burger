import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auc/Auc';
const sideDrawer = (props) =>{
        let attachedClasses = ['SideDrawer', 'Close'];
        if (props.open) {
            attachedClasses = ['SideDrawer', 'Open'];
        }
     return(
        <Aux>
            <BackDrop show={props.open} clicked= {props.closed}/>
        <div className = {attachedClasses.join(' ')}>
            <div className = 'Logo'>
                <Logo/>
            </div>
            <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
            
        </Aux>
    );
};

export default sideDrawer;