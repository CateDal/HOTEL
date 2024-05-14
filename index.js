import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelRoute from "./routes/hotel.js"
import roomsRoute from "./routes/rooms.js"
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB.");
  } catch (error) {
    throw error;
  }
}; 

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});

//middlewares
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req,res,next)=>{
return res.status(500).json("HELLO")
})



app.listen(3000, () => {
    connect();
    console.log("Server is running on port 3000");
});

