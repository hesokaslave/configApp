/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findAll : function(req,res){
    Message.find().exec((err,msgs) => {
      if(err) return res.serverError(err);
      return res.json(msgs)
    })
  },

  findOne : function(req,res){
      const { id } = req.allParams()
      Message.findOne({id}).exec((err,msg) => {
        if(err) return res.serverError(err)
        if(!msg) return res.notFound();
        return res.json(msg)
      })
  },

  create :  function(req,res){
    const { name, telephone,email,body } = req.allParams()
    Message.create({name,telephone,email,body}).fetch().exec((err,msg)=> {
        if(err) return res.serverError(err);
        return res.json(msg)
    })
  },

  update : async function(req,res){
    const { id,name, telephone,email,body } = req.allParams()
    Message.update({id},{name,telephone,email,body}).fetch().exec((err,msg)=> {
        if(err) return res.serverError(err);
        return res.json(msg)
    })
  },

  delete : function(req,res){
    const { id } = req.allParams()
    Message.destroy({id},function(err,msg){
      if(err) return res.serverError(err)
      return res.json(msg);
    })
  }

};
