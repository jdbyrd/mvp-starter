const request = require('request');
const db = require('../database');
const amazon = require('../helpers/amazonHelp');

let getRedditBooks = () => {
  let options = {
    url: 'https://www.reddit.com/r/books',
    headers: {
      'User-Agent': 'request',
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      throw error;
    }else if(response) {
      let article = getLink(body);
      getRedditComments(article);
    }
  });
}

let getRedditComments = (article) => {
  let options = {
    url: `http://redd.it/${article}`,
    headers: {
      'User-Agent': 'request',
    }
  };
  request(options, (error, response, body) => {
    if(error) {
      throw error;
    }else if(response) {
      let list = proccessComments(body);
      list.forEach((book) => {
        db.searchTitle(book, amazon.amazonRequest);
      });
    }
  });
}

let getLink = (body) => {
  let index = body.indexOf(`">What Books Are You Reading This Week?`);
  let article = body.slice(index-6, index);
  return article;
}

let proccessComments = (body) => {
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