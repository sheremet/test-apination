import {ADD_STRIPE, REMOVE_STRIPE, CHANGE_COLOUR_STRIPE} from './types';
import {ON_CHANGE_COLOUR} from '../../../shared/actions/changedColourTypes';
import {ON_ADD_PREVIEW_STRIPE} from '../../preview/actions/types';
export const addStripe = (type, index) => {

    //For main
    const getStripeIndex = (state, type, index) => {
        return state.selectedColour[type].has.indexOf(index);
    };

    const getStripeColourByIndex = (state, type, index) => {
        return state.selectedColour[type].map[index];
    };

    const isExistInChangedColours = (state, type, index) => {
        return state.selectedColour
            && state.selectedColour[type]
            && getStripeIndex(state, type, index) !== -1;
    };

    //For Preview
    const prepareObject = (nextState, index)=>{
        let obj = {};
        for(let key in nextState.preview){
            if(nextState.preview.hasOwnProperty(key) && isExistInChangedColours(nextState, key, index)){
                obj[key] = {
                    colour: getStripeColourByIndex(nextState, key, index),
                    colourChanged: true
                }
            }
        }
        return obj;
    };

    return (dispatch, getState) => {
        let state = getState();
        let configToDispatch = {
            type: ADD_STRIPE
        };
        if (isExistInChangedColours(state, type, index)) {
            configToDispatch.colour = getStripeColourByIndex(state, type, index);
            configToDispatch.colourChanged = true;
        }
        dispatch(configToDispatch);
        let nextState = getState();
        let propsPreview = prepareObject(nextState, index);
        dispatch({
            type: ON_ADD_PREVIEW_STRIPE,
            props: propsPreview,
            meta: {
                index,
                scope: 'preview'
            }
        });
    };
};

export const removeStripe = (index) => {
    return {
        type: REMOVE_STRIPE,
        index
    }
};

export const changeColour = ({props, meta}) => {
    const getCurrObj = (getState, props, meta) => {
        const currState = getState();
        return currState[meta.scope][meta.index];
    };

    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_COLOUR_STRIPE,
            props,
            meta
        });
        const changedState = getCurrObj(getState, props, meta);
        dispatch({
            type: ON_CHANGE_COLOUR,
            props: changedState,
            meta
        });
    };
};