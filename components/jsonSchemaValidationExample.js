const express = require('express');
const exampleSchema = require('./schemas/exampleSchema.json');
const router = express.Router();
const Ajv = require('ajv').default;
/*
  Example data structure for testing
  {
    "checked": false,
    "dimensions": {
        "width": 5,
        "height": 10
    },
    "id": 1,
    "name": "A green door",
    "price": 12.5,
    "tags": [
        "home",
        "green"
    ]
}
*/
router.post('/', (req, res) => {
  const ajv = new Ajv();
  const validate = ajv.compile(exampleSchema);

  console.log(req.body);
  const isValid = validate(req.body);
  console.log('isValid', isValid);
  console.log(validate.errors);

  if(isValid == false) {
    res.status(400);
    res.send(validate.errors.map(e => e.message));
  }

  res.send('OK');
});

module.exports = router;