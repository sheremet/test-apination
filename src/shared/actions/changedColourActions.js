import {ON_CHANGE_COLOUR} from './changedColourTypes';

export const onChangeColour = ({props, meta}) => {
    return {
        type: ON_CHANGE_COLOUR,
        props,
        meta
    }
};