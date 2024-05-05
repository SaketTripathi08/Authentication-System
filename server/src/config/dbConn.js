import mongoose from 'mongoose';
import { } from 'dotenv/config';


const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
      console.error("Error: MONGODB_URI environment variable not defined");
      process.exit(1); // Exit with failure
    }
  
    try {
      console.log(process.env.MONGODB_URI);
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
      console.error(err);
      process.exit(1); // Exit with failure
    }
}

export default connectDB;