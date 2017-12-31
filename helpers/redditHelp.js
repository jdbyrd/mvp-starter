var request = require('request');

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
      console.log(list);
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
      let tuple = entry.split(`, by `);
      list.push(tuple);
    }
    body = body.slice(index + 2);
    index = body.indexOf('**');
  }
  console.log(list.length);
  return list;
} 


module.exports.getRedditBooks = getRedditBooks;