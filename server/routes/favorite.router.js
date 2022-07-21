const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
    // get all favorites from the database
    pool.query('SELECT "favorites"."url" FROM "favorites";')
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('ERROR in GET /favorites', error);
            res.sendStatus(500);
        });
});

// add a new favorite
router.post('/', (req, res) => {
    //const
    const newFav = req.body.url;
    console.log(`newFav`, newFav);
    //sqlText
    const sqlQuery = `INSERT INTO "favorites" ("url", "category_id") VALUES($1, $2);`;
    //pool.query
    pool.query(sqlQuery, [newFav, 1])
        .then((result) => {
            console.log(`POST Success!`, result);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`ERR in POST favorite.router.jsx`, err);
            res.sendStatus(500);
        });

    res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
    // req.body should contain a category_id to add to this favorite image
    res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
