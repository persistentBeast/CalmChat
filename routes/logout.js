const express = require('express')
const router = express.Router();
const passport= require('passport');
const User = require("../models/user")


router.get("/", (req, res)=>{
    req.logout();
    res.redirect("/");
})




module.exports=router;