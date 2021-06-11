import jwt from "jsonwebtoken";

export default (req, res, next) => {
  let token = "";
  token = req.header("authorization");
  if (!token)
    return res.status(404).send({ message: "Access Denied", data: "" });

  try {
    const veryfied = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = veryfied;
    next();
  } catch (err) {
    res.status(404).send({ message: "Invalid Token", data: "" });
  }
};
