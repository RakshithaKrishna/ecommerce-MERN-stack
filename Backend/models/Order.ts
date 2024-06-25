import mongoose from "mongoose";



const Orders = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    },
    fullname:{
      type:String
    },
    email:{
      type:String
    },
    shippingAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    shippingDate: {
        type: Date,
        default: Date.now
    },
    payment:{
        type: String,
        enum: ['online', 'cash_on_delivery'], // Define allowed values
        required: true
    },
    Status:{
        type:String,
        default:"processing"
    },
    amount:{
        type:String
    },
    quantity:{
        type:Number
    }
})

let Order = mongoose.model('Orders',Orders)

export default Order

