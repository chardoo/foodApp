const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const Admin = require('../auth/admin');
const admin = require('../model/admin');
const multer = require('multer');
const foodModel = require('../model/food')
const authAdmin = require('../middleware/adminauth')

router.post('/adminlogin', Admin.adminLogin)


router.get('/admin', Admin.adminlanding)


router.get('/admindashboard', authAdmin, Admin.dashboard)



router.post('/adminDelete', authAdmin, Admin.adminDelete)

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './products')
    },
    filename: function (req, file, cb) {
      // let fileExtension = path.extname(file.originalname).split('.')[1];
      cb(null, file.originalname)
    }
  })
  let upload = multer({ storage: storage })
router.post('/addFoods', authAdmin, upload.single('myfile'), function(req, res, next){
   let  name = req.body.name;
   let file = req.file.originalname;
   let price = parseInt(req.body.price);
   let description = req.body.description;
   let day = req.body.day;
   
let newfood = {
     name:name,
     url:file,
     price:price,
     description:description,
     day:day
    }

  let myfood = new foodModel(newfood);
  myfood.save()
  .then(ress =>{
    res.redirect('/admindashboard')
  }).catch(error =>{
    res.redirect('/admindashboard')
  }) 
})


router.post("/CreatUser", Admin.adminCreate)








module.exports = router;