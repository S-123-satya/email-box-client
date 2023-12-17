const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db-connection");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    profilePic:{
        type:DataTypes.STRING,
        
    }
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
module.exports=User;