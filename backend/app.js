const express = require("express");
const app = express();

const sequelize = require("./db-connection");
const userRoutes = require("./routes/user-routes");
const User = require("./models/user-model");
const EmailChat = require("./models/email-model");
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
app.use("/user", userRoutes);

User.hasMany(EmailChat);
EmailChat.belongsTo(User, { as: "Sender" });
EmailChat.belongsTo(User, { as: "Receiver" });

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`app is running at http://localhost:${port}`);
    });
  })
  .catch((e) => console.log(e));
