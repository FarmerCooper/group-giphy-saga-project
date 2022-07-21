const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

//* 1. set up GET request
router.get('/', (req, res) => {
    axios
        .get(
            `api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}`
        )
        .then((response) => {
            console.log(`Here's what I got from giphy API:`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.log(`ERR in category.router.jsx`, err);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    // return all categories
    const queryText = `SELECT * FROM category ORDER BY name ASC`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
