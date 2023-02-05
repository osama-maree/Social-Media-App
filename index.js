require("dotenv").config();
const express = require("express");
const { connectDB } = require("./DB/connection");
const app = express();
const port = process.env.PORT || 3010;
app.use(express.json());

connectDB();

const {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
  likeRouter,
} = require("./Modules/index.router");

app.use(`${process.env.BASEURL}/auth`, authRouter);
app.use(`${process.env.BASEURL}/user`, userRouter);
app.use(`${process.env.BASEURL}/post`, postRouter);
app.use(`${process.env.BASEURL}/comment`, commentRouter);
app.use(`${process.env.BASEURL}/like`, likeRouter);

app.use("*", (req, res) => res.json({ message: "error from app" }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
