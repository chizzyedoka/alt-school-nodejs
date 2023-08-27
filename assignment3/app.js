const express = require("express");
const app = express();
const groceriesrouter = require("./groceries/groceries.router");
const port = 3001;

app.use(express.json());
app.use("/groceries", groceriesrouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
