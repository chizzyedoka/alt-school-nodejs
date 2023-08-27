const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const server = express();

// middlewares
server.use(express.static("./public"));

// variables
const port = 3001;
const profilePath = path.join(__dirname, "public", "index.html");
const notFoundPath = path.join(__dirname, "public", "notFound.html");

const handleProfilePage = async (req, res) => {
  const profilePage = await fs.readFile(profilePath);
  res.status(200).sendFile(profilePage);
};

server.get("/index.html", handleProfilePage);

server.get("*", async (req, res) => {
  try {
    const notFoundPage = await fs.readFile(notFoundPath);
    res.send("404 Error");
  } catch (error) {
    console.log(error);
  }
  return;
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
