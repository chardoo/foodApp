
 const mongoose = require('mongoose')
let d = new Date();   
let date = d.getDate();
let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
let year = d.getFullYear();

let dateStr = date + "/" + month + "/" + year;
 
 
 let Productschema = mongoose.Schema({
       _id:{
           type:String
          },

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
     },
     quantity:{
         type:String,
         trim:true,
         required:false
     },
     Username:{
        type:String,
        trim:true,
        required:false
     },
     Email:{
         type:String,
         trim:true,
         required:false
     },
    
     orderDate: {
        type: String,
        required: false,
        default: dateStr
    }

 })
 
 const productModel =  mongoose.model('orders', Productschema)
 module.exports = productModel


