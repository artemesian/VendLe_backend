const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const countrySchema=Schema({
    name:{
        type:String,
        unique:true
    },
    unicodeFlag:{type:String},
    dialCode:{type:String},
    flag:{type:String},
    cities:[],

})

module.exports=mongoose.model('Country',countrySchema);