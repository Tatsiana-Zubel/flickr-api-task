loadServer();

function loadServer() {
  var express = require("express"),
    http = require("http");
  var app = express();

  app.set("port", process.env.PORT || 8080);
  app.use(express.static(__dirname + '/public'));

  var server = http.createServer(app);
  server.listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });

  app.get("/", function (req, res) {
    res.sendfile("index.html");
  });
}
