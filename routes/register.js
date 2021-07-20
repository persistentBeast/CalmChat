const express = require('express')
const router = express.Router();
const passport= require('passport');
const User=require('../models/user')

router.get("/", (req, res)=>{
    res.render("register");
})

router.post("/", async (req, res)=>{
    const {username, email, password} = req.body;
    const new_user = new User( {username, email} );
    const if_email_exist = await User.count(({email})) ;
    if(if_email_exist){
        res.send("<h1> Email Exists !!! </h1>");
    }else{
        await User.register(new_user, password);
        res.redirect("/login")
    }    
});


module.exports=router;