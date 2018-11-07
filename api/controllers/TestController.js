/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See htddtps://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    crawl : function(req,res){            
        var Crawler = require('crawler'),
        cheerio = require('cheerio');
        var c = new Crawler({
        maxConnections: 1,
        jQuery: false, 
        // This will be called for each crawled page
        callback: function (err, res, done) {
            var $,
            self = this;
            if (err) console.log(err);
            else {
                $ = cheerio.load(res.body);
                $('a').each(function (i, a) {
                    var href = a.attribs.href;
                    if (href) {
                         if(href.includes('https://www.disway.com/productdetails.aspx?id=') && ! href.includes('_') && ! href.includes('PROMOTIONS'))  {
                            console.log(href)
                            res.options.request({
                                    url:href,
                                    method:"GET",
                                },function(err,response,body2){
                                    if(err) console.log('Error'+err);
                                  ProductService.extract(body2,function(pr){
                                    console.log(pr)
                                    c.queue({uri : href, 'request' : res.options.request});
                                })
                            });
                            }
                    }
                }); 
            } 
        setTimeout(done, 40000);
        }
 
    });
// query a single url
            ProductService.login('crenova','PoiSSon18',function(err,request){
                c.queue({uri : 'https://www.disway.com',request});
            })
            

    },

    test : function(req,res){
        var request = require('request')
        const { url,username,pass } = req.allParams()
        ProductService.login(username,pass,function(err,requestt){
            if(err) console.log(err)
            requestt({
                        url,
                        method:"GET",
                    },function(err,response,body2){
                        console.log('Error'+err);
                      ProductService.extract(body2,function(pr){
                        return res.json(pr)
                    })
                });
            });    
    }

  

};

