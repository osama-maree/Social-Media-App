const jwt = require("jsonwebtoken");//using jwt to know user logged in
const UserModel = require("../DB/models/User");
const auth = () => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;
      if (!token.startsWith(process.env.authBearerToken)) {
        //A bearer token is a type of token that is used in Auth
        res.status(400).json({ message: "error token" });//if there is token and not match with bearer token reject request,bad
      } else {
        token = token.split("__")[1];//remove bearer token from original token
        const decoded = await jwt.verify(token, process.env.LOGINTOKEN);//verify Token
        const user = await UserModel.findOne({
          where: { id: decoded.id },
        });
        req.user = user;//set data for logged in user in req
        next();//to next operation
      }
    } catch (err) {
      res.status(400).json({ message: "sendToken" }); //reject if there an technical error as fail access to database or erorr in name of model and an other error for To prevent the server from crashing
      
    }
  };
};

module.exports = { auth };
