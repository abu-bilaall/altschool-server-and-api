const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  let resource = path.join(__dirname, req.url);
  const resourceType = path.extname(resource);
  let contentType;

  switch (resourceType) {
    case ".html":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }

  console.log(contentType);

  fs.readFile(resource, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Resource not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

const PORT = 5000;
const HOSTNAME = "localhost";
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at: http://${HOSTNAME}:${PORT}`);
});
