import mongoose from "mongoose";

const orderSchema =({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user'
},

carId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'car'
},

quantity:{
    type:String,
    default:1
},

totalPrice:{
    type:Number,
    required:true
}

}
)

export default mongoose.model('Order', orderSchema);