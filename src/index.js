const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const postRouter = require("./routes/postRouter");
const profileRouter = require("./routes/profileRouter");

app.use(express.json());

app.use("/post", postRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server Port : " + PORT);
    })
}).catch((error)=> console.log("Did not Connect"));