import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import register from "./routes/Auth.js";
import task from "./routes/saveTask.js";
import getTasks from "./routes/getTasks.js";
import deleteTask from "./routes/deleteTask.js";

const app = express();
const port = process.env.PORT || 9000;

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

//Midelware
app.use(express.json()); //get json response
app.use(cors());

app.use("/api/user", register);
app.use("/api/task", task);
app.use("/api/task", getTasks);
app.use("/api/task", deleteTask);

app.listen(port, () => console.log(`Port : ${port}`));
