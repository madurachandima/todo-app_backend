import express from "express";
import Task from "../models/Tasks.js";
import verify from "./verifyToken/veryfiToken.js";

const router = express.Router();
router.post("/delete", verify, async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    const respTask = await Task.updateOne(
      { userId: req.user._id },
      {
        $pull: {
          tasks: { _id: id },
        },
      },
      { new: true }
    );
    const allTasks = await Task.findOne({ userId: req.user._id });
    res.status(200).send(allTasks);
    console.log(respTask);
  } catch (err) {
    res.status(200).send(err);
  }
});

export default router;
