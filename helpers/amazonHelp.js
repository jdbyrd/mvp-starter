var amazon = require('amazon-product-api');
var db = require('../database-mongo');

let amazonRequest = (err, book) => {
  if(err){ console.log(err); }
  else {  
    let title = book[0];
    let author = book[1];

    var client = amazon.createClient({
      awsId: "AKIAJOSZ36QINFWY2HXA",
      awsSecret: "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",
      awsTag: "redditbooks07-20"
    });

    client.itemSearch({
      title: book[0],
      author: book[1],
      searchIndex: 'Books',
      responseGroup: 'ItemAttributes,Offers,Images'
    }).then(function(results){
      let entry = {
        img: results[0].LargeImage[0].URL[0],
        url: results[0].DetailPageURL[0],
        title: results[0].ItemAttributes[0].Title[0],
        author: results[0].ItemAttributes[0].Author[0],
        reddittitle: book[0]
      };
      console.log(entry);
      db.save(entry);
    }).catch(function(err){
      console.log(err);
    });
  }
}

module.exports.amazonRequest = amazonRequest;