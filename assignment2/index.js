const http = require("http");
const fs = require("fs");

fs.readFile("./index.html", (err, html) => {
  if (err) throw err;
  http
    .createServer((req, res) => {
      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    })
    .listen(3000, () => {
      console.log("Listening on port 3000");
    });
});
