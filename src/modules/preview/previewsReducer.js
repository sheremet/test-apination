import {REMOVE_STRIPE} from '../main/actions/types';
import {INIT_PREVIEW_STRIPE, CHANGE_COLOUR_PREVIEW_STRIPE, ON_ADD_PREVIEW_STRIPE} from './actions/types';
import {generate} from 'shortid';
import {random, colour} from '../../shared/helper';

const initPreviewStripe = (state, action) => {
    const init = (state = [], cnt = 8) => {
        const generateIndexForRed = (num) => {
            return random(0, num - 1);
        };

        let redIndex = generateIndexForRed(cnt);

        const generateItem = () => {
            let item = {
                id: generate(),
                isRed: false
            };
            const returnObj = () => {
                item.colour = colour().withoutRed();
                return item;
            };
            return returnObj();
        };
        for (let i = 0; i < cnt; i++) {
            state.push(generateItem());
        }
        state[redIndex].colour = colour().red();
        state[redIndex].isRed = true;
        return state;
    };
    return {
        ...state,
        [action.name]: init()
    };
};

const addPreviewStripe = (state, action) => {
    const {props} = action;
    const extendWithObject = (key) => {
        return props[key] ? props[key] : {};
    };

    let resultsAdd = {};
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            resultsAdd[key] = [
                ...state[key],
                Object.assign({
                    id: generate(),
                    colour: colour().withoutRed(),
                    isRed: false
                }, extendWithObject(key))

            ];
        }
    }
    return resultsAdd;
};

const removePreviewStripe = (state) => {
    let resultsRemove = {};
    const removeOneStripe = (state) => {
        const getIndexNotRed = (i) => {
            if (state[i].isRed) {
                return getIndexNotRed(i - 1);
            }
            return i;
        };

        const removeNotRed = (len, index) => {
            if ((len - 1) === index) {
                state.splice(index, 1);
            } else {
                state.splice(0, 1);
            }
        };

        let len = state.length;
        let index = getIndexNotRed(len - 1);
        if (len > 2) {
            state.splice(index, 1);
        } else if (len === 2) {
            removeNotRed(len, index);
        }
        return state;
    };
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            resultsRemove[key] = [...state[key]];
            resultsRemove[key] = removeOneStripe(resultsRemove[key]);
        }
    }
    return resultsRemove;
};

const changeColourPreviewStripe = (state, action) => {
    const {id, isRed, colourChanged} = action.props;
    const {parentId} = action.meta;
    if (!isRed && !colourChanged) {
        let arr = [];
        state[parentId].forEach((val) => {
            let obj = {
                ...val
            };
            if (obj.id === id) {
                obj.colour = colour().withoutRed();
                obj.colourChanged = true;
            }
            arr.push(obj);
        });
        return {
            ...state,
            [parentId]: arr
        };
    }
    return state;
};

export default (state = {}, action = {}) => {
    switch (action.type) {
        case INIT_PREVIEW_STRIPE:
            return initPreviewStripe(state, action);
        case ON_ADD_PREVIEW_STRIPE:
            return addPreviewStripe(state, action);
        case REMOVE_STRIPE:
            return removePreviewStripe(state);
        case CHANGE_COLOUR_PREVIEW_STRIPE:
            return changeColourPreviewStripe(state, action);
        default:
            return state;
    }
}