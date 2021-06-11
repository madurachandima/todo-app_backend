import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  //check is email exsist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email already exsists");

  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hasedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({ id: user._id });
  } catch (err) {
    res.status(200).send(err);
  }
});

router.post("/login", async (req, res) => {
  {
    //check is user exsit
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(200).send({ message: "User not found", token: "" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(200)
        .send({ message: "Invalid username or password", token: "" });

    //create and asign jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res
      .header("authorization", token)
      .send({ message: "Sucess", token: token });
  }
});
export default router;
