import React from 'react';
import './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';
const toolBar = (props)=>(
    <header className = 'Toolbar'>
        <DrawerToogle clicked ={props.drawerToogleClicked}/>
        <div className = 'Logo'>
        <Logo/>
        </div>
        <nav className = 'DesktopOnly'>
         <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolBar;