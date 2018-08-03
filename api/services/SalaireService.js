module.exports = {
    getOne : function(html, done){
        var $ = require('cheerio').load(html);

        var result = {
            id : $('#lblpprSal').text(),
            nom : $('#lblNomPrenomSal').text(),
            cin : $('#lblCINSal').text(),
            dateNaissance : $('#lbldatenaissnaceSal').text(),
            sexe : $('#lblSexeSal').text(),
            nationalite:$('#lblNationaliteSal').text(),
            situationFamille : $('#lblsfamillialeSal').text(),
            dateEntree : $('#DateRecSal').text(),
            grade : $('#lblGradeSal').text(),
            echelle : $('#lblechelleSal').text(),
            echelon : $('#lblechlonSal').text(),
            indice : $('#lblIndiceSal').text(),
            zone : $('#lblZone').text(),
            affectation : $('#AffecatationSal').text(),
            imputation:$('#SANTE').text(),
            nombreEnfants : $('#NombreEnfant').text(),
            brutAnnuel : $('#BrutAnnuel').text(),
            baseImposable : $('#baseImpos').text(),
            netAnnuel : $('#NetAnnuel').text(),
            position : $('#lblPosSal').text(),
            netMensuel : $('#NetMensuelSal').text(),
        }
        return done(null,result);
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
                          //console.log(body2);
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
                        },function(err,response,body3){
                            if(err) return done(err,null)
                            return done(null,body3);
                        }); 
                    });
            });
        });
    }
}