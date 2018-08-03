module.exports = {
    getOne : function(html, done){
        var $ = require('cheerio').load(html);
        var result = {
            id : $('#lblppr').text(),
            nom : $('#lblnom').text(),
            prenom : $('#lblprenom').text(),
            cin : $('#lblCIN').text(),
            us1 : $('#lblAffectation').text(),
            us2 : $('#lblAffectationRec').text(),
            dateNaissance : $('#lblDateNaissance').text(),
            sexe : $('#lblSexe').text(),
            nationalite:$('#lblNationalite').text(),
            situationFamille : $('#SitSalaire').text(),
            dateRecrutement : $('#lbldaterec').text(),
            grade : $('#lblgrade').text(),
            echelle : $('#lblEchelle').text(),
            echelon : $('#lblEchlon').text(),
            indice : $('#lblIndice').text(),
            dateGrade : $('#lbldateGrade').text(),
            dateAncienGrade : $('#lblAncienGrade').text(),
            specialite:$('#lblSpec').text(),
            dateEchelon : $('#lblDateEchlon').text(),
            dateAncienEchelon : $('#lblDateAncEchlon').text(),
            dateSpecialite : $('#lblDateSpec').text(),
            dateAncienneAdmin : $('#lblDteAncienAdm').text(),
            position : $('#lblPosition').text(),
            datePosition : $('#lblDatePosition').text(),
            status : $('#lblsst').text(),
            posteBudgetaire : $('#lblPosteBudgetaire').text()
        }
        return done(null,result);
    },

    connectAndRetreiveSituation : function(username,password,done){
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
                    txtlogin : username,
                    txtpassword : password,
                    __VIEWSTATE : viewstat,
                    __EVENTVALIDATION : valid,
                    __VIEWSTATEGENERATOR : gen,
                    btn_cnx: "se+connecter"
                }
            },
                function(err,response,body){
                    if(err) return done(err,null);
                    request({
                        url:"http://application.sante.gov.ma/situation/Default.aspx",
                        method:"GET"
                    },
                    function(err,response,body2){
                        if(err) return done(err,null);
                        return done(null,body2);
                    })
                })
        })
    }
}