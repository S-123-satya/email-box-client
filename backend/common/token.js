var jwt = require("jsonwebtoken");

const generateToken = async (body) => {
  return new Promise((resolve, rejecct) =>
    jwt.sign(body, process.env.TOKEN_SECRET_KEY || "password", function (err, token) {
      if(err) rejecct(err);
      resolve(token)
    })
  );
};
module.exports=generateToken;
//