const express = require('express')
const router = express.Router();
const passport= require('passport');
const Room = require("../models/room");



router.get("/:id", async (req, res)=>{
    console.log("Hit");
    const roomDetails = await Room.findById(req.params.id).populate('members').populate('admin');
    console.log(roomDetails);
    res.render("room", {roomDetails});
})


module.exports=router;