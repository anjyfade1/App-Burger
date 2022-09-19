import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (number) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientNumber : number
    };
};
 
export const removeIngredient = (number) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientNumber : number
    };
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}
 
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-my-burger-c90c0-default-rtdb.firebaseio.com/ingredients.json')
        .then(response=>{
           dispatch(setIngredient(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());         
        });
    };
} 

