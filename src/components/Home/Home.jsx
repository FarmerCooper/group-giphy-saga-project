import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function Home() {
    //const
    const dispatch = useDispatch();

    //GET
    const handleClick = () => {
        axios
            .get('/api/category')
            .then((response) => {
                console.log(`Response is`, response);
                dispatch({
                    type: 'SET_CATEGORY',
                    payload: response.data.data,
                });
            })
            .catch((err) => {
                console.log(`ERR in app.jsx`, err);
            });
    };

    return (
        <>
            <form>
                <input placeholder="What gif do you wanna see?"></input>
                <button onClick={handleClick}>Search</button>
            </form>
        </>
    );
}
