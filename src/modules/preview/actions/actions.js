import {INIT_PREVIEW_STRIPE, CHANGE_COLOUR_PREVIEW_STRIPE} from './types';
import {ON_CHANGE_COLOUR} from '../../../shared/actions/changedColourTypes';

export const initPreviewStripe = (name)=>{
    return {
        type: INIT_PREVIEW_STRIPE,
        name
    }
};

export const changeColour = ({props, meta})=>{
    const getCurrObj = (getState, props, meta) => {
        const currState = getState();
        return currState[meta.type][meta.scope][meta.index];
    };

    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_COLOUR_PREVIEW_STRIPE,
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
