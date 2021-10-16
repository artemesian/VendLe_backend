const Country =require ('../models/country_model');


module.exports.createCountry=(req,res,next)=>{
    const {name,unicodeFlag,dialCode,cities,flag}=req.body
    const country=Country({
        name:name,
        code:unicodeFlag,
        dialCode:dialCode,
        flag:flag,
        cities:cities
    })
    country.save()
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}
module.exports.findCountry=(req,res,next)=>{
    Country.find({show:true})
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}
module.exports.findOneCountry=(req,res,next)=>{
    Country.findOne({name:req.params.name})
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}
module.exports.updateOneCountry=(req,res,next)=>{
    Country.updateOne({name:req.params.name},{...req.body})
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}
module.exports.deleteOneCountry=(req,res,next)=>{
    Country.deleteOne({name:req.params.name})
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}
module.exports.loadData=(req,res,next)=>{
    console.log(req.body.country)
    Country.updateMany({},{$set:{show:false}})
    .then(country=>res.status(200).json({country:country}))
    .catch(console.log)
}