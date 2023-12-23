const { Op } = require("sequelize");
const EmailChat = require("../models/email-model");
const User = require("../models/user-model");

module.exports.postEmail = async (req, res) => {
  try {
    console.log(req.body);
    req.body.SenderId = req.user.email;
    const message = await EmailChat.create(req.body);
    res.status(201).json({
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message:"someting went wrong",
    });
  }
};

module.exports.getEmails = async (req, res) => {
  try {
    const messages = await EmailChat.findAll({
      where: { ReceiverId: req.user.email,
        id: { [Op.gt]: req.params.id },
        receiverDelete:false },
    });
    console.log(messages);
    res.json({ message: "get received messages successfully", messages, });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
};
module.exports.getSentEmails = async (req, res) => {
  try {
    const messages = await EmailChat.findAll({
      where: { SenderId: req.user.email, 
        id: { [Op.gt]: req.params.id },
      senderDelete:false },
    });
    res.json({ message: "get received messages successfully", messages });
  } catch (error) {
    res.status(409).json({ message: "something went wrong" });
  }
};
module.exports.deleteEmail = async (req, res) => {
  try {
    const messages = await EmailChat.update(
      { ...req.body},
      { where: { id: req.body.id } }
    );
    res.json({ message: "message deleted successfully", messages });
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};
module.exports.updateEmail = async (req, res) => {
  try {
    const messages = await EmailChat.update(
      { ...req.body ,readStatus:true},
      { where: { id: req.body.id } }
    );
    res.json({ message: "message deleted successfully", messages });
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};
