const express = require('express')
const router = express.Router();
const User = require("../models/user")


router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id);
    res.render('user', {user});
})


module.exports=router;