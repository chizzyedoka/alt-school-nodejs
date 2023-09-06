const db = require("../users/users.db");
const checkBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    //res.status(401).set("WWW-Authenticate", "Basic");
    return res.status(400).send({
      data: null,
      error: "must have a body",
    });
  }
  next();
};

const basicAuth = (req, res, next) => {
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "You are not authenticated!",
    });
  }

  // decode the 'Authorization' header Base64 value
  const credentials = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const username = credentials[0];
  const password = credentials[1];
  // console.log({ username, password });
  const existingUser = db.find(
    (user) => user.username === username && user.password == password
  );
  if (existingUser) {
    req.user = existingUser;
    next();
  } else {
    // res.status(401).set("WWW-Authenticate", "Basic");
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }
};

const apiKeyAuth = (req, res, next) => {
  const authHeader = req.headers.api_key;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({
      message: "You are not authenticated!",
    });
  }

  const existingUser = db.find((user) => user.api_key === authHeader);
  if (existingUser) {
    req.user = existingUser; // added logged in user to body of request
    next();
  } else {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user.user_type !== "admin") {
    return res.status(403).json({ message: "You are not authorized" });
  }
  next();
};

module.exports = {
  checkBody,
  basicAuth,
  apiKeyAuth,
  checkAdmin,
};
