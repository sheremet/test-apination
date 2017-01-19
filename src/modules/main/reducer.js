import {ADD_STRIPE, REMOVE_STRIPE} from './actions/types';
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
    const getIndexNotRed = (i) => {
        if (state[i].isRed) {
            return getIndexNotRed(i - 1);
        }
        return i;
    };
    const removeNotRed = (len, index)=>{

        if((len - 1) === index){
            return new iArr(state).removeFromIndex(index);
        }else {
            return new iArr(state).removeFromStart();
        }
    };
    let index = getIndexNotRed(state.length - 1);
    if (index >= 2) {
        return new iArr(state).removeFromStart();
    }else {
        return removeNotRed(state.length, index);
    }

};

const addStripe = (state) => {
    let odd = state.length % 2;
    if(state.length === 1){
        return new iArr(state).addToEnd({
            id: generate(),
            colour: colour().white(),
            isRed: false
        });
    }
    return new iArr(state).addToStart({
        id: generate(),
        colour:odd ? colour().silver() : colour().white(),
        isRed: false
    });
};

export default (state = init(), action = {}) => {
    switch (action.type) {
        case ADD_STRIPE:
            return addStripe(state);
        case REMOVE_STRIPE:
            return removeStripe(state);
        default:
            return state;
    }
}