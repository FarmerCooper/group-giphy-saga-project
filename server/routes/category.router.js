const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

//* 1. set up GET request
//! remember to use the http:
router.get('/:url', (req, res) => {
    //const
    const term = req.body;
    const params = req.params;

    //console.log
    console.log(`Req.body:`, term);
    console.log(`Req.params:`, params.url);
    // console.log(`Req.body:`, req.body);

    axios
        .get(
            `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${params.url}`
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.log(`ERR in category.router.jsx`, err);
            res.sendStatus(500);
        });
});

// router.get('/', (req, res) => {
//     // return all categories
//     const queryText = `SELECT * FROM category ORDER BY name ASC`;
//     pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log(`Error on query ${error}`);
//             res.sendStatus(500);
//         });
// });

module.exports = router;
