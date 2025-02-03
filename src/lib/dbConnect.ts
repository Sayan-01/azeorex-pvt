import mongoose from "mongoose";
const mongoUrl:string = process.env.MONGO_URL || ""

const connectDb = async ()=>{
  try {
    await mongoose.connect(mongoUrl);
    console.log('connect datbase');
    
  } catch (error) {
    console.log(error);
    
  }
}

export default connectDb; 

//for call we write await connectDb()




