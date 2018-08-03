module.exports = {
    getActes : function(html, done){
        var $ = require('cheerio').load(html);
        var table =[];
        $('#GMvtEnCours tbody tr').each(function(){
            var children = $(this).children();
            var row = {
                "visa" : $(children[0]).text(),
                "dateEffet" : $(children[1]).text(),
                "libelle" : $(children[2]).text(),
                "decision" : $(children[3]).text(),
                "dateDecision": $(children[4]).text()
            };
            table.push(row);
        })
        _.pullAt(table,0);
        return done(null, table); 

    },

    connectAndRetreive : function(username,password,done){
        var request = require('request');
        var j = request.jar();
        var request = request.defaults({ jar : j }) 
        request('http://application.sante.gov.ma/situation/logon.aspx', function (error, response, html) {
            var $ = require('cheerio').load(html);
            var  viewstat =  $('#__VIEWSTATE').val();
            var valid = $('#__EVENTVALIDATION').val();
            var  gen =  $('#__VIEWSTATEGENERATOR').val();
           request({
                url:"http://application.sante.gov.ma/situation/logon.aspx??ReturnUrl=%2fsituation%2fDefault.aspx",
                method:"POST",
                form:{
                    txtlogin:username,
                    txtpassword:password,
                    __VIEWSTATE : viewstat,
                    __EVENTVALIDATION : valid,
                    __VIEWSTATEGENERATOR : gen,
                    btn_cnx: "se+connecter"
                }
            },
                function(err,response,body){
                    var $ = require('cheerio').load(body)
                    request({
                        url:"http://application.sante.gov.ma/situation/Default.aspx",
                        method:"GET"
                    },function(err,response,body2){
                        console.log(err);
                        var $2 = require('cheerio').load(body2);
                          var  viewstat2 =  $2('#__VIEWSTATE').val();
                            var valid2 = $2('#__EVENTVALIDATION').val();
                            var  gen2 =  $2('#__VIEWSTATEGENERATOR').val();
                          request({
                            url:"http://application.sante.gov.ma/situation/Default.aspx",
                            method:"POST",
                            form : {
                                __EVENTTARGET: "Menu1",
                                __EVENTARGUMENT: "2",
                                __VIEWSTATE : viewstat2,
                                __EVENTVALIDATION : valid2,
                                __VIEWSTATEGENERATOR : gen2,
                                HidePPR: username
                            }
                        },function(err,response,body3){
                            if(err) return done(err,null)
                            return done(null,body3);
                        }); 
                    });
            });
        });
    }
}