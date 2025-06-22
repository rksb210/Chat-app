import mongoose from "mongoose";

export const connectDB = async () => {
  try {
   //  const conn = await mongoose.connect(process.env.MONGODB_URI);
       const conn = await mongoose.connect('mongodb://127.0.0.1:27017/chat-app');

    
      //   console.log("con1111", process.env.MONGODB_URI)

   //  console.log("con", conn)
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("MongoDB Connection error", error);
  }
};
