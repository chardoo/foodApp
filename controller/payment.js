var request = require('request')
const {initializePayment, verifyPayment} = require('../controller/paystack')(request);

exports.makePayment = (req, res) =>{
            let amount =  req.params.amount
            console.log("hello the whole to ", amount)
            const form = { amount:amount, full_name:'nsabo Godfred', email:"godfred.nsabo@amalitech.org "} 
            form.metadata = {
                full_name : form.full_name
            }
            form.amount *=  100;
            initializePayment(form, (error, body) =>{
                if(error){
                    console.log(error)
                    return
                }
                response = JSON.parse(body);
                res.redirect(response.data.authorization_url)
            })
}






exports.callback =(req, res, next) => {
const ref = req.query.reference;
verifyPayment(ref, (error, body) =>{
   if(error){
       res.redirect('/all');
   }
   else{
       res.redirect('/all');
   }
})

}