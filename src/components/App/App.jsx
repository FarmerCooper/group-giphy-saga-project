//hooks
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

//components
import Favorites from '../Favorites/Favorites';
import Home from '../Home/Home';

//css
import './App.css';

function App() {
    //const
    const dispatch = useDispatch();

  useEffect(() => {
    //dispatch will go here
    // dispatch({});
    dispatch({type: 'FETCH_FAVS'})
  }, []);

    return (
        <Router>
            <div className="App-Header">
                <h1>Giphy Search!</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </nav>
            </div>
            <Route path="/" exact component={Home} />
            <Route path="/favorites" exact component={Favorites} />
        </Router>
    );
}

export default App;
