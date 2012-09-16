# Tokenator

[![Build Status](https://secure.travis-ci.org/shapeshed/tokenator.png)](http://travis-ci.org/shapeshed/tokenator)

Tokenator is a lightweight piece of [Connect][1] Middleware to provide access control based on a token. It is design to be used with APIs.

## Installation

via [npm][2]

    npm install tokenator

## Usage

Tokenator expects the API token to be sent by the client in a header named 'api-token'. 

On the server tokenator expects an array of valid tokens.

If a client tries to connect without a token or an invalid token a 401 response will be returned. 

For [connect][1]

    var connect = require('connect'),
        http = require('http'),
        tokenator = require('tokenator');

    function accessGranted(req, res){
      res.end('Tokenator says yes!');
    }
    var app = connect()
      .use(tokenator(['5917f138c80b512d14a4ee2fe05a17dc', '7b1a47ab847f7534b507c6ae4a763118']))
      .use(accessGranted)
     
    http.Server(app).listen(3000);

For [express][3]

    var express = require('express'),
        tokenator = require('tokenator');

    var app = module.exports = express.createServer();

    app.configure(function(){
      app.use(tokenator(['5917f138c80b512d14a4ee2fe05a17dc', '7b1a47ab847f7534b507c6ae4a763118']))
    });

    app.get('/', function(req, res){
      res.send('Tokenator says yes!');
    });

    app.listen(3000);

[1]: https://github.com/senchalabs/connect/
[2]: http://npmjs.org/
[3]: http://expressjs.com/
