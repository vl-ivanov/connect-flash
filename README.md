# connect-flash

[![CI](https://github.com/vl-ivanov/connect-flash/workflows/CI/badge.svg)](https://github.com/vl-ivanov/connect-flash/actions)
[![npm version](https://badge.fury.io/js/%40stz184%2Fconnect-flash.svg)](https://badge.fury.io/js/%40stz184%2Fconnect-flash)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The flash is a special area of the session used for storing messages.  Messages
are written to the flash and cleared after being displayed to the user.  The
flash is typically used in combination with redirects, ensuring that the message
is available to the next page that is to be rendered.

This middleware was extracted from [Express](http://expressjs.com/) 2.x, after
Express 3.x removed direct support for the flash.  connect-flash brings this
functionality back to Express 3.x, as well as any other middleware-compatible
framework or application. +1 for [radical reusability](http://substack.net/posts/b96642/the-node-js-aesthetic).

## Node.js Version Support

This package requires **Node.js 18.x or higher**. It has been tested and is compatible with:

- Node.js 18.x (LTS)
- Node.js 20.x (LTS)
- Node.js 22.x (Current)

## Install

    $ npm install connect-flash

## Usage

#### Modern Express (4.x+)

Flash messages are stored in the session. First, set up sessions using `express-session`, then use the `flash` middleware provided by connect-flash.

```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());
```

With the `flash` middleware in place, all requests will have a `req.flash()` function
that can be used for flash messages.

```javascript
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

app.get('/', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  res.render('index', { messages: req.flash('info') });
});
```

#### Express 3.x (Legacy)

For Express 3.x applications (deprecated):

```javascript
var flash = require('connect-flash');
var app = express();

app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});
```

## Examples

For an example using connect-flash in an Express 3.x app, refer to the [express3](https://github.com/jaredhanson/connect-flash/tree/master/examples/express3)
example.

## Tests

    $ npm install
    $ npm test

Or using make:

    $ make test

## Development

Run linter:

    $ npm run lint

Run tests with coverage:

    $ npm run test:coverage

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)
  - [Vladimir Ivanov](https://github.com/vl-ivanov)
  - [TJ Holowaychuk](https://github.com/visionmedia)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 
2012-2013 Jared Hanson <[https://www.jaredhanson.me/](https://www.jaredhanson.me/)> 
2025 Vladimir Ivanov <[https://Vladimir-ivanov](https://Vladimir-ivanov.net)>
