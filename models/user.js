const mongoose=require('mongoose')
const schema=mongoose.Schema;
const passportLocalMongoose= require('passport-local-mongoose');



const userSchema=new schema({

    email : {
        type: String,
        required: true,
        unique : true
    },
    rooms : [
        { type : schema.Types.ObjectId, ref : 'room' }
    ]

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);