var express = require('express');
var router = express.Router();
var request=require("request");
var cheerio=require("cheerio");
var Promise = require("promise");

router.get('/api', function(req, res, next) {

  // perfrom request
  request('http://portland.craigslist.org/search/sof', function (error, response, html) {
    var promises = [];

    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html); // pass DOM to cheerio

      // for (var i=0; i<$('.pl time').length; i++) {
      //   var current = $('.pl time')[i];
      //   promises.push({date: current.attr('datetime')});
      // }

      // $('.pl time').each(function(){
      //   promises.push({time: $(this).attr('datetime')});
      // });

      $('.pl').each(function(){
        var temp = {
          time: $(this)[0].children[1].attribs.datetime,
          link: $(this)[0].children[3].attribs.href,
          text: $(this)[0].children[3].children[0].data
        };
        promises.push(temp);
      });

      console.log(promises);

      res.send(promises);
    }
  });

});

module.exports = router;
