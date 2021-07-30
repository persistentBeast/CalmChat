const express = require('express')
const router = express.Router();
const passport= require('passport');
const Room = require("../models/room");
const checkLoggedIn = require("../middlewares/checkIfLoggedIn");



router.get("/:id", checkLoggedIn , async (req, res)=>{
      const roomDetails = await Room.findById(req.params.id).populate('members').populate('admin');
    // console.log(res.locals.userLoggedIn);
    res.render("room", {roomDetails, currUser : res.locals.userLoggedIn });
})

module.exports=router;