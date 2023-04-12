import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set('strictQuery', false);
dotenv.config()

const connectDB = async() => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        // useNewUrlPrser: true,
        dbName: process.env.DB_NAME
    })
 
    console.log(`Connected to: ${conn.connection.host} `);

} catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit();
}
}

// Connection error handling
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDb disconnected!");
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDb connected!");
})

export default connectDB;