import {INIT_PREVIEW_STRIPE} from './types';

export const initPreviewStripe = (name)=>{
    return {
        type: INIT_PREVIEW_STRIPE,
        name
    }
};
