import mongoose from "mongoose";


const Cupon = new mongoose.Schema({
    code:{
        type:String
    },
    discountAmount:{
        type:String
    },
    Validity:{
        type:Date
    },
    Status:{
        type:Boolean,
        default:false
    }
});


let CuponModel = mongoose.model("Cupon",Cupon)


export default CuponModel