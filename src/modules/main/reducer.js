import {ADD_STRIPE, REMOVE_STRIPE} from './actions/types';
import {generate} from 'shortid';
import {colour} from '../../shared/helper';

const init = (state, cnt = 8) => {
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
            state.splice(index, 1);
        }else {
            state.splice(0, 1);
        }
    };
    let index = getIndexNotRed(state.length - 1);
    if (index >= 2) {
        state.splice(0, 1);
        return [
            ...state
        ];
    }else {
        removeNotRed(state.length, index);
        return [
            ...state
        ];
    }
};

const addStripe = (state) => {
    let odd = state.length % 2;
    if(state.length === 1){
        return [
            ...state,
            {
                id: generate(),
                colour: colour().white(),
                isRed: false
            }
        ]
    }
    return [
        {
            id: generate(),
            colour: odd ? colour().silver() : colour().white(),
            isRed: false
        },
        ...state
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