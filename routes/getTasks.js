import express from "express";
import verify from "./verifyToken/veryfiToken.js";
import Task from "../models/Tasks.js";
const router = express.Router();

router.post("/getTasks", verify, async (req, res) => {
  try {
    const Tasks = await Task.findOne({ userId: req.user._id });
    res.status(200).send({ message: "sucess", data: Tasks });
  } catch (err) {
    res.status(404).send(err);
  }
});

export default router;
