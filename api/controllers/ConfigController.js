/**
 * ConfigController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findOne : function(req,res){
    const { uuid,env } = req.allParams()
      Config.findOne({uuid,env}, function(err, config){
          if(err) console.log(err)
          if(!config) return res.notFound('Configuration Not Found')
          return res.json(config)
      })
  },

  create : function(req,res){
    const { uuid, env, value } = req.allParams()
    Config.create({ uuid, env, value }).fetch().exec(function(err,conf) {
      if(err) {
        if(err.code === 'E_UNIQUE') return res.json({error : 'Already exists'})
        else return res.serverError(err)
      }
      return res.json(conf)
    })
  },

  update : function(req,res){
    const { uuid, env, value } = req.allParams()
    Config.update({uuid,env},{value }).fetch().exec(function(err,updateConf){
      if(err) return res.serverError(err)
      if(updateConf.length === 0 ) return res.notFound();
      return res.json(updateConf)
    })
  },

  findAll : function(req,res){
    Config.find(function(err,configs){
      if(err) return res.serverError(err)
      return res.json(configs)
    })
  },

  delete : function(req,res){
    const { uuid,env } = req.allParams()
    Config.destroy({uuid,env}).exec((err)=>{
      if(err) return res.serverError(err)
      return res.ok()
    })
  },

  getConfig(req,res){
    const { doti,pass } = req.allParams()
    HomeService.getAll(doti,pass,function(err,result){
            if(err) console.log(err)
            return res.json(result)
        })
  }

};
