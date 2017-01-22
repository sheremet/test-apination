import {ADD_STRIPE, REMOVE_STRIPE, CHANGE_COLOUR_STRIPE} from './types';

export const addStripe = () => {
    return {
        type: ADD_STRIPE
    }
};

export const removeStripe = (index) => {
    return {
        type: REMOVE_STRIPE,
        index
    }
};

export const changeColour = ({id, colourChanged, isRed}) => {

    return {
        type: CHANGE_COLOUR_STRIPE,
        id,
        colourChanged,
        isRed
    }
};