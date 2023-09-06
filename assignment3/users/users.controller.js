const groceryDbUsers = require("./users.db");

const createUser = (req, res) => {
  const user = req.body;
  user.api_key = `${user.username}_${user.password}`;
  if (user.username === "chisom") {
    user.user_type = "admin";
  } else {
    user.user_type = "user";
  }
  // check if user in dataBase
  for (let user of groceryDbUsers) {
    if (user.username == req.body.username) {
      return res.status(400).json({
        error: "username already exist",
      });
    }
  }

  groceryDbUsers.push(user);
  console.log(groceryDbUsers);

  return res.status(201).json({
    message: "User created successfully",
    users: groceryDbUsers,
  });
};

module.exports = { createUser, groceryDbUsers };
