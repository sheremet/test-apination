import {ADD_STRIPE, REMOVE_STRIPE} from './actions/types';
import shortid from 'shortid';
import helper from '../../shared/helper';

const init = (state, cnt = 8) => {
    const generateItem = () => {
        let len = state.length,
            odd = len % 2,
            item = {
                id: shortid.generate(),
                isRed: false
            };
        const returnObj = () => {
            if (len === 6) {
                item.colour = helper.colour().red();
                item.isRed = true;
                return item;
            }
            item.colour = odd ? helper.colour().white() : helper.colour().silver();
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
    const getIndexNotRed = (i) => {
        if (state[i].isRed) {
            return getIndexNotRed(i - 1);
        }
        return i;
    };
    let index = getIndexNotRed(state.length - 1);
    if (index >= 0 && state.length > 8) {
        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    }
    return state;
};

const addStripe = (state) => {
    let odd = state.length % 2;
    return [
        ...state,
        {
            id: shortid.generate(),
            colour: odd ? helper.colour().white() : helper.colour().withoutRed(),
            isRed: false
        }
    ];
};

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_STRIPE:
            return addStripe(state);
        case REMOVE_STRIPE:
            return removeStripe(state);
        default:
            return !state.length ? init(state) : state;
    }
}