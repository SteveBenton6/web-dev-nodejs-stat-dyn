const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello World! - from my new nodeJS server!</h1>");
}); // localhost:3000/

app.listen(3000);
