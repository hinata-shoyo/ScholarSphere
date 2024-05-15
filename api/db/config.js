// import mongoose from "mongoose";
const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
      // required: true,
    },
    lastName: {
      type: String,
      default: "",
      // required: true,
    },
    university: {
      type: String,
    },
    posts: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        likes: {
          type: Number,
          default: 0,
        },
        photo: {
          type: String,
        },
        time: {
          type: Date,
        },
        comments: [{ comment: { type: String }, user: { String } }],
      },
    ],
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { connectdb, User };
