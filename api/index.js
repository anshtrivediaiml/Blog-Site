import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(String(process.env.VITE_MONGODB_CONNECTION_URL)).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});