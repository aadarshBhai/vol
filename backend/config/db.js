import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const connectDB = async (retryCount = 0) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log(`   Using URI: ${process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/:([^@]+)@/, ':***@') : 
      'MONGODB_URI is not set'}`);
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set in environment variables');
      return false;
    }
    
    if (!process.env.MONGODB_URI.includes('mongodb+srv://')) {
      console.warn('⚠️  MONGODB_URI does not appear to be a MongoDB Atlas connection string');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
      appName: 'Cluster0'
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Retrying connection in ${RETRY_DELAY / 1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return connectDB(retryCount + 1);
    }
    
    console.error('❌ Max retries reached. Could not connect to MongoDB.');
    console.error('   Please check your internet connection and MongoDB Atlas configuration.');
    console.error('   MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    return false;
  }
};

const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  return states[mongoose.connection.readyState] || 'unknown';
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established successfully');
  console.log(`   Database: ${mongoose.connection.db.databaseName}`);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️  MongoDB disconnected');
});

// Close the connection when the Node process ends
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

export { connectDB, getDBStatus };
