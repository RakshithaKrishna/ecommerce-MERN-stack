import mongoose from "mongoose";

const Product = new mongoose.Schema({
    productname:{
        type:String,

    },
    description:{
        type:String
    },
    Originalprice:{
      type:Number
    },
    Price:{
        type:Number
    },
    category:{
        type:String,
        enum:{
            values:[

                'Electronics',
                'Clothing and Appearal',
                'Home and Kitchen',
                'Beauty and Personal Care',
                'Health and Wellness',
                'Books and Media',
                'Toys and Games',
                'Sports and Outdoors',
                'Food and Beverages',
                'Jewelry and Accessories',
                'Automotive',
                'Others'
            ]
        }
    },
    stock:{
        type:Number
    },
    image:[{
        type:String
    }],
    createAt:{
        type:Date
    },
    review:[
        {
            user:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:"User"
            },
            order:{
              type:mongoose.SchemaTypes.ObjectId,
              ref:"Orders"
            },
            rating:{
                type:Number,
                default: 0
            },
            Comment:{
                type:String
            },
            date:{
                type:Date
            }
        }
    ]

})


const ProductSchema = mongoose.model('Product',Product)

export default ProductSchema