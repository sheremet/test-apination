import {ADD_STRIPE, REMOVE_STRIPE, CHANGE_COLOUR_STRIPE} from './actions/types';
import {generate} from 'shortid';
import {colour, iArr} from '../../shared/helper';

const init = (cnt = 8) => {
    let state = [];
    const generateItem = () => {
        let len = state.length,
            odd = len % 2,
            item = {
                id: generate(),
                isRed: false
            };
        const returnObj = () => {
            if (len === 6) {
                item.colour = colour().red();
                item.isRed = true;
                return item;
            }
            item.colour = odd ? colour().white() : colour().silver();
            return item;
        };
        return returnObj();
    };
    for (let i = 0; i < cnt; i++) {
        state.push(generateItem());
    }
    return state;
};

const removeStripe = (state) => {
    return new iArr(state).removeFromStart();
};

const addStripe = (state, action) => {
    let odd = state.length % 2;
    let preparedObject = {
        id: generate(),
        colour: action.colour ? action.colour : (odd ? colour().silver() : colour().white()),
        isRed: false,
        colourChanged: action.colourChanged
    };
    return new iArr(state).addToStart(preparedObject);
};

const changeColour = (state, action) => {
    const {id, isRed, colourChanged} = action.props;
    if (!isRed && !colourChanged) {
        let arr = [];
        state.forEach((val) => {
            let obj = {
                ...val
            };
            if (obj.id === id) {
                obj.colour = colour().withoutRed();
                obj.colourChanged = true;
            }
            arr.push(obj);
        });
        return arr;
    }
    return state;
};

export default (state = init(), action = {}) => {
    switch (action.type) {
        case ADD_STRIPE:
            return addStripe(state, action);
        case REMOVE_STRIPE:
            return removeStripe(state);
        case CHANGE_COLOUR_STRIPE: {
            return changeColour(state, action);
        }
        default:
            return state;
    }
}