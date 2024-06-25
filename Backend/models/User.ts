import mongoose from "mongoose";

const User = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Avathar:{
        type:String
    },
    dates:{
        type:Date
    },
    cupon:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Cupon"
    }],
    stripeCustomerId: { type: String, required: false }
})

const Usemodel = mongoose.model('User',User)

export default Usemodel