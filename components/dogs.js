const express = require('express');
const router = express.Router();

//  Some fixed example data of dogs 
const dogData = {
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

// Create a new dog 
router.post('/', (req, res) => {

    dogData.dogs.push({
        id: dogData.dogs.length + 1,
        name: req.body.name,
    })
    
    res.sendStatus(201);
});

module.exports = router;