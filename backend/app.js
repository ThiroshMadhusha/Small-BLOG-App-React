// Import Express JS
import express from "express";
const app = express();

// Send Request For Database Using JSON Server(Like Bodyparser)
app.use(express.json())

// Import Routers
import router from "./routes/user-routes";
app.use("/api/user", router);

// import mongoDB database
import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://admin:3OTKzhbCjdMI3I0q@cluster0.bwnn9cb.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connect To Database and Listerning to Localhost 5000")
  )
  .catch((err) => console.log(err));

// Data base Password -->>  3OTKzhbCjdMI3I0q
