const express = require("express");
require("dotenv").config();
const { connectdb } = require("./db/config.js");
const cors = require("cors")
const app = express();
const UserRouter = require("./routes/user.js")
const corsOption = {
  origin: "*",
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};
app.use("/user", UserRouter)
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

const start = async () => {
  try {
    const conn = await connectdb();
    if (conn) {
      app.listen(process.env.PORT, () => {
        console.log(`cumming on port ${process.env.PORT}`);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

start();
