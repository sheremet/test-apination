import {ON_CHANGE_COLOUR} from './actions/changedColourTypes';

export default (state = {}, action) => {

    const isInitialChangedColour = () => {
        return state[action.meta.scope]
            && state[action.meta.scope].has;
    };
    const checkIfExist = (currIndex) => {
        return isInitialChangedColour()
            && state[action.meta.scope].has.indexOf(currIndex) !== -1;
    };

    switch (action.type) {
        case ON_CHANGE_COLOUR:
            const currIndex = action.meta.scope === 'main' ? action.meta.reverseIndex : action.meta.index;
            if (!isInitialChangedColour()) {
                return {
                    ...state,
                    [action.meta.scope]: {
                        has: [currIndex],
                        map: {
                            [currIndex]: action.props.colour
                        }
                    }
                }
            }

            if (checkIfExist(currIndex)) {
                return state;
            }

            return {
                ...state,
                [action.meta.scope]: {
                    has: [...state[action.meta.scope].has, currIndex],
                    map: {
                        ...state[action.meta.scope].map,
                        [currIndex]: action.props.colour
                    }
                }
            };
        default:
            return state;
    }
}
