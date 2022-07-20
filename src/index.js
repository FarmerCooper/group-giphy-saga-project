import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

const gifList = (state = [], action) => {
    switch(action.type) {
        case 'SET_GIFS':
            return action.payload;
        default:
            return state;
    }
}

// this is the saga that will watch for actions
function* watcherSaga() {
    // saga listeners go here
}

const sagaMiddleware = createSagaMiddleware();

// Store instance
// Holds all the information for our app
const storeInstance = createStore (
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        //reducers go here
        gifList
    }),
    applyMiddleware(sagaMiddleware, logger),
);


// create sagaMiddleware
sagaMiddleware.run(watcherSaga);

// Renders to the rest of the app
ReactDOM.render(
<Provider store={storeInstance}>
<App />
</Provider>,  
document.getElementById('root'));

registerServiceWorker();