var spawn = require('child_process').spawn
var which = require('npm-which')(process.cwd())

function runCmake (opts, target, cb) {
  which('cmake-js', function (err, cmakeJsPath) {
    if (err) return cb(err)

    var args = ['build']
    if (opts.runtime !== 'napi') args.push('--runtime-version=' + target)
    args.push('--arch=' + opts.arch)
    if (opts.runtime !== 'napi') args.push('--runtime=' + opts.runtime)
    if (opts.runtime === 'napi' && target) {
      args.push('--CDnapi_build_version=' + target)
    }

    if (opts.debug) args.push('--debug')

    var foundRest = false
    for (var arg of opts.argv) {
      if (arg === '--') {
        foundRest = true
      } else if (foundRest) {
        args.push(arg)
      }
    }

    var proc = spawn(cmakeJsPath, args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('exit', function (code) {
      if (code !== 0) {
        return cb(new Error('Failed to build cmake with exit code ' + code))
      }
      cb()
    })
  })
}

module.exports = runCmake
