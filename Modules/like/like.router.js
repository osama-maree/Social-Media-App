const { auth } = require("../../MiddleWare/auth");
const {
  getAllLikes,
  createLike,
  numerLikeEachPost,
} = require("./controller/controller");

const router = require("express").Router();

router.get("/getLikes", auth(), getAllLikes);
router.post("/createLike", auth(), createLike);
router.get("/count", auth(), numerLikeEachPost);
module.exports = router;
