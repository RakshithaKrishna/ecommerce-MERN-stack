import mongoose  from "mongoose";

const Recomendation =  new mongoose.Schema({
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
    }
}) 


let Dashboard = mongoose.model('Recomendation',Recomendation);

export default Dashboard