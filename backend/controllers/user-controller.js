const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");
const { Op } = require("sequelize");
const saltRounds = 10;

module.exports.postLogin = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    res
      .status(404)
      .json({ message: "User not found please login with valid email" });
  } else {
    console.log(user);
    const token = await generateToken({ id: user.id, email: user.email });
    res.status(201).json({
      message: "User signup successfully",
      //only send token and extract everything from token
      userId: user.id,
      email: user.email,
      token: token,
    });
  }
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
module.exports.getUser =async (req, res) => {
  //make a controller to search the user using emial id using deboucing
  try {
    
    console.log(req.params.email);
    let users=[];
    if(req.params.email)
     users=await User.findAll({where:{email:{[Op.like]:`${req.params.email}%`}}})
    console.log(users);
    res.json({users})
  } catch (error) {
    console.log(error);
    res.json({message:"someting went wrong in fetching user"})
  }
};
module.exports.profileController = (req, res) => {
  console.log(req);
  console.log(req.body);
};
