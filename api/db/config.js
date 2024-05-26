const { ObjectId } = require("mongodb");
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
      trim:true,
      minLength:3,
      maxLength:30
    },
    password: {
      type: String,
      required: true,
      minLength:4,
    },
    profilePicture: {
      type: String,
      default:
        "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
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
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    userId: {
      type: ObjectId,
    },
    profilePic: {
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
      default: null,
    },
    time: {
      type: Date,
    },
    comments: [{ comment: { type: String }, by: { type: String } }],
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { connectdb, User, Post };
