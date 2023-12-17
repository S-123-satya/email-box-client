const User = require("../models/user-model");

module.exports.postLogin = async (req, res) => {
  console.log(req.body);
  const result = await User.findOne({ where: { email: req.body.email } });
  if(!result)
  res.status(404).json({ message:"User not found please login with valid email" });
};
module.exports.postSignUp = async (req, res) => {
  console.log(req);
  console.log(req.body);
  const result = await User.findOne({ where: { email: req.body.email } });
  console.log(result);
  if (result) res.status(409).json({ message: "email already exists" });
  else {
    //use bcrypt to encrypt password and send it to database
    const user = await User.create(req.body);
    res
      .status(201)
      .json({
        message: "SignUp successfully please verify your account before login",
        user,
      });
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
module.exports.profileVerifyController = (req, res) => {
  console.log(req);
  console.log(req.body);
};
