import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Usemodel from "../models/User";
import multer from 'multer'
import path from 'path'
import {parse, v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'
const router = Router()
import ProductSchema from "../models/Products";
import tokenverify from "./Admintoken";
import mongoose from "mongoose";
import Order from "../models/Order";
const {validate,Addproduct} = require('../Validation/Admin')
import CuponModel from "../models/Cupon";


interface login {
    email?:string,
    password?:string
}

//admin login
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password}  : login= req.body;
        if(email === "admin@gmail.com" && password === "admin"){
            const token = jwt.sign({email:email} ,"eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDU3NTk3MywiaWF0IjoxNzEwNTc1OTczfQ.daq9weny70apNazg0M-4eVkB4fMab8ixcp_bHRZ7HME",{expiresIn:"1hr"})
            res.cookie('token',token,{
                httpOnly:false
            })
            return res.status(200).json({
                success:true,
                message:"successfull login"
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"invalid credential"
            })
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});



//dash board1
router.get('/count',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const users = await Usemodel.countDocuments();
        console.log(users,'user count');
        const products = await ProductSchema.countDocuments();
        console.log(products,'product count');
        const orders = await Order.countDocuments();
        console.log(orders,'orders count');

        const user = await Usemodel.aggregate([
            {
              $group: {
                _id: { $month: "$dates" },
                count: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                _id: 1
              }
            }
          ]);
          
        console.log(user,'users');
        const product = await ProductSchema.aggregate([
            {
                $group:{
                    _id:{$month : "$createAt"},
                    count:{
                        $sum : 1
                    }
                }
            },
            {
                $sort:{
                    _id: 1
                }
            }
        ])
        console.log(product , 'product')

        const order  = await Order.aggregate([
            {
                $group:{
                    _id:{$month : "$shippingDate"},
                    count:{
                        $sum:1
                    }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);
        console.log(order , 'orders');

        const sales = await Order.aggregate([
            {
                $match: {
                    Status: 'delivery' // Match orders with the status 'delivery'
                }
            },
            {
                $group: {
                    _id: null, // Group all documents together
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            }
        ]);
        
        console.log(sales,'sales');

        return res.status(200).json({
            success:true,
            users:users,
            products:products,
            orders:orders,
            user:user,
            product:product,
            order:order
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})











//view  Users
// router.get('/users',tokenverify,async(req:Request,res:Response,next:NextFunction)=>{
//     const page : number = parseInt(req.query.page as string) || 1;
//     const limilt : number = 7 
//     try{
//         const Users = await Usemodel.aggregate([
//             {
//                 $sort:{name:1}
//             },
//             {
//                 $skip:(page-1)*limilt
//             },
//             {$limit:limilt}
//         ])
//         if(Users.length === 0){
//             return res.status(404).json({
//                 success:false,
//                 message:"no users Found"
//             })
            
//         }else{
//             return res.status(200).json({
//                 success:true,
//                 message:"Users",
//                 Customers:Users
//             })
//         }

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:"internal server error"
//         })
//     }
// })



























interface product {
    productname?:string,
    description?:string,
    Originalprice?:number,
    Price?:number,
    category?:string,
    stock?:number,
    image?:string,
    createAt:Date
}


const storage = multer.diskStorage({
    destination:'products',
    filename:(req:any,file:any,cb:any)=>{
        const unnifixx = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null,file.fieldname+ "" + unnifixx+fileextension)
    }
})


const filter = (req:any,file:any,cb:any) =>{
    const AllowType = ['image/jpeg','image/png']
    if(AllowType.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Product Image is jpeg or png formate'))
    }
};

const upload = multer({storage:storage,fileFilter:filter})


//post product
router.post('/products',tokenverify,upload.array('image'),validate(Addproduct),async(req:any,res:Response,next:NextFunction)=>{
    try{
        const {productname,description,Originalprice,Price,category,stock} : product = req.body;

        // if(Originalprice <  Price ){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Price is always lessthan the Original Price"
        //     })
        // }

        if(!req.files  || req.files.length === 0){
           return res.status(400).json({
            success:false,
            message:"image is required"
           })
        }

        const images : string[]  = req.files.map((file:any)=>file.filename);

       const NewProduct = await ProductSchema.create({
        productname:productname,
        description:description,
        Originalprice:Originalprice,
        Price:Price,
        category:category,
        stock:stock,
        createAt:Date.now(),
        image:images
       });
       console.log(NewProduct)
       if(NewProduct){
        return res.status(201).json({
            success:true,
            message:"New product Successfull Added",
            Product:NewProduct
        })
       }else{
        return res.status(400).json({
            success:false,
            message:"invalid credentials "
        })
       }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//get the products
router.get('/products', tokenverify, async(req: Request, res: Response, next: NextFunction) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const name: string = req.query.name as string;
    const category: string = req.query.category as string;
    const limit: number = 12;

    try {
        let match: any = {};
        
        // Check if name is provided
        if (name) {
            match.productname = { $regex: new RegExp(name, 'i') }; // Case-insensitive regex search
        }
        
        // Check if category is provided
        if (category) {
            match.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive regex search
        }

        const totalproducts = await ProductSchema.countDocuments(match);
        const totalpage = Math.ceil(totalproducts / limit);

        const products = await ProductSchema.aggregate([
            { $match: match },
            { $sort: { productname: 1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        } else {
            return res.status(200).json({
                success: true,
                totalpage: totalpage,
                currentpage: page,
                products: products
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});













//update the product 
router.put('/product/:id',tokenverify,upload.array('image'),async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string;
    console.log(id)
    try{
        const product = await ProductSchema.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                }
            }
        ]);
        console.log(product)
        const {productname,description,Originalprice,Price,category,stock} : product = req.body;

        if(!req.files || req.files.length === 0){
            return res.status(400).json({
                success:false,
                message:"image is required"
            })
        }

       // Ensure req.files is of type Express.Multer.File[]
     const images: string[] = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.filename);

    const updateProduct = await ProductSchema.findByIdAndUpdate(id,{
        productname:productname,
        description:description,
        Originalprice:Originalprice,
        Price:Price,
        category:category,
        stock:stock,
        createAt:Date.now(),
        image:images
    });
    if(updateProduct){
        return res.status(201).json({
            success:true,
            message:"update successfully"
        })
    }else{
        return res.status(400).json({
            success:false,
            message:"some went wroung try after some time"
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

//delete the product
router.delete('/product/:id',tokenverify,async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string;
    try{
        const product = await ProductSchema.findById(id)
       
        if(!product){
            return res.status(404).json({
                success:false,
                message:"no product found with this id"
            })
        }
      const Productdelete =   await ProductSchema.findByIdAndDelete(id);
      if(Productdelete){
        return res.status(200).json({
            success:true,
            message:"product delete sucessfully"
        })
      }else{
        return res.status(400).json({
            success:false,
            message:"some went wroung try after sometime"
        })
      }
        

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});






//get the order 
router.get('/orders',async(req:Request,res:Response,next:NextFunction)=>{
    const status : string  = req.query.status as string;
    const page : number = parseInt(req.query.page as string) || 1
    const limit : number = 12;
    const skip : number = (page -1) * limit
    try{
        const orders = await Order.aggregate([
            {
              $match: {
                Status: status // Assuming 'status' is a variable containing the status value
              }
            },
            {
              $lookup: {
                from: ProductSchema.collection.name,
                localField: "product",
                foreignField: '_id',
                as: "products"
              }
            },
            {
                $limit:limit
            },
            {
                $skip:skip
            }
          ]);
          
        if(orders.length ==0){
            return res.status(404).json({
                success:false,
                message:"no orders found"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"orders",
                orders:orders
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//update the order

router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id; // No need to cast req.params.id again as it's already a string
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found"
            });
        } else {
            const status: string = req.body.status; // No need to cast req.body.status again as it's already a string
            const update = await Order.findByIdAndUpdate(id, {
                Status: status
            });
            console.log(update)
            if (update) {
                return res.status(201).json({
                    success: true,
                    message: "Order updated successfully"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong, please try again later"
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});














//add cuponen code 
router.post('/cupon',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {code, discountAmount,Validity  } = req.body 
       
      const cuponcode = await CuponModel.findOne({code:code,Status:false});
      console.log(cuponcode)
      if(cuponcode){
        return res.status(400).json({
            success:false,
            messsage:"cupon code already here"
        })
      }else{
        const newcupon = await CuponModel.create({
            code:code,
            discountAmount:discountAmount,
            Validity:Validity
        });

        if(newcupon){
            return res.status(201).json({
                success:true,
                message:"Cupon Code Added Success",
                newcupon:newcupon
            })
        }
      }

      






    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})

//get cupon code
router.get('/cupon',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const cupon = await CuponModel.find({Status:false})
        if(cupon.length === 0){
            return res.status(404).json({
                success:false,
                message:"no cupon code found"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"cupon code",
                cupon:cupon
            })
        }

    }catch(error){
        console.log(error)
    }
})






//view  Users
router.get('/users',tokenverify,async(req:Request,res:Response,next:NextFunction)=>{
    const page : number = parseInt(req.query.page as string) || 1;
    const limilt : number = 7 
    try{
        const Users = await Usemodel.aggregate([
            {
                $sort:{name:1}
            },
            {
                $skip:(page-1)*limilt
            },
            {$limit:limilt}
        ])
        if(Users.length === 0){
            return res.status(404).json({
                success:false,
                message:"no users Found"
            })
            
        }else{
            return res.status(200).json({
                success:true,
                message:"Users",
                Customers:Users
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


router.put('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    try {
        const user = await Usemodel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        }
        const { cuponcode } = req.body;
        const cupon = await CuponModel.findOne({ code: cuponcode });
        if (!cupon) {
            return res.status(404).json({
                success: false,
                message: "No coupon code found"
            });
        }
        user.cupon.push(cupon._id);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Coupon applied successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});










export default router