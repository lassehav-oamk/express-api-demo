const express = require('express');
const has = require('has-value');
const router = express.Router();

function validateJSONHeaders(req, res, next)
{
    if(req.get('Content-Type') === 'application/json')
    {
        next();
    }
    else
    {
        const err = new Error('Bad Request - Missing Headers');
        err.status = 400;
        next(err);
    }
}

//  Some fixed example data of dogs
let dogData = {
    dogs: [{
        id: 1,
        name: "Max",
        image: "https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
    },
    {
        id: 2,
        name: "Bella",
        image: "https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif"
    },
    {
        id: 3,
        name: "Tucker",
        image: "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif"
    }]
}

//  Return all dog information
router.get('/', (req, res) => { res.json(dogData)});

//  Return information of a single dog
router.get('/:dogId', (req, res) => {
    const resultDog = dogData.dogs.find(d => {
        if (d.id == req.params.dogId) {
            return true;
        }
        else {
            return false;
        }
    });
    if(resultDog === undefined)
    {
        res.sendStatus(404)
    }
    else
    {
        res.json(resultDog);
    }
})

/* Middleware to validate new dog creation */
function validateNewDog(req, res, next)
{
    // prepare error object
    const err = new Error();
    err.name = "Bad Request";
    err.status = 400;
    if(has(req.body, 'name') == false)
    {
        err.message = "Missing or empty name";
        next(err);
    }
    if(has(req.body, 'image') == false)
    {
        err.message = "Missing or empty image";
        next(err);
    }
    next(); // no validation errors, so pass to the next
}

/* Create a new dog
    Expects the following data format
    {
        name: string,
        image: string - whole url to image
    }
*/
router.post('/',
    [
      validateJSONHeaders,
      validateNewDog
    ],
    (req, res) => {
        const newDog = {
            id: dogData.dogs.length + 1,
            name: req.body.name,
            image: req.body.image
        }
        dogData.dogs.push(newDog);

        res.status(201);
        res.json(newDog);
});

router.delete('/:id', (req, res) => {
    dogData.dogs = dogData.dogs.filter(dog => dog.id != req.params.id);
    res.sendStatus(200);
})

module.exports = router;