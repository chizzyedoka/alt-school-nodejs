const http = require("http");
const fs = require("fs");
const itemsDb = [];

const handleResponse =
  (req, res) =>
  ({ code, error, data }) => {
    res.writeHead(200, { "content-Type": "application/json" });
    res.write(JSON.stringify(itemsDb));
    res.end();
  };

const server = http.createServer((req, res) => {
  if (req.url == "/api/groceries" && req.method == "GET") {
    console.log(itemsDb);
    res.writeHead(200, { "content-Type": "application/json" });
    res.end(JSON.stringify(itemsDb));
  } else if (req.url == "/api/groceries" && req.method == "POST") {
    const data = [];

    req.on("data", (chunk) => {
      //console.log({ chunk });
      data.push(chunk);
    });

    req.on("end", () => {
      const bufferBody = Buffer.concat(data).toString();
      //console.log({ bufferBody });
      const bodyOfRequet = JSON.parse(bufferBody);
      //console.log({ bodyOfRequet });
      itemsDb.push({
        ...bodyOfRequet,
        id: Math.floor(Math.random() * 500).toString(),
      });
      res.writeHead(200, { "content-Type": "application/json" });
      res.write(JSON.stringify(itemsDb));
      res.end();
      //console.log({ itemsDb });
    });
  } else if (req.url.startsWith("/api/groceries") && req.method == "GET") {
    const idLink = req.url.split("/")[3];
    // check if the id exist in the database
    let groceryIndex = itemsDb.findIndex((grocery) => grocery.id === idLink);
    if (groceryIndex != -1) {
      res.writeHead(200, { "content-Type": "application/json" });
      res.write(JSON.stringify(itemsDb[groceryIndex]));
      res.end();
      return;
    }
    res.writeHead(400, { "content-type": "text/html" });
    res.end("Given id doesn't exist");
  } else if (req.url.startsWith("/api/groceries") && req.method == "PUT") {
    const idLink = req.url.split("/")[3];
    // check if the id exist in the database
    let groceryIndex = itemsDb.findIndex((grocery) => grocery.id === idLink);
    if (groceryIndex != -1) {
      const data = [];
      req.on("data", (chunk) => {
        data.push(chunk);
      });
      req.on("end", () => {
        const bufferBody = Buffer.concat(data).toString();
        const bodyOfRequet = JSON.parse(bufferBody);
        itemsDb[groceryIndex] = {
          ...bodyOfRequet,
          id: itemsDb[groceryIndex].id,
        };
        res.writeHead(200, { "content-Type": "application/json" });
        res.write(JSON.stringify(itemsDb[groceryIndex]));
        res.end();
      });
      return;
    }
    res.writeHead(400, { "content-type": "text/html" });
    res.end("Given id doesn't exist");
  } else if (req.url.startsWith("/api/groceries") && req.method == "DELETE") {
    const idLink = req.url.split("/")[3];
    // check if the id exist in the database
    let groceryIndex = itemsDb.findIndex((grocery) => grocery.id === idLink);
    if (groceryIndex != -1) {
      itemsDb.splice(groceryIndex, 1);
      res.writeHead(200, { "content-type": "text/html" });
      res.end(`Grocery with ${idLink} removed from Database `);
      return;
    }
    res.writeHead(400, { "content-type": "text/html" });
    res.end("Given id doesn't exist");
  } else {
    res.writeHead(400, { "content-Type": "text/html" });
    res.write("Invalid request");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
