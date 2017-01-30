import { combineReducers } from 'redux';

import main from './modules/main/reducer';
import preview from './modules/preview/previewsReducer';
import selectedColour from './shared/changedColourReduser';
export default combineReducers({
    main,
    preview,
    selectedColour
});
