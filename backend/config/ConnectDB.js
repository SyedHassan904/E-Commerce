import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}shokiBase`);

    console.log("Database Connected Successfully");

  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default connectDB;
