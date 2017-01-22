import {INIT_PREVIEW_STRIPE, CHANGE_COLOUR_PREVIEW_STRIPE} from './types';

export const initPreviewStripe = (name)=>{
    return {
        type: INIT_PREVIEW_STRIPE,
        name
    }
};

export const changeColour = ({id, colourChanged, isRed}, parentId)=>{
    return {
        type: CHANGE_COLOUR_PREVIEW_STRIPE,
        id,
        parentId,
        isRed,
        colourChanged
    }
};
