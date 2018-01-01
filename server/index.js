var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');
const reddit = require('../helpers/redditHelp');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/books', function (req, res) {
//   db.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('/books', function (req, res) {
  reddit.redditGet();
  //reddit.getRedditBooks();
  db.search((err, repo)=>{
    if (err) return handleError(err);
    res.json(repo);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

