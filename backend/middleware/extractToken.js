var jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const extractToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify( token, process.env.TOKEN_SECRET_KEY || "password", async (err, obj) => {
        if (err) {
            throw new Error(err);
        }
        const user = await User.findByPk(obj.id);
        if (user && user.email === obj.email) {
          req.user = user;
          next();
        }
        throw new Error("something went wrong");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "token missing or provide a valid token" });
  }
};
module.exports = extractToken;
//
