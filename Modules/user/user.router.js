const { auth } = require("../../MiddleWare/auth");
const { myMulter, HME, multerValidation } = require("../../services/multer");
const {
  basic,
  ChangeImageProfile,
  deleteAcount,
  changePassword,
} = require("./controller/controller");

const router = require("express").Router();

router.get("/userdata", auth(), basic);
router.patch(
  "/update",
  auth(),
  myMulter(multerValidation.image).single("image"),
  HME,
  ChangeImageProfile
);
router.delete("/delete", auth(), deleteAcount);
router.patch("/changePassword", auth(), changePassword);
module.exports = router;
