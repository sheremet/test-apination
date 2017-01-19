import {INIT_PREVIEW_STRIPE} from './actions/types';
import {ADD_STRIPE, REMOVE_STRIPE} from '../main/actions/types';
import {generate} from 'shortid';
import {random, colour} from '../../shared/helper';

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


const addStripe = (state) => {
    Object.keys(state).forEach((key) => {
        state[key].push({
            id: generate(),
            colour: colour().withoutRed(),
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

    const removeNotRed = (key, len, index)=>{
        if((len - 1) === index){
            state[key].splice(index, 1);
        }else {
            state[key].splice(0, 1);
        }
    };

    Object.keys(state).forEach((key) => {
        let len = state[key].length;
        let index = getIndexNotRed(key, len - 1);
        if(len > 2){
            state[key].splice(index, 1);
        }else if(len === 2){
            removeNotRed(key, len, index);
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