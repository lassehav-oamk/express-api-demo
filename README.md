# express-api-demo
Demonstration of basic REST API implementation with Express + Node

## Installation
Install dependencies after cloning
```
npm install
```

## Testing
Example of an simple API test with Postman / Newman CLI is provided in postman-collections folder.
See more information on Newman at https://learning.getpostman.com/docs/postman/collection-runs/command-line-integration-with-newman/

Run sample tests on CLI with command
```
npm run test
```

Newman / Postman assertion library vocabulary:
https://www.chaijs.com/api/bdd/



## Usage

Start the application
```
npm run api
```


Example API will be listening on http://localhost:3000

Available API endpoints
*  /hello [GET, POST, PUT, DELETE]
*  /hello/{param1}/world/{param2} [GET]
*  /world [GET, POST, PUT, DELETE]

*  /dogs [GET, POST]
*  /dogs/{dogId} [GET, DELETE]


*  /apikey/new/{username} [GET]
*  /apikey/protected} [GET]

*  /fileUpload [POST] multipart file upload


 Use for example curl or Postman tools to send HTTP requests to the endpoints
