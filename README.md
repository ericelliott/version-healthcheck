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

You can use your latest git build hash by adding the following line to your `package.json` `scripts` block:

```
  "scripts": {
    "build-hash": "git rev-parse --short=7 HEAD > ./config/BUILD"
  }
```

To execute the command, run:

```
$ npm run-script build-hash
```

Or add that git command to your existing build script.

By comparing code using the git build hash, you can easily see exactly what version of the software is deployed on your servers, using version control.


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
    },
    buildPath: '/customPath/BUILD' // path is relative to the app directory.
});

app.get('/version', version);
```

## MIT License ##
