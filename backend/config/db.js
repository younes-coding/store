import mongoose from 'mongoose';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumiere-store', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Notice] Could not connect to database at ${process.env.MONGODB_URI}: ${error.message}`);
    console.warn(`[MongoDB Notice] Running in hybrid fallback mode. Please configure MONGODB_URI in backend/.env with your MongoDB Atlas connection string for persistence.`);
  }
};
