const express = require("express");
const app = express();

const cors = require("cors");

const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const trainRoutes = require("./routes/trainRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketroutes = require("./routes/ticketRoutes");

const connectDB = require("./database");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const errHandler = require("./middleware/error");

require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(fileUpload());
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1", trainRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", ticketroutes);
app.use(errHandler);
app.listen(process.env.PORT, () => {
  console.log(`server is listening at port:${process.env.PORT}`);
});
