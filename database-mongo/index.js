var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const amazon = require('../helpers/amazonHelp');


var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var listSchema = mongoose.Schema({
  reddittitle: String,
  author: String,
  title: String,
  url: String,
  img: String
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
  exec(callback);
};

let searchTitle = (book, callback) => {
  Book.find({reddittitle: book[0]}, (err, books) => {
    if(books.length){
      callback('Name already exists', null);
    } else { 
      callback(null, book);
    }
  });
}

let save = (book) => {
  console.log('SAVING THIS: ' + book);
  let newModel = new Book({author: book.author, title: book.title, url: book.url, img: book.img, reddittitle: book.reddittitle});
  newModel.save();
}

module.exports.search = search;
module.exports.selectAll = selectAll;
module.exports.searchTitle = searchTitle;
module.exports.save = save;