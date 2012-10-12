var request = require('request')
  , es = require('event-stream')
  , pass = process.argv[2]

module.exports = function (password, cb) {
	// TODO Where can we find leaked passwords?
  var url = 'http://dazzlepod.com/site_media/txt/passwords.txt'

  var common = es.mapSync(function (data) {
    return data !== password ? 10 : 0
  })

  var scores = []
  var smash = es.mapSync(function (data, cb) {
    if (scores.lastIndexOf(data) === -1) {
      scores.push(data)
      return data
    } else {
      return undefined
    }
  })

  var strength = es.mapSync(function (data) {
    return data
  })

  var s = request(url).pipe(es.split()).pipe(common).pipe(smash).pipe(strength)

  var score = 0
  s.on('data', function (data) {
    score = data
  })

  s.on('end', function () {
    cb(score)
  })
}
