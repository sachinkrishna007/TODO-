import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/todotask");
    // console.log(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);  
  }
};

export default connectDB; 
