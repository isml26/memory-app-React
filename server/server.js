import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
const app = express();
app.use(express.json({limit:'30mb',extended:"true"}));
app.use(express.urlencoded({limit:'30mb',extended:"true"}));
dotenv.config();
app.use(cors());
//set up the starting path for all the routes inside of the posts.js
app.use('/posts',postRoutes);

app.get('/',(req,res)=>{
  res.send("Hello memories API")
})

//const url = "";
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open",()=>{
  console.log("Connected Successfully");
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})




