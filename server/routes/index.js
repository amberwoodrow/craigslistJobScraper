var express = require('express');
var router = express.Router();
var request=require("request");
var cheerio=require("cheerio");
var Promise = require("promise");

function crawlCraigslist(currentLocation) {
  return new Promise(function(resolve, reject) {
    var jobs = [];
    request("http://"+ currentLocation +".craigslist.org/search/sof", function (error, response, html) {

      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html); // pass DOM to cheerio

        $('.pl').each(function(){
          var temp = {
            time: $(this)[0].children[1].attribs.datetime,
            link: $(this)[0].children[3].attribs.href,
            text: $(this)[0].children[3].children[0].data
          };
          jobs.push(temp);
        });
      }
      resolve(jobs);
    });

  });
}

router.get('/api', function(req, res, next) {
  var oregon = ["portland", "salem", "bend", "corvallis", "eugene", "oregoncoast", "klamath", "medford", "roseburg", "eastoregon"];
  var promises = [];

  for (var i=0; i<oregon.length; i++) {
    var currentLocation = oregon[i];
    promises.push(crawlCraigslist(currentLocation).then(function (res){
      return res;
    }));
  }
  Promise.all(promises).then(function(result){
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
