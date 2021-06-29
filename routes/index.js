const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
let loginmessageErro = '';

const ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.urlencoded({ extended:true }))

const Auth = require('../auth/register');
const { json } = require('body-parser');
const userAuth = require('../middleware/auth')

const itemfunct = require('../controller/product')
const payment = require('../controller/payment');
/* GET home page. */
router.get('/', itemfunct.getallitems);


router.post('/addcart/:id', itemfunct.addingToCart)


router.get('/:searchvalue', itemfunct.searchCategory)


router.get('/log/signUp', function(request, res,next){
  res.render('signUp');
  })

router.get('/log/login', function(request, res,next){
    res.render('login',{message:loginmessageErro});
   })
  
router.post('/register', Auth.SignUp)    


router.post('/auth', Auth.login)
router.post('/checkout/:amount', userAuth, itemfunct.checkout)

router.post('/payment/:amount', userAuth, payment.makePayment)

router.get('/paystack/callbackurl', userAuth, payment.callback )


module.exports = router;
