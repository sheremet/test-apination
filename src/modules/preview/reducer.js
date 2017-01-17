import {INIT_PREVIEW_STRIPE} from './actions/types';
import {ADD_STRIPE, REMOVE_STRIPE} from '../main/actions/types';
import shortid from 'shortid';
import helper from '../../shared/helper';

const init = (state = [], cnt = 8) => {
    const generateIndexForRed = (num) => {
        let evens = [];
        const getEvens = (num) => {
            for (let i = 1; i <= num; i++) {
                if (i % 2) {
                    evens.push(i);
                }
            }
        };
        getEvens(num);
        let len = evens.length;
        return evens[helper.random(0, len - 1)] - 1;
    };

    let redIndex = generateIndexForRed(cnt);

    const generateItem = () => {
        let len = state.length,
            odd = len % 2,
            item = {
                id: shortid.generate(),
                isRed: false
            };
        const returnObj = () => {
            item.colour = odd ? helper.colour().white() : helper.colour().withoutRed();
            return item;
        };
        return returnObj();
    };
    for (let i = 0; i < cnt; i++) {
        state.push(generateItem());
    }
    state[redIndex].colour = helper.colour().red();
    state[redIndex].isRed = true;
    return state;
};


const addStripe = (state) => {
    Object.keys(state).forEach((key) => {
        let odd = state[key].length % 2;
        state[key].push({
            id: shortid.generate(),
            colour: odd ? helper.colour().white() : helper.colour().withoutRed(),
            isRed: false
        });
    });
    return state;
};

const removeStripe = (state) => {
    const getIndexNotRed = (key, i) => {
        if (state[key][i].isRed) {
            return getIndexNotRed(key, i - 1);
        }
        return i;
    };
    Object.keys(state).forEach((key) => {
        let index = getIndexNotRed(key, state[key].length - 1);
        if (index > 1 && state[key].length > 8) {
            state[key].splice(index, 1);
        }
    });
    return state;
};

export default (state = {}, action = {}) => {
    switch (action.type) {
        case INIT_PREVIEW_STRIPE:
            state[action.name] = init();
            return state;
        case ADD_STRIPE:
            return addStripe(state);
        case REMOVE_STRIPE:
            return removeStripe(state);
        default:
            return state;
    }
}