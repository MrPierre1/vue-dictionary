var express = require("express");
var serveStatic = require("serve-static");
var port = process.env.PORT || 5000;
var fs = require("fs");

function readJSONFile(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

app = express();
app.get("/getWord", (req, res) => {
  readJSONFile("dictionary.json", function(err, json) {
    if (err) {
      throw err;
    }
    res.send(json[req.query.searchTerm]);
  });
});

app.use(serveStatic(__dirname + "/"));

app.listen(port);
