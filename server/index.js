var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');
const reddit = require('../helpers/redditHelp');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/books', function (req, res) {
  reddit.getRedditLink()
  .then(article => {
    db.search(article[1], (err, repo)=>{
      if (err) return handleError(err);
      res.json(repo);
    });
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

