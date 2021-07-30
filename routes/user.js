const express = require('express')
const router = express.Router();
const User = require("../models/user")
const Room = require("../models/room");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const checkLoggedIn = require("../middlewares/checkIfLoggedIn");


router.get('/:id', checkLoggedIn, async (req, res)=>{
    const user = await User.findById(req.params.id).populate('rooms');
    res.render('user', {user});
})

router.get('/:id/create',  checkLoggedIn , (req, res)=>{
    const userId=req.params.id;
    res.render('createRoomForm', {userId});
})

router.post('/:id/create', checkLoggedIn, async (req, res)=>{
    const {roomName, password} = req.body;

    const room_exist = await Room.count({name : roomName});

    if(room_exist){
        res.send("<h1> Sorry Room Exist </h1>");
    }else{

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (!err) {
                const user = await User.findById(req.params.id);
                const members = [];
                members.push(user);
                const newRoom = new Room({ name: roomName, password: hash, admin: req.params.id, members });
                user.rooms.push(newRoom);
                await newRoom.save();
                await user.save();
                res.redirect(`/user/${req.params.id}`);
            }
        });

    }

})

router.get('/:id/join', checkLoggedIn,  (req, res)=>{
    const userId=req.params.id;
    res.render('joinRoomForm', {userId});
})

router.post('/:id/join', checkLoggedIn, async (req, res, next)=>{

    const {roomName, roomPass} = req.body;
    const roomJoinee = await User.findById(req.params.id);
    const roomToBeJoined = await Room.findOne({name : roomName}).populate('members');
    if(roomToBeJoined.length==0){
        res.send("<h1> No such room exist! </h1>");
    }else{        
        bcrypt.compare(roomPass, roomToBeJoined.password, async function (err, result){
            if(result==true){               
                let alreadyMember=false;
                for(let i=0;i<roomToBeJoined.members.length;i++){
                    if(String(roomToBeJoined.members[i]._id)==String(roomJoinee._id)){
                        alreadyMember=true;
                        break;
                    }
                }
                if(alreadyMember){
                    res.send("<h1> Already a member! </h1>");
                }else{
                    roomJoinee.rooms.push(roomToBeJoined);
                    roomToBeJoined.members.push(roomJoinee);
                    await roomJoinee.save();
                    await roomToBeJoined.save();
                    console.log("Room Joined!");
                    res.redirect(`/user/${req.params.id}`);
                }                
            }else{
                res.send("<h1> Forbidden! </h1>");
            }
        })        
    }


})


module.exports=router;