import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import Post from "./models/postModel.js";
import User from "./models/userModel.js";

dotenv.config();

const seedPosts = async () => {
  try {
    await connectDB();

    const user = await User.findOne({ username: "defaultUser" });

    if (!user) {
      console.log("Default user not found. Please create a user with username 'defaultUser' first.");
      process.exit(1);
    }

    const posts = [
      {
        postedBy: user._id,
        text: "Welcome to Threads Clone! This is your first post.",
        img: "https://via.placeholder.com/150",
      },
      {
        postedBy: user._id,
        text: "Feel free to explore and connect with others.",
        img: "https://via.placeholder.com/150",
      },
    ];

    await Post.insertMany(posts);

    console.log("Default posts added successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedPosts();