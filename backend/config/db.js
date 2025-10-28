import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI is not set");
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    const state = mongoose.connection.readyState;
    console.log(`[DB] Connected to MongoDB (state=${state})`);
  } catch (err) {
    console.error("[DB] MongoDB connection error:", err.message);
    throw err;
  }
}

export function getDBStatus() {
  const conn = mongoose.connection;
  return {
    readyState: conn.readyState, // 0=disconnected,1=connected,2=connecting,3=disconnecting
    name: conn.name,
  };
}
