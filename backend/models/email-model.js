const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db-connection");

// messages:[{
//   id:1,
//   sender:"xyz@gmail.com",
//   receiver:"abc@gmail.com",
//   message:"hii",
//   time:"2023-12-18",
//   readStatus:false,
// }]
const EmailChat = sequelize.define(
  "EmailChat",
  {
    // Model attributes are defined here
    message: {
      type: DataTypes.JSON,
    },
    readStatus:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
    },
    subject:{
      type:DataTypes.TEXT,
    },
    receiverDelete:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    },
    senderDelete:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
module.exports = EmailChat;
