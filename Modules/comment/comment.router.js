const { auth } = require("../../MiddleWare/auth");
const { validation } = require("../../MiddleWare/validation");
const { createcomment, udated } = require("./controller/comment.validation");
const {
  createComment,
  getComment,
  deleteComment,
  getAllComment,
  updatedComment,
} = require("./controller/controller");

const router = require("express").Router();

router.post("/comment", auth(), validation(createcomment), createComment);
router.get("/getcomment/:PostId", auth(), getComment);
router.delete("/deletecomment/:commentId", auth(), deleteComment);
router.get("/getall", auth(), getAllComment);
router.patch("/updatecomment", auth(), validation(udated), updatedComment);
module.exports = router;
