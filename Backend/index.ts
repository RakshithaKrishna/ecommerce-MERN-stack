import  express,{json,urlencoded} from "express";
import mongoose  from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Admin from './controllers/Admin'
import Users from './controllers/User'

const app = express()
const PORT =6800;
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from all origins
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(cookieParser());
app.use(express.json());
app.use('/products', express.static('products'));
app.use('/users', express.static('users'));





mongoose.connect('mongodb://localhost:27017/ecom').then(()=>{
    console.log('mongodb is connected')
    app.listen(PORT,()=>{
        console.log(`server is running the ${PORT}`)
    })
});



app.use('/admin',Admin)
app.use('/user',Users)