import React from 'react';
import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import rootReducer from './rootReducers';
import Stripes from './modules/main/Stripes';
import './common.css';

let store = createStore(
    rootReducer,
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

const Main = () => {
    return (
        <div className="app">
            <Stripes/>
        </div>
    )
};

const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>);
};

export default App;





