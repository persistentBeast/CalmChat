const mongoose=require('mongoose')
const schema=mongoose.Schema;



const roomSchema=new schema({

    name : {
        type : String,
        required : true,
        unique : true
    },

    password : String,

    admin : {
        type :  schema.Types.ObjectId, ref : "user"
    },
    members : [ {
        type :  schema.Types.ObjectId, ref : "user" 
    }]
});



module.exports = mongoose.model('room', roomSchema);