const mongoose=require("mongoose");

const vaidjischema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    age : {
        type:Number,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    Blood : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    }

})

//create collection

const Register = new mongoose.model("Vaidcollection", vaidjischema);
module.exports=Register;