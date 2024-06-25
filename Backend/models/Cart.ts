import mongoose  from "mongoose";

const carts =  new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    },
    date:{
        type:Date
    },
    quantity:{
        type:Number,
        default:1
    }
}) 


let Cartproduct = mongoose.model('carts',carts);

export default Cartproduct