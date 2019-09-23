# express-api-demo
Demonstration of basic REST API implementation with Express + Node

## Installation
Install dependencies after cloning
```
npm install
```

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
*  /dogs/{dogId} [GET]

*  /apikey/new/{username} [GET]
*  /apikey/protected} [GET]


 Use for example curl or Postman tools to send HTTP requests to the endpoints
