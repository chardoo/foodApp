
const { result, forEach } = require('lodash');
const foodModel =  require('../model/food');
const orderModel =require('../model/orders');
const session = require('session');
let cart = new Array

let totalprice = 0;
var d = new Date()
var today = d.getDay()
let myday = "";
if(today==0) myday ="sunday"
if(today==1) myday = "monday"
if (today==2) myday = "tuesday"
if (today==3) myday = "wednesday"
if (today==4) myday = "thursday"
if (today==5) myday = "friday"
if (today==6) myday = "saturday"

console.log(today);


// const item_per_page
// getting all items on the landing page
exports.getallitems = (req, res) =>{
    foodModel.find({day:myday}, function(error, result){
     if(error) throw error
     else{
         
           allitems = result;
        res.render('index', 
        { data: result, mycart:cart, today:myday,
          path:'/', total:totalprice,
          ifLogIn:req.session.isLoggedIn});
        }
    })
}

exports.addingToCart = (req, res) => {
         let quantity = req.body.qty
         let me =  req.params.id
         let myid = JSON.stringify(me)
         let validid = myid.slice(3)
         let newvalue = validid.slice(0,-1)
         foodModel.findOne({_id:newvalue})
         .then(results =>{
          results.qty = quantity;
          cart.push(results)
          cart.save();
            })
            .then(resc =>{
              
              res.redirect('/')
            })
            .catch(error =>{
           res.redirect('/')
         })
}

exports.searchCategory = (req, res) =>{
const searchvalue =  req.params.searchvalue
if(searchvalue=='all')
{
  foodModel.find()
.then(result =>{
    if(result){
    res.render('index',
     {data:result,today:myday,
      mycart:cart,
      total:totalprice, 
      ifLogIn:req.session.isLoggedIn} )
    } 
   else{
     res. redirect('/')
   }

  })
  .catch(error=>{
    throw error
  })

}

else{
foodModel.find({'day':searchvalue})
.then(result =>{
    if(result){
    res.render('index',
     {data:result,today:myday,
      mycart:cart,
      total:totalprice, 
      ifLogIn:req.session.isLoggedIn} )
} else{
  res. redirect('/')
}

})
.catch(error=>{
  throw error
})

}

}

exports.checkout = (req, res) =>{
 let userName = {username:req.session.username}


cart.forEach(data =>{
   Object.assign(data, userName)
   })
  console.log(cart) 
orderModel.insertMany(cart)
.then(res =>{
  cart = []
  res.redirect('/')
}) 
.catch(error =>{
  res.redirect('/')
})  

}