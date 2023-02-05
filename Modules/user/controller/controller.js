const UserModel = require("../../../DB/models/User");
const bcrypt = require("bcrypt");

const basic = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await UserModel.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        email: email,
      },
    });
    res.status(200).json({ message: "succes", user: user });
  } catch (err) {
    res.status(400).json({ messgae: "there is an error" });
  }
};
const ChangeImageProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const image = req.file.destination + "/" + req.file.filename;
    const upd = await UserModel.update(
      {
        PofilePic: image,
      },
      {
        where: {
          email: email,
        },
      }
    );
    if (upd) {
      res.status(200).json({ messege: "success", user: upd });
    } else {
      res.status(400).json({ message: "invlid updated" });
    }
  } catch (err) {
    res.status(400).json({ messege: "error img" });
  }
};

const deleteAcount = async (req, res) => {
  try {
    const { email } = req.user;

    await UserModel.destroy({
      where: {
        email: email,
      },
    });
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: "error from delete accout" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findOne({
      where: {
        email: req.user.email,
      },
    });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      res.json({
        error:
          "Wrong Password. Please enter your current password correctly in order to accept the changes",
      });
    } else {
      const hashed = await bcrypt.hash(
        newPassword,
        parseInt(process.env.saltRound)
      );

      await UserModel.update(
        { password: hashed },
        { where: { email: req.user.email } }
      );
      res.status(200).json({ message: "SUCCESS! Password Changed" });
    }
  } catch (err) {
    res.status(304).json({ message: "invlid Updated" });
  }
};
module.exports = {
  basic,
  ChangeImageProfile,
  deleteAcount,
  changePassword,
};
