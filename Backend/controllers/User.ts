import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import Usemodel from "../models/User";
import Jwt from 'jsonwebtoken'
const router = Router()
import verifytoken from "./Usertoken";
import ProductSchema from "../models/Products";
// import stripe from 'stripe';
import Order from "../models/Order";

// const stripeSecretKey = "sk_test_51OWuXGSIUrd5GMmRru3QrMorMNdDBzOhh5LAWmuQCehA31Z2GmrkRvmAa8vZz7hlWMoeRNOq8liiQmC9TAQMnCz500V5cOMbRU";
// const stripe = require('stripe')(stripeSecretKey);
import nodemailer from 'nodemailer'
import mongoose from "mongoose";
import Dashboard from "../models/Recomendation";
import Cartproduct from "../models/Cart";
import CuponModel from "../models/Cupon";
const {validate,
    register,
login} = require('../Validation/Customer')


const storage = multer.diskStorage({
    destination: 'users',
    filename: (req: any, file: any, cb: any) => {
        const unisuffix = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + unisuffix + fileextension)

    }
})

const filter = (req: any, file: any, cb: any) => {
    const AllowType = ['image/jpg', 'image/png']
    if (AllowType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Avathar file is only jpge or png type '))
    }
}


const upload = multer({ storage: storage })

