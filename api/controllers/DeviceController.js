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
    const { brand,manufacturer,systemVersion,apiLevel,isTablet,totalMemory } = req.allParams()
    Device.create({brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory}).fetch().exec((err,dev)=> {
        if(err) return res.serverError(err);
        return res.json(dev)
    })
  },

  update : async function(req,res){
    const { id, brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory } = req.allParams()
    Device.update({id},{ brand, manufacturer, systemVersion, apiLevel, isTablet, totalMemory }).fetch().exec((err,dev)=> {
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
  }

};
