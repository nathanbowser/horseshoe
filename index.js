var score = require('./lib/score')

score(process.argv[2], function (score) {
  console.log(score)
})
