const express = require("express");
const catRouter = express.Router();

const uuid = require("uuid");
let cats = require("../catData.js");

//actual routes go here
 catRouter.route("/")
    .get((req, res) => {
        const { query } = req;
        //check each cat in the array
        //filter it by matching properties/values
        const queriedCats = cats.filter(cat => {
            for (let key in query) {
                if (!cat.hasOwnProperty(key) || String(cat[key]).toLowerCase() !== query[key].toLowerCase()) {
                    return false;
                }
            }
            return true;
        })
        res.status(200).send(queriedCats);
    })
    .post((req, res) => {
        //give data in request body an id
        const newCat = req.body;
        newCat._id = uuid() + "DERP";
        // save the data in request body to the 'database'
        cats.push(newCat);
        //send back the data that was added
        res.status(201).send(newCat);
    });

// GET one request
 catRouter.route("/:id")
    .get((req, res) => {
        // get param id:
        const { id } = req.params;
        //find cat matching id:
        const foundCat = cats.filter(cat => cat._id === id)[0];
        // send back the cat
        res.status(200).send(foundCat);
    })
    // DELETE one request
    .delete((req, res) => {
        const { id } = req.params;
        // find and remove cat matching id:
        cats = cats.filter(cat => cat._id !== id);
        //send back the message the cat was removed
        res.status(204).send();
    })
    //PUT one
    .put((req, res) => {
        //find the param id
        const { id } = req.params;
        let editedCat = req.body;
        //map through cats and replace the cat w/ matching id with req.body
        cats = cats.map(cat => cat._id === id ? editedCat = { ...cat, ...editedCat } : cat);
        res.status(200).send(editedCat);
    })

module.exports = catRouter;