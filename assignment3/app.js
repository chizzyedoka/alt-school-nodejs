const express = require("express");
const app = express();
const groceriesrouter = require("./groceries/groceries.router");
const groceryUserRoute = require("./users/users.router");
const port = 3001;

app.use(express.json());
app.use("/groceries/users", groceryUserRoute);
app.use("/groceries", groceriesrouter);

app.get("*", (req, res) => {
  res.status(404).send(`Route not found`);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
