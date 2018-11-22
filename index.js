const express = require('express');
const app = express();
const port = 3000;
const dogComponent = require('./components/dogs');
const bodyParser = require('body-parser')


const exampleMiddleware = function (req, res, next) {
    console.log('Middleware is active!');

    // pass the control to the next handler in line
    next();
};

app.use(exampleMiddleware);

app.use(bodyParser.json());

/* basic HTTP method handling */
app.get('/hello', (req, res) => res.send('Hello GET World!'));
app.post('/hello', (req, res) => res.send('Hello POST World!'));
app.put('/hello', (req, res) => res.send('Hello PUT World!'));
app.delete('/hello', (req, res) => res.send('Hello DELETE World!'));

/* Route parameters */
app.get('/hello/:id/world/:anotherUniqueId', (req, res) => {
    res.send('Your route parameters are\n' + JSON.stringify(req.params));    
});

/* Example of defining routes with different method handlers */
app.route('/world')
    .get((req,res) => res.send('get World'))
    .post((req, res) => res.send('post World'))
    .put((req, res) => res.send('put World'))
    .delete((req, res) => res.send('delete World'))

/* demonstrate route module/component usage - the dogComponent content is defined in separate file */
app.use('/dogs', dogComponent);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))