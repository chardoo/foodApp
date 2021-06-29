module.exports =(req, res, next)  =>{
    if(!req.session.isLoggedInAdmin){
        return res.redirect('/admin')
    }
    next();
   }