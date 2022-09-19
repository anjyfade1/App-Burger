import React,{Component} from 'react';
import {connect} from 'react-redux';

import './Layout.css';
import Aux from '../Auc/Auc';
import ToolBar from '../../component/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandeler=()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToogleHandeler=()=>{
        this.setState( ( prevState ) => { return { showSideDrawer: !prevState.showSideDrawer } } );
    }

    
render(){
    return(
    <Aux >
        <ToolBar isAuth={this.props.isAuthenticated} drawerToogleClicked = {this.sideDrawerToogleHandeler}/>
        <SideDrawer isAuth={this.props.isAuthenticated} closed = {this.sideDrawerCloseHandeler} open= {this.state.showSideDrawer}/>
        <main className = 'Content'>
            {this.props.children}
        </main>
    </Aux>
    );
}
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);