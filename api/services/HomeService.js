module.exports = {
    getAll : function(doti,password,done) {
        this.connectAndRetreive(doti,password,function(err,result){
            FonctionnaireService.getOne(result.bodySituation, function(err,situation){
                if(err) console.log(err)
                SalaireService.getOne(result.bodySalaire,function(err,salaire){
                    if(err) console.log(err)
                    ActeService.getActes(result.bodyActes, function(err,actes){
                      if(err) console.log(err)
                      FamilleService.getFamille(result.bodyFamille, function(err,fam){
                        return done(null,{
                            situation : situation,
                            salaire : salaire,
                            actes : actes,
                            famille : fam
                        })
                      })
                    })
                })
            })
        })

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
                    },function(err,response,bodySituation){
                        console.log(err);
                        var $2 = require('cheerio').load(bodySituation);
                          var  viewstat2 =  $2('#__VIEWSTATE').val();
                            var valid2 = $2('#__EVENTVALIDATION').val();
                            var  gen2 =  $2('#__VIEWSTATEGENERATOR').val();
                          request({
                            url:"http://application.sante.gov.ma/situation/Default.aspx",
                            method:"POST",
                            form : {
                                __EVENTTARGET: "Menu1",
                                __EVENTARGUMENT: "10",
                                __VIEWSTATE : viewstat2,
                                __EVENTVALIDATION : valid2,
                                __VIEWSTATEGENERATOR : gen2,
                                HidePPR: username
                            }
                        },function(err,response,bodySalaire){
                            if(err) return done(err,null)
                            var $3 = require('cheerio').load(bodySalaire);
                            var  viewstat3 =  $3('#__VIEWSTATE').val();
                            var valid3 = $3('#__EVENTVALIDATION').val();
                            var  gen3 =  $3('#__VIEWSTATEGENERATOR').val();
                            request({
                                url:"http://application.sante.gov.ma/situation/Default.aspx",
                                method:"POST",
                                form : {
                                    __EVENTTARGET: "Menu1",
                                    __EVENTARGUMENT: "2",
                                    __VIEWSTATE : viewstat3,
                                    __EVENTVALIDATION : valid3,
                                    __VIEWSTATEGENERATOR : gen3,
                                    HidePPR: username
                                }
                            },function(err,response,bodyActes){
                                if(err) return done(err,null)
                                request({
                                    url:"http://application.sante.gov.ma/situation/Default.aspx",
                                    method:"POST",
                                    form : {
                                        __EVENTTARGET: "Menu1",
                                        __EVENTARGUMENT: "5",
                                        __VIEWSTATE : viewstat3,
                                        __EVENTVALIDATION : valid3,
                                        __VIEWSTATEGENERATOR : gen3,
                                        HidePPR: username
                                    }
                                },function(err,response,bodyFamille){
                                    if(err) return done(err,null)
                                    return done(null,{
                                        bodySituation : bodySituation,
                                        bodySalaire : bodySalaire,
                                        bodyActes : bodyActes,
                                        bodyFamille : bodyFamille
                                    });
                                });
                            });
                        });
                    });
            });
        });
    }
}
