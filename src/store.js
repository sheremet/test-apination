import createLogger from 'redux-logger';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';

const setStore = ()=>{
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        rootReducer,
        compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
        applyMiddleware(...middlewares)
    );

};

export default setStore;