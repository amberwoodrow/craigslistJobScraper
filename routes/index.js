var express = require('express');
var router = express.Router();
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");
var Promise = require("promise");

// var promises = [];
//
// function mdn() {
//   request('https://developer.mozilla.org/en-US/', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//       promises.push(html);
//     }
//   });
// }
//
// setTimeout(console.log(mdn()),500);
// // mdn()
//
// function python() {
//   request('https://www.python.org/', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//       promises.push(html);
//     }
//   });
// }
//
router.get('/', function(req, res, next) {

  // perfrom request
  request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {

      // pass DOM to cheerio
      var $ = cheerio.load(html);
      var title = $('span.comhead').prev().first().text();
         promises.push(title);

      console.log(title);

      if (title.indexOf("javascript") > -1){
        // mdn(); if i find js store at end
      } else {
        python();
      }
    }
  });
});

//
//   request('https://www.reddit.com/r/Web_Development/', function (error, response, html) {
//     if (!error && response.statusCode == 200) {
//
//       // pass DOM to cheerio
//       var $ = cheerio.load(html);
//       var title = $('span.domain').prev().first().text();
//       promises.push(title);
//       // var title = "i love javascript";
//
//       if (title.indexOf("javascript") > -1){
//         // mdn(); if i find js store at end
//       } else {
//         python();
//       }
//     }
//   });
//   // res.send("YO");
// });


module.exports = router;
