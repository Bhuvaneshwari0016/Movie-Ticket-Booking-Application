
// createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import Admin from './models/admin.js'; // make sure this path is correct

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await Admin.findOne({ username: 'bhuvana' });
    if (existing) {
      console.log('⚠️ Admin user already exists:', existing.username);
      return;
    }

    const passwordHash = await bcrypt.hash('bhuvana123', 10);
    const newAdmin = new Admin({
      username: 'bhuvana',
      passwordHash,
    });

    await newAdmin.save();
    console.log('🎉 Admin user created successfully!');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdmin()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unhandled error:', err);
    process.exit(1);
  });
