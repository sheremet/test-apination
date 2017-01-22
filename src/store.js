import createLogger from 'redux-logger';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducers';

const setStore = ()=>{
    const middlewares = [];
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