const http = require("http");
const fs = require("fs");
const itemsDb = [];

const handleResponse =
  (req, res) =>
  ({ code = 200, error = null, data = null }) => {
    res.writeHead(code, { "content-Type": "application/json" });
    res.write(JSON.stringify({ data, error }));
    res.end();
  };

const server = http.createServer((req, res) => {
  if (req.url == "/api/groceries" && req.method == "GET") {
    console.log(itemsDb);
    const response = handleResponse(req, res);
    return response({ data: itemsDb });
    // res.writeHead(200, { "content-Type": "application/json" });
    // res.write(JSON.stringify({ data: itemsDb, error: null }));
    // res.end();
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
      const response = handleResponse(req, res);
      return response({ data: itemsDb });
      // res.writeHead(200, { "content-Type": "application/json" });
      // res.write(JSON.stringify({ data: itemsDb }));
      // res.end();
      //console.log({ itemsDb });
    });
  } else if (req.url.startsWith("/api/groceries") && req.method == "GET") {
    const idLink = req.url.split("/")[3];
    // check if the id exist in the database
    let groceryIndex = itemsDb.findIndex((grocery) => grocery.id === idLink);
    if (groceryIndex != -1) {
      const response = handleResponse(req, res);
      return response({ data: itemsDb[groceryIndex] });
      // res.writeHead(200, { "content-Type": "application/json" });
      // res.write(JSON.stringify({ data: itemsDb[groceryIndex], error: null }));
      // res.end();
      // return;
    }
    const response = handleResponse(req, res);
    return response({ code: 404, error: "Given id doesn't exist" });
    // res.writeHead(404, { "content-type": "application/json" });
    // res.write(JSON.stringify({ data: null, error: "Given id doesn't exist" }));
    // res.end();
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
        const response = handleResponse(req, res);
        return response({ data: itemsDb[groceryIndex] });
        // res.writeHead(200, { "content-Type": "application/json" });
        // res.write(JSON.stringify({ data: itemsDb[groceryIndex], error: null }));
        // res.end();
      });
      return;
    }
    res.writeHead(400, { "content-type": "application/json" });
    res.write(JSON.stringify({ data: null, error: "Given id doesn't exist" }));
    res.end();
  } else if (req.url.startsWith("/api/groceries") && req.method == "DELETE") {
    const idLink = req.url.split("/")[3];
    // check if the id exist in the database
    let groceryIndex = itemsDb.findIndex((grocery) => grocery.id === idLink);
    if (groceryIndex != -1) {
      itemsDb.splice(groceryIndex, 1);
      res.writeHead(200, { "content-type": "application/json" });
      res.write(
        JSON.stringify({
          data: `Grocery with ${idLink} removed from Database`,
          error: null,
        })
      );
      return res.end();
    }
    res.writeHead(400, { "content-type": "application/json" });
    res.write(JSON.stringify({ data: null, error: "Given id doesn't exist" }));
    res.end();
  } else {
    res.writeHead(400, { "content-Type": "application/json" });
    res.write(JSON.stringify({ data: null, error: "Invalid request" }));
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
