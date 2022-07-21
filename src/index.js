import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//REDUCER
const gifList = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIFS':
            return action.payload;
        default:
            return state;
    }
};

const favList = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVS':
            console.log(action.payload);
            //maybe spread payload
            return action.payload;
        default:
            return state;
    }
};

//GET => search results
const searchResults = (state = [], action) => {
    console.log('this one', action.payload);
    switch (action.type) {
        case 'GET_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

//POST
const postResults = (state = [], action) => {
    console.log('this one', action.payload);
    switch (action.type) {
        case 'POST_RESULTS':
            return [...state, action.payload];
        default:
            return state;
    }
};

//GENERATOR
function* fetchFavs() {
    try {
        const favsResponse = yield axios.get('/api/favorite');
        yield put({ type: 'SET_FAVS', payload: favsResponse.data });
    } catch (error) {
        console.log('Error in fetchFavs', error);
    }
}

function* postSearchTerm(action) {
    try {
        const searchResponse = yield axios.get(
            `/api/category/${action.payload}`
        );
        //! map was correct, but needed .data.data
        yield put({ type: 'GET_RESULTS', payload: searchResponse.data.data });
    } catch (error) {
        console.log('Error in postSearchTerm', error);
    }
    console.log(`Action.payload: `, action.payload);
}

//! 2. POST
function* postFavs(action) {
    try {
        //POST
        yield axios.post('/api/favorite', action.payload);
        //GET => refresh
        yield put({
            type: 'POST_RESULTS',
        });
    } catch (err) {
        console.log(`ERR in postFavs:`, err);
    }
}

// function* postSearchTerm(action) {
//     console.log(`Action.payload:`, action.payload);
//     try {
//         yield axios.get('/api/category', action.payload);
//         //GET
//         yield put({ type: 'GET_CATEGORY' });
//     } catch (error) {
//         console.log('Error in postSearchTerm', error);
//     }
// }

function* watcherSaga() {
    // saga listeners go here
    // GET
    yield takeEvery('FETCH_FAVS', fetchFavs);
    // POST
    yield takeEvery('SEARCH_RESULTS', postSearchTerm);
    yield takeEvery('POST_FAV', postFavs);
}

const sagaMiddleware = createSagaMiddleware();

// Store instance
// Holds all the information for our app
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        //reducers go here
        searchResults,
        postResults,
        gifList,
        favList,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

// create sagaMiddleware
sagaMiddleware.run(watcherSaga);

// Renders to the rest of the app
ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
