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
  try {
    console.log(req.body);
    req.body.SenderId=req.user.id;
    const result = await EmailChat.create(req.body);
    res.status(201).json({
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getEmails = async(req, res) => {
  const messages=await EmailChat.findAll({where:{ReceiverId:req.user.id}});
  res.json({message:"get messages successfully",messages});
};
module.exports.getSentEmails =async (req, res) => {
  const messages=await EmailChat.findAll({where:{SenderId:req.user.id}});
  res.json({message:"get messages successfully",messages});
};
