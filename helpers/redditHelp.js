const request = require('request');
const db = require('../database');
const amazon = require('../helpers/amazonHelp');

let redditGet = () => {

  let options = {
    url: 'http://redd.it/7m0jzy',
    headers: {
      'User-Agent': 'request',
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      throw error;
    }else if(response) {
      let list = proccessHtml(body);
      list.forEach((book) => {
        db.searchTitle(book, amazon.amazonRequest);
      });
    }
  });
}

let getRedditBooks = () => {
  let options = {
    url: 'https://www.reddit.com/r/books/comments/7m0jzy/what_books_are_you_reading_this_week_december_25/.json',
    headers: {
      'User-Agent': 'request',
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      throw error;
    }else if(response) {
      let list = proccessList(body);
      list.forEach((book) => {
        db.searchTitle(book, amazon.amazonRequest);
      });
    }
  });
}

let proccessList = (body) => {
  let list = [];
  let index = body.indexOf('**');
  
  while(index !== -1){
    body = body.slice(index + 2);
    index = body.indexOf('**');
    let entry = body.slice(0, index);
    if(entry.length < 200 && entry.indexOf(`, by `) !== -1){
      entry = entry.replace('\'', "");
      let tuple = entry.split(`, by `);
      list.push(tuple);
    }
    body = body.slice(index + 2);
    index = body.indexOf('**');
  }
  console.log(list.length);
  return list.slice(3);
} 

let proccessHtml = (body) => {
  let list = [];
  let index = body.indexOf(`<strong>`);
  
  while(index !== -1){
    body = body.slice(index + 8);
    index = body.indexOf('</strong>');
    let entry = body.slice(0, index);
    if(entry.indexOf(`, by `) !== -1){
      entry = entry.replace(`&#39;`, "");
      let tuple = entry.split(`, by `);
      list.push(tuple);
    }
    body = body.slice(index + 8);
    index = body.indexOf('<strong>');
  }
  return list.slice(1);
} 

module.exports.getRedditBooks = getRedditBooks;
module.exports.redditGet = redditGet;