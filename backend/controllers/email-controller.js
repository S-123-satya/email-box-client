const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");
const EmailChat = require("../models/email-model");
const saltRounds = 10;

module.exports.postEmail = async (req, res) => {
  //append everything to Emailchat then send it database 
  /*
   *@userId,senderId,receiverId,message,readStatus,subject
   */
  const result = await EmailChat.create(req.body);
  res.status(201).json({
    result,
  });
};
module.exports.postSignUp = async (req, res) => {
  try {
    const result = await User.findOne({ where: { email: req.body.email } });
    console.log(result);
    if (result) res.status(409).json({ message: "email already exists" });
    else {
      //use bcrypt to encrypt password and send it to database
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hash;
      const user = await User.create(req.body);
      //generate token
      const token = await generateToken({ id: user.id, email: user.email });
      res.status(201).json({
        message: "User signup successfully",
        //only send token and extract everything from token
        userId: user.id,
        email: user.email,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: "Something went wrong" });
  }
};
module.exports.getUser = (req, res) => {
  console.log(req);
  console.log(req.body);
};
module.exports.profileController = (req, res) => {
  console.log(req);
  console.log(req.body);
};
