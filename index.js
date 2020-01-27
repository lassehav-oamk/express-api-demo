const express = require('express');
const app = express();
const port = 4000;

const dogComponent = require('./components/dogs');
const imageUpload = require('./components/imageUpload');
const bodyParser = require('body-parser');
const apiKeyDemo = require('./components/apiKeyDemo');
const cors = require('cors');



const customHeaderCheckerMiddleware = function(req, res, next) {
    console.log('Middleware is active!');
    if(req.headers['custom-header-param'] === undefined)
    {
        return res.status(400).json({ reason: "custom-header-param header missing"});
    }

    // pass the control to the next handler in line
    next();
}

//app.use(customHeaderCheckerMiddleware);
app.use(bodyParser.json());
app.use(cors());


/* basic HTTP method handling */
app.get('/hello', (req, res) => res.send('Hello GET World!'));
app.post('/hello', (req, res) => res.send('Hello POST World!'));
app.put('/hello', (req, res) => res.send('Hello PUT World!'));
app.delete('/hello', (req, res) => res.send('Hello DELETE World!'));

/* Route parameters */
app.get('/hello/:parameter1/world/:parameter2', (req, res) => {
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

app.use('/apiKey', apiKeyDemo);

app.use('/fileUpload', imageUpload);

/* This will be activated as the last if no other route matches. */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404; // Set status code to 404
    next(err);  /* If you pass anything to the next() function (except the string 'route'),
                 Express regards the current request as being an error and will skip any
                 remaining non-error handling routing and middleware functions. */
});

/* This is an error handling middleware, the function has four parameters.
   See https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling */
app.use((err, req, res, next) => {
    res.status(err.status);
    console.error(err.toString());
    console.error('Path attempted - ' + req.path)
    res.send(err.toString());
});


app.listen(port, () => {
    console.log(`Example API listening on http://localhost:${port}\n`);
    console.log('Available API endpoints');
    console.log('  /hello [GET, POST, PUT, DELETE]');
    console.log('  /hello/{param1}/world/{param2} [GET]');
    console.log('  /world [GET, POST, PUT, DELETE]');
    console.log('\n  /dogs [GET, POST]');
    console.log('  /dogs/{dogId} [GET, DELETE]');
    console.log('\n  /apikey/new/{username} [GET]');
    console.log('  /apikey/protected} [GET]');
    console.log('\n  /fileUpload [POST] multipart file upload');
    console.log('\n\n Use for example curl or Postman tools to send HTTP requests to the endpoints');
});