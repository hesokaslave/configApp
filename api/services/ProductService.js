module.exports = {
    extract : function(html,done) {

        var $ = require('cheerio').load(html)
        IDProduct = $('#ctl00_cpholder_ctl00_lProductID').text();
        description = $('#ctl00_cpholder_ctl00_lDescription').text()
        prixPublique = $('#ctl00_cpholder_ctl00_lWebPrice').text()
        remise = $('#ctl00_cpholder_ctl00_lYouSaved').text()
        disponibilite = $('#ctl00_cpholder_ctl00_lStatus').text()
        tabbed_desc = $('#tabbed_desc > p').text()
        resellerPrice = $('#ctl00_cpholder_ctl00_lYourPrice').text()
        characteristics = $('#ctl00_cpholder_ctl00_tabbedSectionctl1_attributs_New_GridView1')
        var table =[];
        $('#ctl00_cpholder_ctl00_tabbedSectionctl1_attributs_New_GridView1 tbody tr').each(function(){
            var children = $(this).children();
            var row = {
                "characteristique" : $(children[0]).text(),
                "valeur" : $(children[1]).text(),
            };
            table.push(row);
        })
        //_.pullAt(table,0);
 
        done({
            id : IDProduct,
            desc : description,
            prixPublique : prixPublique,
            resellerPrice : resellerPrice,
            remise : remise,
            dispo : disponibilite,
            description : tabbed_desc,
            characteristics : table
            
        })
    },

    login : function(username,password, cb) {
        var request = require('request');
        var $ = require('cheerio')
         var j = request.jar()
        //var cookie = request.cookie("ASP.NET_SessionId=jkhyl43ieelttfqhey2odk0d; Path=/; HttpOnly; hostOnly=true; aAge=511ms; cAge=511ms")
       // var url = 'www.disway.com'
       // jar.setCookie(cookie, url)
        var request = request.defaults({ jar : j }) //it will make the session default for every request
    
        request('https://www.disway.com/login.aspx', function (error, response, html) {
                var $ = require('cheerio').load(html);
                if(error) console.log(error)
                var  viewstat =  $('#__VIEWSTATE').val();
                var valid = $('#__EVENTVALIDATION').val();
                var  gen =  $('#__VIEWSTATEGENERATOR').val();
                var previous = $('#__PREVIOUSPAGE').val();
                var v = $('#__VIEWSTATEENCRYPTED').val();
        
               request({
                    url:"https://www.disway.com/login.aspx#tabbed_login",
                    method: 'POST',
                    followAllRedirects: true,
                    form:{
                            'ctl00$cpholder$txtUserName':username,
                            'ctl00$cpholder$txtPassword':password,
                            '__VIEWSTATE' : viewstat,
                           '__EVENTVALIDATION' : valid,
                            '__PREVIOUSPAGE' : previous,
                            '__VIEWSTATEGENERATOR' : gen,
                            '__EVENTTARGET' : "ctl00$cpholder$bLogin",
                            '__VIEWSTATEENCRYPTED' : v
                    }
                },
                    function(err,response,body){ 
                            console.log(j.store)
                            cb(null,request)  

    });
});

}

    }