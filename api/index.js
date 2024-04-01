const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
var cors = require('cors')



// File Uploading using multer
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    //there must be file name
    // cb(null, "test.jpg");
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("flie uploaded successfully");
});

//DB Connection
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes

app.use("/test",(req,res)=>{
  res.send("it works");
});
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

// Server Port
app.listen("5600", () => {
  console.log("backend is running");
});
