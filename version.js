'use strict';
var path = require('path'),
  fs = require('fs'),
  mixIn = require('mout/object/mixIn'),
  stampit = require('stampit'),

  filterPath = function filterPath(p) {
    return p.replace(/^\./, '');
  },

  getBuild = function getBuild(options) {
    var buildPath, data;

    if (options.build) {
      return options.build;
    }

    buildPath = path.resolve( process.cwd() + 
    filterPath(options.buildPath) );

    try {
      data = fs.readFileSync(buildPath, 'utf8');
      options.data = data.trim();
      return options.data;
    } catch(err) {
      return undefined;
    }
  },

  readPkg = function readPkg() {
    return require(process.cwd() + '/package.json');
  },

  version,

  configure = function configure(options) {
    var instance = version();
    instance.options = mixIn({}, options);
    return instance;
  };

version = stampit().enclose(function () {
  var handler = function (req, res) {
    var options = handler.options,
      pkg = options.pkg || readPkg(),
      build = getBuild(options),

      responseObj = {
        name: pkg.name,
        version: pkg.version,
        build: build
      },

      body;

    if (options.callback) {
      options.callback.call(this, req, res);
    }

    body = JSON.stringify(responseObj);

    res.end(body);
  };

  return mixIn(handler, {
    getBuild: getBuild,
    configure: configure,
    options: {
      buildPath: '/config/BUILD'
    }
  });
});

module.exports = version();
