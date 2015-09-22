var path = require('path')
var fs = require('fs')
var gypinstall = require('./gypinstall')
var releaseFolder = require('./util').releaseFolder
var runGyp = require('./gyp')

function build (opts, version, cb) {
  var log = opts.log;
  var release = releaseFolder(opts)

  log.verbose('installing node-gyp dependencies')
  gypinstall({log: opts.log, version: version}, function (err) {
    if (err) return cb(err)
    log.verbose('starting node-gyp process')
    runGyp(opts, version, function (err) {
      if (err) return cb(err)
      log.verbose('done node-gyp\'ing')
      done()
    })
  })

  function done () {
    fs.readdir(release, function (err, files) {
      if (err) return cb(err)

      for (var i = 0; i < files.length; i++) {
        if (/\.node$/i.test(files[i])) return cb(null, path.join(release, files[i]), files[i])
      }

      cb(new Error('Could not find build in ' + release))
    })
  }
}

module.exports = build
