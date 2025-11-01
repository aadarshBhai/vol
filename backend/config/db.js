// backend/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. First load environment variables from the root .env file
const envPath = path.resolve(process.cwd(), '.env');
console.log(`🔍 Loading environment from: ${envPath}`);
const envConfig = dotenv.config({ path: envPath });

// 2. Check if MONGODB_URI is properly loaded
let mongoURI = process.env.MONGODB_URI;

// 3. If not in env, try to get it directly from the .env file
if (!mongoURI && envConfig.parsed) {
  mongoURI = envConfig.parsed.MONGODB_URI;
}

// 4. If still not found, use the hardcoded Atlas URI as fallback
if (!mongoURI) {
  mongoURI = "mongodb+srv://volvoro:VOLVOROANURAG098@cluster0.lts5rjd.mongodb.net/volvo?retryWrites=true&w=majority&appName=Cluster0";
  console.warn("⚠️  Using hardcoded MongoDB Atlas URI");
}

// 5. Validate the MongoDB URI
if (!mongoURI) {
  console.error("❌ MONGODB_URI is not defined in environment variables or .env file");
  process.exit(1);
}

// 6. Force MongoDB Atlas connection if it's not already an Atlas URI
if (!mongoURI.includes('mongodb+srv://')) {
  console.warn("⚠️  MONGODB_URI is not a MongoDB Atlas connection string. Forcing to use Atlas...");
  mongoURI = "mongodb+srv://volvoro:VOLVOROANURAG098@cluster0.lts5rjd.mongodb.net/volvo?retryWrites=true&w=majority&appName=Cluster0";
}

// 7. Log the MongoDB URI with sensitive information redacted
const maskedMongoURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@');
console.log(`🔗 MongoDB URI: ${maskedMongoURI}`);

// Connection options
const connectionOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: 'majority'
};

export const connectDB = async () => {
  try {
    console.log("🔍 Attempting to connect to MongoDB...");
    
    // Force new connection
    await mongoose.connect(mongoURI, connectionOptions);
    
    // Set up event listeners
    mongoose.connection.on('connected', () => {
      console.log(`✅ Successfully connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('ℹ️  MongoDB disconnected');
    });

    return mongoose.connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    
    if (error.message.includes('ECONNREFUSED') && error.message.includes('127.0.0.1')) {
      console.error('⚠️  The application is trying to connect to localhost.');
      console.error('   Please ensure your MONGODB_URI points to a MongoDB Atlas cluster.');
    }
    
    process.exit(1);
  }
};

// Add getDBStatus function
export const getDBStatus = () => {
  if (!mongoose.connection) {
    return {
      connected: false,
      readyState: 0,
      message: 'Not connected to MongoDB'
    };
  }

  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    name: mongoose.connection.name,
    host: mongoose.connection.host,
    db: mongoose.connection.db ? mongoose.connection.db.databaseName : 'not connected'
  };
};
