const User  = require('../model/User')
const cookies = require('cookies')
const bycrypt = require('bcrypt')
let loginmessage = '';


exports.SignUp = (req, res, next) =>{
let hashpassword = bycrypt.hashSync(req.body.password, 8)
  console.log(hashpassword)
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})
  .then(resposnse =>{
       if(resposnse){
         return res. redirect('/signUp')
       }
       else{
       const newuser = new User({
        name:name,
        email:email,
        password:hashpassword })
       return newuser.save();
    }

  })
  .then(results =>{
    return res.redirect('log/login');
  })
  .catch(error =>{
    console.log(error);
  })

}

exports.login = (req, res, next) =>{
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})
  .then(user =>{
    if(!user)
         {
           loginmessage = "credentials incorrect please try again"
           return res.render('login',{message:loginmessage})
         }
    else{  
             bycrypt.compare(password, user.password)
             .then(domatch =>{
               if(domatch){
                 req.session.username = user.name;
                 req.session.useremail = user.email;
                 req.session.isLoggedIn = true;
                 req.session.user = user
                 console.log(user)
                return req.session.save(err =>{
               
                res.redirect('/')
                 })
               }
               loginmessage = "credentials incorrect please try again"
                res.render('login',{message:loginmessage})
             })
             .catch(err =>{
              console.log(err)
              res.redirect('/login')
             })  
        }       
  })
  .catch(error =>{
    console.log(error);
    loginmessage = "credentials incorrect please try again"
    res.render('login',{message:loginmessage});
  })
}

