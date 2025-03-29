const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const bio = path.join(__dirname, 'index.html');
function getBio(req, res) {
    fs.readFile(bio, 'utf-8', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" || req.url !== "/index.html") {
    res.writeHead(404, "Page not found");
    res.end("Page not found");
    return;
  }

  getBio(req, res);
});

const PORT = 5000;
const HOSTNAME = "localhost";
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at: http://${HOSTNAME}:${PORT}`);
});
