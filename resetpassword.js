import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.js";

dotenv.config();

const username = "bhuvana"; // replace with your admin username
const newPassword = "bhuvana123"; // replace with your new password

async function resetPassword() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB ✅");

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log("❌ Admin not found with username:", username);
    } else {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      admin.passwordHash = passwordHash;
      await admin.save();
      console.log("✅ Password reset successfully for", username);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error:", err);
  }
}

resetPassword();
