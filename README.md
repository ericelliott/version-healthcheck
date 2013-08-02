version-healthcheck
===================

A plug-and-play /version route for the Node.js Express framework.

Useful for monitoring the health status of your application deploys.

It will deliver a JSON payload something like this:

```
{
  "name": "my-app"
  "version": "0.0.1"
  "build": "4f26147"
}
```

* **name:** app name from package.json
* **version:** app version from package.json
* **build:** latest build # read from a generated file: APP_HOME/config/BUILD

I recommend using the included build script to use the latest git commit hash for `./config/BUILD`.


## Getting started

```
$ npm install --save version-healthcheck
```

In your routes file:

```js
var version = require('version-healthcheck');

app.get('/version', version);
```

You also have access to configure the response in any way you like:

```js
var express = require('express');
var configureVersion = require('version-healthcheck').configure;

var app = express();

var version = configureVersion({
    callback: function customVersion(req, res) {
      // `this` is the version response. It will already contain
      // the default values.

      // Anything you do with `this` will change the JSON response.
      this.foo = 'bar';
      // You can also access the request and response objects.
      this.url = req.url
    }
  });

app.get('/version', version);
```

## MIT License ##
