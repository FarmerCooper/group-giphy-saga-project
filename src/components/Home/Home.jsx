import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    //! local state

    //* 2. create dispatch and useSelector
    //const
    const dispatch = useDispatch();
    const searchResults = useSelector((store) => store.searchResults);

    //* 3. GET => handleClick
    const getSearch = () => {
        axios
            .get('/api/category')
            .then((response) => {
                console.log(`Response is`, response);
                dispatch({
                    type: 'SET_RESULTS',
                    payload: response.data.data,
                });
            })
            .catch((err) => {
                console.log(`ERR in Home.jsx`, err);
            });
    };

    console.log(`What is this thing?:`, searchResults);
    //* 4. Render onto DOM
    return (
        <>
            <form>
                <input placeholder="What gif do you wanna see?"></input>
                <button onClick={getSearch}>Search</button>
            </form>
            <p>Results go here</p>
            {searchResults.map((gif, i) => {
                return <img key={i} src={gif.images.original.url} />;
            })}
        </>
    );
}
