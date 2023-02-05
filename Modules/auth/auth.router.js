const { validation } = require("../../MiddleWare/validation");
const { myMulter, HME, multerValidation } = require("../../services/multer");
const {
  signUpv,
  signin,
  send1,
  forgetPassword,
} = require("./controller/auth.validation");
const {
  signup,
  signIn,
  confirmEmail,
  sendCode,
  ForgetPassword,
  refreshToken,
} = require("./controller/controller");

const router = require("express").Router();
router.post(
  "/signup",
  validation(signUpv),//to validation
  myMulter(multerValidation.image).single("image"),//to upload image
  HME,//handel error
  signup
);
router.get("/signin", validation(signin), signIn);
router.get("/confirmEmail/:token", confirmEmail);
router.get("/sendCode", validation(send1), sendCode);
router.post("/forgetPassword", validation(forgetPassword), ForgetPassword);
router.get("/reftoken/:token", refreshToken);
module.exports = router;
