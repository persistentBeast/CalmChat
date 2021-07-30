

const isLoggedIn = function(req, res, next){

    if(!req.user){
        res.redirect("/login");
    }else{
        next();
    }


}


module.exports = isLoggedIn;