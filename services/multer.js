const nanoid = require("nanoid");
const multer = require("multer");
const multerValidation = {
  image: ["image/jpeg", "image/png", "image/jpg"], //handel type image
};
//handel error
const HME = (error, req, res, next) => {
  if (error) {
    res.status(400).json({ message: "multer", error });
  } else {
    next();
  }
};
//upload image
function myMulter(customvalidation) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + nanoid() + "_" + file.originalname); //change name of image
    },
  });
  function fileFilter(req, file, cb) {
    if (customvalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file type", false);
    }
  }
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
}
module.exports = { myMulter, HME, multerValidation };
