import React from 'react';
import {Provider} from 'react-redux';
import Stripes from './modules/main/Stripes';
import storeInit from './store';
import './common.css';

let store = storeInit();

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





