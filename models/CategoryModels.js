import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},{
    collection : "Category",
});

export default mongoose.model("category", categorySchema);
