import mongoose from 'mongoose';

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Get the default connection
const db = mongoose.connection;

// Event handlers for Mongoose connection events
db.on('connected', () => {
  console.log('Connected to MongoDB database');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB database');
});

// Export the Mongoose connection
export default db;
