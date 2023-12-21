const EmailChat = require("../models/email-model");

module.exports.postEmail = async (req, res) => {
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
  res.json({message:"get received messages successfully",messages});
};
module.exports.getSentEmails =async (req, res) => {
  const messages=await EmailChat.findAll({where:{SenderId:req.user.id}});
  res.json({message:"get send messages successfully",messages});
};
module.exports.deleteEmail =async (req, res) => {
  const messages=await EmailChat.destroy({where:{id:req.params.id}});
  res.json({message:"message deleted successfully",messages});
};
module.exports.updateEmail =async (req, res) => {
  const messages=await EmailChat.update({...req.body},{where:{id:req.body.id}});
  res.json({message:"message deleted successfully",messages});
};
