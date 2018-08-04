/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  findAll : function(req,res){
    Device.find().exec((err,devs) => {
      if(err) return res.serverError(err);
      return res.json(devs)
    })
  },

  findOne : function(req,res){
      const { id } = req.allParams()
      Device.findOne({id}).exec((err,dev) => {
        if(err) return res.serverError(err)
        if(!dev) return res.notFound();
        return res.json(dev)
      })
  },

  create :  function(req,res){
    const { udid,brand,manufacturer,systemVersion,apiLevel,isTablet,totalMemory } = req.allParams()
    Device.find({udid}).exec(function(err,devs){
      if(err) return res.serverError(err);
      if(devs.length !== 0 )return res.json({error : 'Already Exists'})
      Device.create({udid,brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory}).fetch().exec((err,dev)=> {
          if(err) return res.serverError(err);
          return res.json(dev)
      })
    })
  },

  update : async function(req,res){
    const { udid, brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory } = req.allParams()
    Device.update({udid},{ brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory }).fetch().exec((err,dev)=> {
        if(err) return res.serverError(err);
        return res.json(dev)
    })
  },

  delete : function(req,res){
    const { id } = req.allParams()
    Device.destroy({id},function(err,dev){
      if(err) return res.serverError(err)
      return res.json(dev);
    })
  },

  deleteAll : function(req,res){
    const {pass} = req.allParams()
    if(pass === 'passw') {
      Device.destroy({},function(err){
        return res.json({message : 'Delete All Successfully !'})
      })
    } else {
      return res.json({error : 'Check Your Error !'})
    }
  }

};
