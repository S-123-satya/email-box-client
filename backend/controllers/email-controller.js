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
  console.log(`line 24`);
  console.log(req.user);
  const messages1=await EmailChat.findAll({where:{ReceiverId:req.user.id}});
  const messages2=await req.user.getEmailChats();
  const messages3=await EmailChat.findAll();
  console.log(messages1);
  console.log(messages2);
  res.json({message:"get messages successfully",messages1,messages2,messages3});
};
module.exports.getSentEmails =async (req, res) => {
  console.log(`line 35`);
  console.log(req.user);
  const messages1=await EmailChat.findAll({where:{SenderId:req.user.id}});
  const messages2=await req.user.getEmailChats();
  const messages3=await EmailChat.findAll();
  console.log(messages1);
  console.log(messages2);
  res.json({message:"get messages successfully",messages1,messages2,messages3});
};
