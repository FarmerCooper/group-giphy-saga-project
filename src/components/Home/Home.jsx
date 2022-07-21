import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    //! local state

    //* 2. create dispatch and useSelector
    //const
    const dispatch = useDispatch();
    const searchResults = useSelector((store) => store.searchResults);
    console.log(`What is searchResults: `, searchResults);
    //local
    const [term, setTerm] = useState('');
    const [favorite, setFavorite] = useState([]);

    const search = (event) => {
        setTerm(event.target.value);
    };

    //* 3. GET => handleClick
    const getSearch = () => {
        dispatch({
            type: 'SEARCH_RESULTS',
            payload: term,
        });
        //CLEAR INPUTS
        setTerm('');
    };

    const addToFavorites = (gif) => {
        console.log(`Is this the URL?`, gif.target.src);
        setFavorite(gif.target.src);
        dispatch({
            type: 'POST_FAV',
            payload: favorite,
        });
    };

    console.log(`What is this thing?:`, searchResults);
    //* 4. Render onto DOM
    return (
        <>
            <form>
                <input
                    value={term}
                    onChange={search}
                    placeholder="What gif do you wanna see?"
                ></input>
                <button onClick={getSearch}>Search</button>
            </form>
            <p>Results go here</p>
            {searchResults.map((gif, i) => {
                return (
                    <div key={i}>
                        <img
                            value={favorite}
                            onClick={addToFavorites}
                            src={gif.images.original.url}
                        />
                        <button
                            value={<img src={gif.images.original.url} />}
                            onClick={addToFavorites}
                        >
                            Add to Favorites
                        </button>
                    </div>
                );
            })}
        </>
    );
}
