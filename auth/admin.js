const mongoose = require('mongoose');
let Adminmodel = require('../model/admin')
const OrderModel = require('../model/orders')
const foodModel =  require('../model/food')
const multer = require('multer');
//const { response, request } = require('../app');

let d = new Date();   
let date = d.getDate();
let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
let year = d.getFullYear();
let dateStr = date + "/" + month + "/" + year;
errorMessage = " ",

exports.adminLogin = ((request, response)=>{
const email = request.body.email
const Password = request.body.Password
Adminmodel.findOne({email:email, password:Password})
.then(user=>{
    if(!user)
    {
        errorMessage = "incorrect login details"
        response.render('admin',{failed: errorMessage});
      
    }
    else
    {
        
        request.session.isLoggedInAdmin = true;
        request.session.adminPrivilege = user.adminPrivilege;
        request.session.Username = user.name;
        request.session.user = user;
        return request.session.save(err =>{
        
        response.redirect('/admindashboard')
        })
      }
}).catch(error =>{
  response
})
})

exports.dashboard = async(req, res, next) =>{
  
  // console.log(req.session.adminPrivilege);
  foodModel.find(function(error, allfood){
      if(error) throw error
      else
          OrderModel.find({orderDate:dateStr})
          .then(results =>{
          res.render('admindashboard',
           { adminPrevilege : req.session.adminPrivilege,
             username: req.session.Username,
             myorder:results,
             myfood:allfood,
            })
          })
          .catch(error =>{
              response.redirect('/admin')
          })
          })
  
}






exports.adminlanding = (req, res, next)=>{
 res.render('admin',{failed: errorMessage});

}

// exports.dashboard =(req, res, next) =>{
    
//     foodModel.find(function(error, allfood){
//         if(error) throw error
//         else
//         // allmyfood.push(allfood)
//         console.log(allfood)
//     })

//    console.log(allmyfood)
//     OrderModel.find({orderDate:dateStr})
//     .then(results =>{
//     res.render('admindashboard', {myorder:results})
//     })
//     .catch(error =>{
//         response.redirect('/admin')
//     })

    
// }



exports.adminDelete = (req, res, next) =>{
const foodId = req.body.foodId;
 foodModel.findByIdAndDelete({_id:foodId})
 .then(results =>{
     res.redirect('/admindashboard')
 })
}





exports.foodMenu =(req, res, next) =>{
//  console.log("hello Grace i love you")

const name = req.body.name;
const file = req.file.originalname;
const price = parseInt(req.body.price);
const description = req.body.description;
const day = req.body.day;

newfood = {
     name:name,
     url:file,
     price:price,
     description:description,
     day:day
}

  let myfood = new foodModel(newfood);
  myfood.save()
  .then(ress =>{
    response.redirect('/admindashboard')
  }).catch(error =>{
    response.redirect('/admindashboard')
  }) 


}

exports.adminCreate= (req, response, next)=>{
  const name = req.body.name;
  const email = req.body.email; 
  const password = req.body.password;
  const admin = req.body.admin
 console.log(name, email, password, admin)
 
 let createUser = {
   name : name,
   email: email,
   password: password,
   adminPrivilege:admin
 }

 let  newUser = new  Adminmodel(createUser)
  newUser.save()
    .then(result=>{
      response.redirect('/admindashboard')
     }).catch(error=>{
       response.redirect('/admindashboard')
     })

}