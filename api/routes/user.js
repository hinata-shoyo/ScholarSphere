const express = require("express");
const { initializeApp } = require("firebase/app");
const {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const multer = require("multer");
const firebaseConfig = require("../firebase/cloud.js");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require("../middlewares/Auth.js");
const { User } = require("../db/config.js");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

Router.get("/", authUser, async (req, res) => {
  const user = await User.findOne({ username: req.username });
  res.json({ user });
});

Router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(400).json({ msg: "user already exists" });
  } else {
    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPass,
    });
    res.json({ msg: "user created successfully" });
  }
});

Router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      res.status(403).json({ msg: "wrong password" });
      return;
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ msg: "wrong username" });
  }
});

Router.get("/posts", authUser, async (req, res) => {
  const user = await User.findOne({
    username: req.username,
  });
  res.json({ Posts: user.posts });
});

Router.post("/post", authUser, upload.single("file"), async (req, res) => {
  const { title, description } = req.body;
  const dateTime = giveCurrentDateTime();
  const storageref = ref(
    storage,
    `Posts/${req.file.originalname + "       " + dateTime}`
  );
  const metadata = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageref,
    req.file.buffer,
    metadata
  );
  const photo = await getDownloadURL(snapshot.ref);
  console.log("file uploaded successfully");
  const userr = await User.findOne({ username: req.username });
  const time = new Date();
  const posts = [
    ...userr.posts,
    { title: title, description: description, photo: photo, time: time },
  ];
  const user = await User.findOneAndUpdate(
    { username: req.username },
    { posts: posts }
  );
  user
    .save()
    .then(
      res.json({
        msg: "successfully uploaded",
        data: { name: req.file.originalname, type: req.file.mimetype, photo },
      })
    )
    .catch((e) => {
      console.log(e);
    });
});

Router.put("/update", authUser, upload.single("file"), async (req, res) => {
  const { firstName, lastName, university } = req.body;
  const dateTime = giveCurrentDateTime();
  const storageref = ref(
    storage,
    `Profile pictures/${req.file.originalname + "     " + dateTime}`
  );
  const metadata = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageref,
    req.file.buffer,
    metadata
  );
  const photo = await getDownloadURL(snapshot.ref)
  const user = await User.findOneAndUpdate(
    { username: req.username },
    {
      firstName: firstName,
      lastName: lastName,
      university: university,
      profilePicture: photo,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  user
    .save()
    .then(res.json({ msg: "user updated" }))
    .catch((e) => {
      console.error();
    });
});

module.exports = Router;
