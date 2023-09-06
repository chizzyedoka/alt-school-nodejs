const db = require("./users.db");
const validateUserCreation = (req, res, next) => {
  if (!req.body.username || !req.body.username.trim()) {
    return res.status(400).json({
      error: "username is required",
    });
  }

  if (!req.body.password || !req.body.password.trim()) {
    return res.status(400).json({
      error: "password is required",
    });
  }

  next();
};

const sendUsersDb = (req, res) => {
  res.send(db);
};
module.exports = { validateUserCreation, sendUsersDb };
