import mongoose from "mongoose";

const carSchema = mongoose.Schema({

name:{
    type:String,
    required:true,
},

description:{
    type:String,
},

price:{
    type:Number,
    required:true,
},

image:{
    type:String,
},

categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' 
},

})

export default mongoose.model('car', carSchema);