// models/admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema); // 'admins' collection in MongoDB

export default Admin;

