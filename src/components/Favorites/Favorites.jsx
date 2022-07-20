import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect } from 'react'
import axios from 'axios'

function Favorites() {

    const dispatch=useDispatch()
    const favList=useSelector(store=>store.favList)
    useEffect(()=>{
        dispatch({type: 'FETCH_FAVS'})
    }

    )
    

    return (
        <p>
        </p>
    )
}

export default Favorites;