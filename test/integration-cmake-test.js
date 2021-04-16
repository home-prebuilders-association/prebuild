var test = require('tape')
var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')
var rm = require('rimraf')

var cwd = path.join(__dirname, 'native-module-cmake')

test('can prebuild a cmake-js native module for node', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  var file = 'native-v1.0.0-node-v57-' + process.platform + '-' + process.arch + '.tar.gz'
  var prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild', { cwd: cwd }, function (error, stdout, stderr) {
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})

test('can prebuild a cmake-js native module for electron', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  var file = 'native-v1.0.0-electron-v50-' + process.platform + '-' + process.arch + '.tar.gz'
  var prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild-electron', { cwd: cwd }, function (error, stdout, stderr) {
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})

test('can prebuild a cmake-js native module for node with silent argument', function (t) {
  rm.sync(path.join(cwd, 'prebuilds'))
  var file = 'native-v1.0.0-node-v57-' + process.platform + '-' + process.arch + '.tar.gz'
  var prebuild = path.join(cwd, 'prebuilds', file)
  // A quick, temporary fix for a node.js bug (https://github.com/prebuild/prebuild/pull/208#issuecomment-361108755)
  console.log()
  exec('npm run prebuild-silent', { cwd: cwd }, function (error, stdout, stderr) {
    // XXX: latest cmake-js has a forgotten console.log(process.argv)
    t.ok(stdout.trim().split('\n').length <= 12, 'stdout should be silent')
    t.equal(error, null)
    t.equal(fs.existsSync(prebuild), true)
    t.end()
  })
})
