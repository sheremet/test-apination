import {ADD_STRIPE, REMOVE_STRIPE} from './types';

export const addStripe = ()=>{
    return {
        type: ADD_STRIPE
    }
};

export const removeStripe = (id)=>{
    return {
        type: REMOVE_STRIPE,
        id
    }
};