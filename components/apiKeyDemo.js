const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');


let grantedApiKeys = [
    {
        username: "Tester",
        key: uuidv4()
    }
];

router.get('/new/:username', (req, res) => {
    const newApiKey = uuidv4();

    // username must have value
    if(req.params.username === undefined)
    {
        console.log("username undefined");
        res.sendStatus(400);
    }

    // find existing user with the given username
    const userIndex = grantedApiKeys.findIndex(ap => ap.username === req.params.username);
    if(userIndex != -1)
    {
        // create new api key for this existing user
        grantedApiKeys[userIndex].key = uuidv4();
        res.json( grantedApiKeys[userIndex]);
    }
    else
    {
        // create new apikey-user entity
        const newEntity = {
            username: req.params.username,
            key: uuidv4()
        };

        grantedApiKeys.push(newEntity);

        res.json(newEntity);
    }
});

router.get('/protected', (req,res) => {
    if(req.headers['application-apikey'] === undefined)
    {
        return res.sendStatus(400);
    }

    // Check for matching apikey
    const keyResult = grantedApiKeys.findIndex(ap => ap.key === req.headers['application-apikey']);
    if(keyResult === -1)
    {
        console.log("apikey not found");
        res.status(401).json({ reason: "Invalid apikey" });
    }
    else
    {
        console.log("apikey matched with username " + grantedApiKeys[keyResult].username);
        res.status(200).json({ result: "Api key validated successfully "});
    }
})


module.exports = router;