
 const mongoose = require('mongoose')
const {isEmail} = require('validator')


let Userschema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
      },
      password: {
        type: String,
        minlength: 8,
        trim: true,
        required: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        validate: {
          validator: v => isEmail(v),
          message: "input should be valid email"
        },
    }
})

module.exports = mongoose.model('Users', Userschema)