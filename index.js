require("dotenv").config();

const express = require("express");
const { connectDB } = require("./src/config/db");
const eventRouter = require("./src/api/routes/eventRoutes");
const userRouter = require("./src/api/routes/userRoutes");
const cors = require("cors");
const cloudinary = require("cloudinary").v2

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


app.use(cors());
app.use(express.json());



connectDB();



app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);








app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})




app.listen(3000, () => {
    console.log("http://localhost:3000")
})