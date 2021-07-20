const express = require('express')
const router = express.Router();
const passport= require('passport');
const User = require("../models/user")


router.get("/", (req, res)=>{
    res.render("login");
})

router.post("/", passport.authenticate('local', {failureRedirect : "/login"}), (req, res)=>{
    const userObjectId = req.user._id;
    res.redirect(`/user/${userObjectId}`);
});



module.exports=router;