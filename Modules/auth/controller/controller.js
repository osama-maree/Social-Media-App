const userModel = require("../../../DB/models/User");
const nanoid = require("nanoid"); //i use nanoid previous version to send code when forget password
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../../services/email");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  //U can try{}catch{} to more flexible
  const { name, email, password, gender, age, profilePic } = req.body;

  const user = await userModel.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    res.status(409).json({ message: "user exits" });
  } else {
    let hashpassword = await bcrypt.hash(//hashing password before set in database
      password,
      parseInt(process.env.saltRound)
    );

    const saved = await userModel.create({
      name: name,
      email: email,
      password: hashpassword,
      age: age,
      gender: gender,
    });

    const token = await jwt.sign({ id: saved.id }, process.env.Token, {//create token with one hour to verify acount
      expiresIn: "1h",
    });
    const refreshtoken = await jwt.sign({ id: saved.id }, process.env.Token);//create token without time forever  use when expr token 1
    let messageref = `
      <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/reftoken/${refreshtoken}">refresh Token email</a>`;
    let message = `
      <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}">verfy email</a>`;
    await sendEmail(email, "confirm email", `${message}<br/>${messageref}`);//send data to email 
    res.status(201).json({ message: "added user", saved });//add use without verifying email
  }
};
const refreshToken = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.Token);
  if (!decoded?.id) {
    res.status(404).json({ message: "invalid email" });
  } else {
    const user = await userModel.findOne({
      attributes: ["email"],
      where: {
        id: decoded.id,
      },
    });

    if (!user) res.status(404).json({ message: "not register" });
    else {
      const token = jwt.sign({ id: decoded.id }, process.env.Token, {//create token expir in 5 minutes
        expiresIn: 60 * 5,
      });

      let message = `
      <a href="${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}">verfy email,refreshToken</a>`;
      await sendEmail(user.email, "confirmEmail", message);
      res.status(200).json({ message: "success" });
    }
  }
};
const confirmEmail = async (req, res) => {
  const { token } = req.params;

  const decode = await jwt.verify(token, process.env.Token);

  if (!decode) {
    res.json({ message: "invalid token" });
  }

  await userModel.update(
    { confirmEmail: true },//confirm email true
    {
      where: {
        id: decode.id,
      },
    }
  );
  res.status(200).json(decode);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.json({ message: "invalid account" });
  } else {
    if (user.confirmEmail == false) {
      res.json({ message: "please vefy U email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.json({ message: "invalid account" });
      } else {
        const token = jwt.sign({ id: user.id }, process.env.LOGINTOKEN, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({ message: "valid account", token });
      }
    }
  }
};
const sendCode = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({
    attributes: ["email"],
    where: {
      email: email,
    },
  });
  if (!user) {
    res.json({ message: "invalid account" });
  } else {
    const code = nanoid();
    await sendEmail(email, "Forget password", `verify code : ${code}`);
    const updateUser = await userModel.update(
      { sendCode: code },
      {
        where: {
          email: email,
        },
      }
    );
    if (updateUser) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "invalid update" });
    }
  }
};

const ForgetPassword = async (req, res) => {
  const { code, email, newPassword } = req.body;

  if (!code) {
    res.json({ message: "enter code" });
  } else {
    const hash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.saltRound)
    );

    const user = await userModel.update(
      { password: hash },
      {
        where: {
          email: email,
          sendCode: code,
        },
      }
    );
    if (user) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ messgae: "error code" });
    }
  }
};

module.exports = {
  signup,
  signIn,
  confirmEmail,
  sendCode,
  ForgetPassword,
  refreshToken,
};
