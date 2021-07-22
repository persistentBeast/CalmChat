const express = require('express')
const router = express.Router();
const User = require("../models/user")
const Room = require("../models/room");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    res.render('user', {user});
})

router.get('/:id/create',  (req, res)=>{
    const userId=req.params.id;
    res.render('createRoomForm', {userId});
})

router.post('/:id/create', async (req, res)=>{
    const {roomName, password} = req.body;

    const room_exist = await Room.count({name : roomName});

    if(room_exist){
        res.send("<h1> Sorry Room Exist </h1>");
    }else{

        await bcrypt.hash(password, saltRounds, function(err, hash) {
            if(!err){
                const newRoom = new Room({name : roomName, password : hash, admin : req.params.id});
                await Room.save();
                res.redirect(`/user/${req.params.id}`);
            }
        });

    }

})


module.exports=router;