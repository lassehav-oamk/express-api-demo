const express = require('express');
const router = express.Router();

//  Some fixed example data of dogs 
const dogData = {
    dogs: [{
        id: 1,
        name: "Max"
    },
    {
        id: 2,
        name: "Bella"
    },
    {
        id: 3,
        name: "Tucker"
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

// Create a new dog 
router.post('/', (req, res) => {

    dogData.dogs.push({
        id: dogData.dogs.length + 1,
        name: req.body.name,
    })
    
    res.sendStatus(201);
});

module.exports = router;