import mongoose from 'mongoose';
const DB_NAME = 'mern_auth_api';
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const conn = await mongoose.connect(uri, { dbName: DB_NAME });
    console.log(`MongoDB Connected: ${conn.connection.host} / ${DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
