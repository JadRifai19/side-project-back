import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from './routes/AdminRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import carRoutes from './routes/CarRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'


const app = express();

dotenv.config();

connectDB();

app.use(express.json())

app.use("/admin", adminRoutes) 
app.use('/category', categoryRoutes)
app.use('/car', carRoutes)
app.use('/order', orderRoutes)



const port = process.env.PORT || 5000;

app.listen(port,()=>{ console.log(`server is running on ${port}`)})
