import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

const gifList = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIFS':
            return action.payload;
        default:
            return state;
    }
};

//GET => search results
const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

const favList=(state=[], action)=>{
    switch(action.type) {
        case 'SET_FAVS':
            console.log(action.payload)
            //maybe spread payload
            return action.payload;
            
        default:
            return state;
        }
        
}

function* fetchFavs(){
    try{
        const favsResponse=yield axios.get('/api/favorite')
        yield put({type: 'SET_FAVS', payload: favsResponse.data})
    } catch(error){
        console.log('Error in fetchFavs', error)
    }
}


function* watcherSaga() {
    // saga listeners go here
    yield takeEvery('FETCH_FAVS', fetchFavs)
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
        gifList,
        favList
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
