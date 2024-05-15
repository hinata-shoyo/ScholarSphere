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
        comments: [{ comment: { type: String }, by: { type:String } }],
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { connectdb, User, Post };
