const http = require("http");
const fs = require("fs");
// question 1
const server = http.createServer((req, res) => {
  if (req.url === "/index.html") {
    res.writeHead(200, { "content-type": "text/html" });
    let html = fs.readFileSync("./index.html", "utf-8");
    res.end(html);
  } else {
    res.writeHead(500, { "content-type": "text/html" });
    html = fs.readFileSync("./404.html", "utf-8");
    res.end(html);
  }
});

// question 2

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// fs.readFile("./index.html", (err, html) => {
//   if (err) throw err;
//   http
//     .createServer((req, res) => {
//       res.writeHeader(200, { "Content-Type": "text/html" });
//       res.write(html);
//       res.end();
//     })
//     .listen(3000, () => {
//       console.log("Listening on port 3000");
//     });
// });
