const express = require("express");

const app= express();
const dotenv= require("dotenv")
const mongoose= require("mongoose");
const helmet= require("helmet")
const morgan= require("morgan");
const userRoute= require("./routes/users")
const authRoute= require("./routes/auth")
const postRoute= require("./routes/post")

dotenv.config();

//connet to mongoose
mongoose.connect(process.env.MONGO_URL).then((res) => {console.log("Mongodb is connected successfully"); });

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)

app.listen(8000,(req,res)=>{
    console.log("server is set up at port 8000")
});