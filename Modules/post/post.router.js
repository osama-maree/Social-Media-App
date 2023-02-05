const { auth } = require("../../MiddleWare/auth");
const { validation } = require("../../MiddleWare/validation");
const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} = require("./controller'/controller");
const { posts } = require("./controller'/post.validation");

const router = require("express").Router();

router.get("/getallpost", auth(), getAllPost);
router.post("/createpost", auth(), validation(posts), createPost);
router.patch("/updatedPost", auth(), validation(updatePost), updatePost);
router.delete("/delete/:postId", auth(), deletePost);
module.exports = router;
