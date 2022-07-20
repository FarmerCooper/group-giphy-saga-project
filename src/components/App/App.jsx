import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Favorites from "../Favorites/Favorites";
import {HashRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch will go here
    // dispatch({});
  }, []);

  return (
    <Router>
      <div>
        <h1>Giphy Search!</h1>
      </div>
      <Route path="/favorites" exact component={Favorites} />
    </Router>
  );
}

export default App;
