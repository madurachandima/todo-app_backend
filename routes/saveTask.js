import express from "express";
import Task from "../models/Tasks.js";
import verify from "./verifyToken/veryfiToken.js";

const router = express.Router();

router.post("/save", verify, async (req, res) => {
  const isExist = await Task.findOne({ userId: req.user._id });
  const newTask = req.body.task;
  if (!newTask) {
    res.status(200).send({ message: "Task cannot be empty" });
    return;
  }
  if (isExist) {
    try {
      const respTask = await Task.findOneAndUpdate(
        { userId: req.user._id },
        {
          $push: {
            tasks: [{ task: newTask }],
          },
        },
        { new: true }
      );
      res.status(200).send(respTask);
    } catch (err) {
      res.status(200).send(err);
    }
  } else {
    const task = new Task({
      userId: req.user._id,
      tasks: [
        {
          task: newTask,
        },
      ],
    });

    try {
      const respTask = await task.save();
      res.status(200).send(respTask);
    } catch (err) {
      res.status(200).send(err);
    }
  }
});

export default router;
