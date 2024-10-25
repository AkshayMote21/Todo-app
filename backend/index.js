import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import AllRoutes from './routes/index.js';
const app = express();
app.use(express.json());
dotenv.config();
app.use(morgan("combined"));
app.use(cors({
    credentials : true,
    origin:"http://localhost:3000"
}));
app.use(cookieParser());
app.use("/api/v1",AllRoutes);
app.get('/',function(req,res){
    res.send("Home working");
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database connected.");
})
app.listen(process.env.PORT_NUMBER,()=>{
    console.log("server is running.");
});

