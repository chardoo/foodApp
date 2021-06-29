
 const mongoose = require('mongoose')
 
 
 
 let Productschema = mongoose.Schema({
     name: {
         type: String,
         trim: true,
         required: true
       },

    url:{
    type:String,
    required: true
    },

       price:{
           type:Number,
           required:true,
       },

       description: {
         type: String,
         trim: true,
         required: true
       },
       
     day:{
         type:String,
         trim: true,
         required: true
     }
 })
 
 const productModel =  mongoose.model('foods', Productschema)
 module.exports = productModel


