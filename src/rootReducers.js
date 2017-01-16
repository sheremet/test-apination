import { combineReducers } from 'redux';

import main from './modules/main/reducer';
import preview from './modules/preview/reducer';

export default combineReducers({
    main,
    preview
});