interface register {
    name?: string,
    email?: string,
    password?: string,
    dates?:Date
}
//user register
router.post('/register', upload.single('Avathar'),validate(register), async (req: any, res: Response, next: NextFunction) => {
    try {
        const { name, email, password }: register = req.body;

        // Check if user already exists with the provided email
        const user = await Usemodel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Create a new user
        const newUser = await Usemodel.create({
            name: name,
            email: email,
            password: password,
            Avathar: req.file?.filename,
            dates:Date.now()
        });

        // Send response
        return res.status(201).json({
            success: true,
            message: "registered successfully",
            user: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//user login
router.post('/login',validate(login), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: register = req.body;
        const users = await Usemodel.findOne({ email: email, password: password })
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "no user found"
            })
        } else {
            console.log(users)
            const userId = users._id
            const token = Jwt.sign({ userId: userId }, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDU3NTk3MywiaWF0IjoxNzEwNTc1OTczfQ.daq9weny70apNazg0M-4eVkB4fMab8ixcp_bHRZ7HME', { expiresIn: '1hr' })
            res.cookie('token', token, {
                httpOnly: false
            });

            return res.status(200).json({
                success: true,
                message: "successfully login",
                user: users
            })

        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
});



//recommedation 
router.get('/recomedation/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
    try{
        const customer = await Usemodel.findById(userid);
        if(!customer){
            return res.status(404).json({
                success:false,
                message:"no Customer found"
            })
        }
        const product = await Dashboard.aggregate([
            {
                $match:{
                    user : new mongoose.Types.ObjectId(userid)
                }
            },
            {
                $sort:{
                    date: -1
                }
            },
            {
                $limit:8
            }
        ]);
      // console.log(product,'product')
        const productid = product.map((item:any)=>{
            return item.product
        })
      console.log(productid,'productid')
      const products = await ProductSchema.aggregate([
        {
            $match: {
                _id: { $in: productid.map((id: string) => new mongoose.Types.ObjectId(id)) }
            }
        },
        {
            $addFields: {
                tempIndex: { $indexOfArray: [productid.map((id: string) => id.toString()), "$_id"] }
            }
        },
        {
            $sort: {
                tempIndex: -1 // Sort based on the temporary index field
            }
        }
    ]);
       // console.log(products,'product')
        return res.status(200).json({
            success:true,
            product:products
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})










//section -b get the products
router.get('/products/:id', verifytoken, async (req: Request, res: Response, next: NextFunction) => {
    const id :string = req.params.id as string
    const page: number = parseInt(req.query.page as string) || 1
    const limit: number = 8
    try {


     const customers = await Usemodel.findById(id);
     if(!customers){
        return res.status(404).json({
            success:false,
            message:"no customer found"
        })
     }





        const totalproducts = await ProductSchema.countDocuments()
        const totalpage = Math.ceil(totalproducts / limit)
        const products = await ProductSchema.aggregate([
            {
                $sort: { productname: 1 }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ])
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no products found"
            })
        } else {
            return res.status(200).json({
                success: true,
                totalpage: totalpage,
                currentpage: page,
                products: products,

            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})



//search the product
router.get('/queryproduct/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.params.userId; 
  const page: number = parseInt(req.query.page as string, 10) || 1; // Parse the page parameter from query string
  const limit: number = 12; // Number of products per page
  const skip: number = (page - 1) * limit;
  try {
    // Check if the user exists
    const user = await Usemodel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the ID"
      });
    }

    // Destructure query parameters
    const { productname, minprice, maxprice, category } = req.query as { productname?: string, minprice?: number, maxprice?: number, category?: string };

    // Construct query object based on provided query parameters
    const query: any = {};

    if (productname) {
      query.productname = { $regex: productname, $options: 'i' }; // Case-insensitive search for product name
    }

    if (minprice !== undefined) {
      query.price = { ...query.Price, $gte: minprice }; // Find products with price greater than or equal to minprice
    }

    if (maxprice !== undefined) {
      query.price = { ...query.Price, $lte: maxprice }; // Find products with price less than or equal to maxprice
    }

    if (category) {
      query.category = { $eq: category }; // Find products with specified category
    }

    // Find products based on the constructed query
    const products = await ProductSchema.find(query).skip(skip).limit(limit);
   if(products.length === 0){
    return res.status(404).json({
        success: true,
        message: "no products found"
      });
   }else{

       return res.status(200).json({
         success: true,
         data: products
       });
   }
    // Return the found products
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});




//ger the product details
// router.get('/product/:userid/:productid',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
//     const userid : string = req.params.userid as string;
//     const productid : string = req.params.productid as string;
//     try{
//         const customer = await Usemodel.findById(userid);
//         if(!customer){
//             return res.status(404).json({
//                 success:false,
//                 message:"No Customer Found"
//             })
//         }
//         const product = await ProductSchema.aggregate([
//             {
//                 $match:{
//                     _id:new mongoose.Types.ObjectId(productid)
//                 }
//             },
//             {
//                 $lookup:{
//                     from:Usemodel.collection.name,
//                     localField:"review.user",
//                     foreignField:"_id",
//                     as : 'users'
                    
//                 }
//             }
//         ]);
//         if(!product){
//             return res.status(404).json({
//                 success:false,
//                 message:"No Product Found "
//             })
//         }
//        // console.log(product)
//         const match = product.productname
//         console.log(match)
//          const products = await ProductSchema.aggregate([
//             {
//                 $match:{
//                     productname:match
//                 }
//             },
//             {
//                 $limit:4
//             }
//          ])

//          const recomend = await Dashboard.create({
//             user:userid,
//             product:productid,
//             date:Date.now()
//          })
//         console.log(recomend)
//         return res.status(200).json({
//             success:true,
//             message:"Products",
//             product:product,
//             moodeproducts:products,
//            recomend :recomend
//         })

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"internal server error"
//         })
//     }
// })

router.get('/product/:userid/:productid', async (req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid as string;
    const productid: string = req.params.productid as string;
    try {
        const customer = await Usemodel.findById(userid);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "No Customer Found"
            });
        }

        const product = await ProductSchema.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(productid) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "review.user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    productname: 1,
                    description: 1,
                    Originalprice: 1,
                    Price: 1,
                    category: 1,
                    stock: 1,
                    image: 1,
                    createAt: 1,
                    recommendation: 1,
                    review: {
                        $map: {
                            input: "$review",
                            as: "reviewItem",
                            in: {
                                user: "$$reviewItem.user",
                                rating: "$$reviewItem.rating",
                                Comment: "$$reviewItem.Comment",
                                date: "$$reviewItem.date",
                                userDetails: {
                                    $arrayElemAt: [
                                        "$userDetails",
                                        { $indexOfArray: ["$userDetails._id", "$$reviewItem.user"] }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        ]);

        if (!product || product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Product Found"
            });
        }

        const match = product[0].productname; // Accessing the productname from the first element of the product array

        const products = await ProductSchema.aggregate([
            {
                $match: {
                    productname: match
                }
            },
            {
                $limit: 4
            }
        ]);

        const recomend = await Dashboard.create({
            user: userid,
            product: productid,
            date: Date.now()
        });

        console.log(recomend);

        return res.status(200).json({
            success: true,
            message: "Products",
            product: product,
            moodeproducts: products,
            recomend: recomend
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





















//section c order 



//post ot cart page
router.post('/cartproduct/:userid/:productid',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    const userid :string = req.params.userid as string
    const productid :string = req.params.productid as string
    try{
        const cartpage = await Cartproduct.findOne({user:userid,product:productid});
        if(cartpage){
            return res.status(400).json({
                success:false,
                message:"Product Already in cart "
            })
        }
        const newcart = await Cartproduct.create({
            user:userid,
            product:productid,
            date: Date.now()
        });
        if(newcart){
            return res.status(201).json({
                success:true,
                message:"Product Added",
                newcart:newcart
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




//get the cart product
router.get('/cart/:userid',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string
    try{
        const customer = await Usemodel.findById(userid);
        if(!customer){
            return res.status(404).json({
                success:false,
                message:"internal server error"
            })
        }
        const product = await Cartproduct.find({user:userid});
        console.log(product)
        const productid  = product.map((item:any)=>item.product);
        console.log(productid)
        const products = await ProductSchema.find({_id:productid});
        console.log(products)

        if(products.length === 0){
            return res.status(404).json({
                success:false,
                message:"no product found in your cart"
            })
        }else{
            return res.status(200).json({
                success:true,
                products:products,
            })
        }

    }catch(error){
        console.log(error)
    }
})





//update the cart 
router.put('/cart/:userid/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    const userid: string = req.params.userid as string;
    try {
        const Product = await Cartproduct.findOne({ _id: id, user: userid });
        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "No product found"
            });
        } else {
            const quantity = req.body.quantity; // Extracting quantity from req.body
            const update = await Cartproduct.findByIdAndUpdate(id, { quantity: quantity }, { new: true }); // Using findByIdAndUpdate to update the document
            console.log(update);
            if (update) {
                return res.status(200).json({
                    success: true,
                    message: "Update success"
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





router.get('/carts/:userid', async(req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid as string;
    try {
        const customer = await Usemodel.findById(userid);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "internal server error"
            });
        }

        // Find products in the user's cart
        const cartProducts = await Cartproduct.find({ user: userid });

        // Extract product ids from cart products
        const productIds = cartProducts.map((item: any) => item.product);

        // Aggregate to get all products with details from ProductSchema collection
        const aggregatedProducts = await Cartproduct.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userid) }
            },
            {
                $lookup: {
                    from: ProductSchema.collection.name, // Collection name
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            }
        ]);

        if (aggregatedProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no product found in your cart"
            });
        } else {
            return res.status(200).json({
                success: true,
                products: aggregatedProducts
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









//delete the cart product
router.delete('/cart/:userid/:productid',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    const userid :string = req.params.userid as string
    const productid :string = req.params.productid as string
    try{
        const cartpage = await Cartproduct.findOne({user:userid,_id:productid});
        if(!cartpage){
            return res.status(400).json({
                success:false,
                message:"Product Already in cart "
            })
        }else{
         const productdelete =   await Cartproduct.findByIdAndDelete(productid)
         if(productdelete){
            return res.status(200).json({
                success:false,
                message:"product removed success"
            })
         }
        }

    }catch(error){
        console.log(error)
    }
})



router.post('/apply/:userid', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.userid as string; // corrected variable name
    try {
        console.log(Usemodel); // corrected variable name
        const User = await Usemodel.findById(id); // corrected variable name
        if (!User) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        }
        const { cupon } = req.body; // removed redundant cupon property access
        console.log(cupon,"post cuppon")
        const Cuponcode = await Usemodel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: CuponModel.collection.name,
                    localField: "cupon",
                    foreignField: "_id",
                    as: "cupon" // corrected variable name
                }
            }
            ,
            {
                $match: {
                    
                    'cupon.code': cupon // Filter documents where 'cupon.code' matches the provided 'cupon'
                }
            }
        ]);

        console.log(Cuponcode);
        return res.status(200).json({
            success: true,
            Cuponcode
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
















const sendorder = async(email:any,product:any)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"talariramcharan33@gmail.com",
            pass:""
        }
    })
    const sendmail = {
        from:"talariramcharan33@gmail.com",
        to:email,
        subject:`Thanks for the order thre ${product}`,
        text:`your order is confirm ,you order is processing`
    }
    await transport.sendMail(sendmail)
}








const stripeSecretKey = "sk_test_51OWuXGSIUrd5GMmRru3QrMorMNdDBzOhh5LAWmuQCehA31Z2GmrkRvmAa8vZz7hlWMoeRNOq8liiQmC9TAQMnCz500V5cOMbRU";
const stripe = require('stripe')(stripeSecretKey);

router.post('/order/:userid', async (req, res) => {
    const userid = req.params.userid;

    try {
        const user = await Usemodel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with this id"
            });
        }

        const orders = await Cartproduct.find({ user: userid });
        console.log(orders);

        // Extract product IDs from orders
        const productIds = orders.map(order => order.product);

        // Find products based on the extracted product IDs
        const products = await ProductSchema.find({ _id: { $in: productIds } });

        // Process orders
        for (const order of orders) {
            const { shippingAddress, fullname, email, city, state, postalCode, country, phoneNumber, payment, cuponid } = req.body;

            // Calculate quantity and amount
            const product = products.find(product => product._id.equals(order.product));
            const quantity = order.quantity;
            const amount = product && product.Price ? product.Price * quantity : 0;

            // Choose payment method
            if (payment === "online") {
                // Create payment intent with customer ID
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount * 100,
                    currency: 'USD',
                    payment_method_types: ['card'],
                    payment_method: "pm_card_visa",
                    customer: user.stripeCustomerId // Assuming you have the Stripe customer ID saved in your user model
                });

                console.log(paymentIntent);
                
                if (paymentIntent.status !== 'requires_confirmation') {
                    return res.status(500).json({
                        success: false,
                        message: 'Error processing payment',
                    });
                }
                if (product && typeof product.stock === 'number') {
                    product.stock -= quantity;
                    await product.save();
                } else {
                    console.warn('Product stock is not a valid number');
                }
            } else if (payment === 'cash_on_delivery') {
                // Decrease product stock
                if (product && typeof product.stock === 'number') {
                    product.stock -= quantity;
                    await product.save();
                } else {
                    console.warn('Product stock is not a valid number');
                }
            } else {
                // If payment method is neither online nor cash on delivery, return an error
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment method',
                });
            }

            // Create new order
            const newOrder = await Order.create({
                user: userid,
                product: order.product,
                fullname,
                email,
                shippingAddress,
                city,
                state,
                postalCode,
                country,
                phoneNumber,
                payment,
                quantity,
                amount
            });

            // Update coupon status if provided
            if (cuponid) {
                await CuponModel.findByIdAndUpdate(cuponid, { Status: true });
            }
        }

        // Clear cart after processing orders
        await Cartproduct.deleteMany();

        return res.status(201).json({
            success: true,
            message: 'Orders placed successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




















































//user get the orders
router.get('/order/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid 
    try{
        const user = await Usemodel.findById(userid);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"no users found with this id"
            })
        }
        const orders = await Order.aggregate([
          {
            $match:{
                user:new mongoose.Types.ObjectId(userid),
            }
          },
          {
            $lookup:{
                from:ProductSchema.collection.name,
                localField:"product",
                foreignField:"_id",
                as: "products"
            }
          }
        ])
        console.log(orders)
        if(orders.length === 0){
            return res.status(404).json({
                success:false,
                message:"no orders found"
            })
        }else{
            return res.status(200).json({
                success:true,
                order:orders
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


//get the delivery order
router.get('/order/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid 
    try{
        const user = await Usemodel.findById(userid);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"no users found with this id"
            })
        }
        const orders = await Order.aggregate([
          {
            $match:{
                user:new mongoose.Types.ObjectId(userid),
            }
          },
          {
            $match:{
                Status:{$in:["deliverd"]}
            }
          },
          {
            $lookup:{
                from:ProductSchema.collection.name,
                localField:"product",
                foreignField:"_id",
                as: "products"
            }
          }
        ])
        console.log(orders)
        if(orders.length === 0){
            return res.status(404).json({
                success:false,
                message:"no orders found"
            })
        }else{
            return res.status(200).json({
                success:true,
                order:orders
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


interface feedack{
    rating:number,
    feeback:string
}



//give feeback
router.post('/feedback/:userid/:productid/:orderid', async (req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid as string;
    const productid: string = req.params.productid as string;
    const orderid: string = req.params.orderid as string;
    try {
        const order = await Order.findOne({ user: userid, product: productid });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found"
            });
        }

        const { rating, feedback }: { rating: number, feedback: string } = req.body; 

        let product = await ProductSchema.findById(productid);
        if (!product) {
            return res.status(400).json({ 
                success: false,
                message: "No Product Found With This id"
            });
        }

        const alreadyFeedback = await ProductSchema.findOne({'review.order': orderid, 'review.user': userid});
        if (alreadyFeedback) {
            return res.status(400).json({ 
                success: false,
                message: "Feedback Already Submitted"
            });
        }

        product.review.push({
            user: userid,
            order:orderid,
            rating: rating,
            comment: feedback,
            date: Date.now()
        });

        await product.save();
        return res.status(201).json({
            success: true,
            message: "Feedback sent successfully",
            feedback: feedback,
            product: product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


//home pages
router.get('/home',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const Products = await ProductSchema.aggregate([
            {
                $match:{
                    category:"Clothing and Apparel"
                }
            },
            {
                $limit:4
            },{
                $sort:{
                    Price:1
                }
            }
        ]);
    console.log(Products);

    return res.status(200).json({
        success:true,
        Products:Products
    })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//get best selling sports 

router.get("/sports",async(Req:Request,res:Response,next:NextFunction)=>{
    try{
        const Products = await ProductSchema.aggregate([
            {
                $match:{
                    category:"Sports and Outdoors"
                }
            },
            {
                $limit:4
            },{
                $sort:{
                    Price:1
                }
            }
        ]);
        console.log(Products);

        return res.status(200).json({
            success:true,
            Products:Products
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internla server error"
        })
    }
})


// get the best selling Jewelry and Accessories
router.get("/Jewelry",async(Req:Request,res:Response,next:NextFunction)=>{
    try{
        const Products = await ProductSchema.aggregate([
            {
                $match:{
                    category:"Jewelry and Accessories"
                }
            },
            {
                $limit:4
            },{
                $sort:{
                    Price:1
                }
            }
        ]);
        console.log(Products);

        return res.status(200).json({
            success:true,
            Products:Products
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internla server error"
        })
    }
})



router.get("/couponcode/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    try {
        const user = await Usemodel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        } else {
            const coupons = await Usemodel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id) // Assuming _id is the ObjectId field for users
                    }
                },
                {
                    $lookup: {
                        from: CuponModel.collection.name,
                        let: { couponIds: "$cupon" }, // Define a variable 'couponIds' to hold the array of coupon IDs
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$_id", "$$couponIds"] // Check if the coupon ID exists in the 'couponIds' array
                                    }
                                }
                            }
                        ],
                        as: "coupons"
                    }
                }
            ]);
            if (coupons.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: coupons
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "No coupons found"
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




export default router