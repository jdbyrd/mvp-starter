var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var listSchema = mongoose.Schema({
  title: String,
  author: String,
  imgurl: String
});

var Book = mongoose.model('Books', listSchema);

var selectAll = function(callback) {
  Book.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

let search = (callback) => {
  Book.
  find().
  limit(25).
  exec(callback);
};

module.exports.search = search;
module.exports.selectAll = selectAll;