import mongoose from "mongoose";

const connectDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log(`database connected`);
  } catch (error) {
    console.log("error while connecting to database", error);
  }
};  


export default connectDB;
