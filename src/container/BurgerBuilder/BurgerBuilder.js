import React, { Component } from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auc/Auc';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../component/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount(){
        // console.log(this.props);
        this.props.onInitIngredient();
    }
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return  sum > 0;
    }


   
    purchaseHandler=()=>{ 
        if (this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push( '/checkout');

    }
    render(){
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ings){

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/> 
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disable = {disabledInfo} 
                    purchasable = {this.updatePurchaseState(this.props.ings)} 
                    price = {this.props.price}
                    isAuth = {this.props.isAuthenticated}
                    purchase = {this.purchaseHandler} />
                </Aux>
            );
            orderSummary =   <OrderSummary 
            ingredients = {this.props.ings}
            purchaseCancel = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
            price = {this.props.price}/> ;
        }

        return(
            <Aux>
               <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        // purchasabled: state.purchasable
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingNumber) => dispatch(actions.addIngredient(ingNumber)),
        onIngredientRemoved: (ingNumber) => dispatch(actions.removeIngredient(ingNumber)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
