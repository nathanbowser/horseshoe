var request = require('request')
  , es = require('event-stream')

var url = 'http://dazzlepod.com/site_media/txt/passwords.txt'
var filter = es.map(function (data, cb) {
  if (data !== process.argv[2]) { 
	cb()
  } else {
    cb(null, data)
  }
})

request(url).pipe(es.split()).pipe(filter).pipe(process.stdout)
