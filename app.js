const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
}); // localhost:3000/

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
}); // localhost:3000/restaurants

app.get("/confirm", function (req, res) {
  res.render("confirm");
}); // localhost:3000/confirm

app.get("/about", function (req, res) {
  res.render("about");
}); // localhost:3000/about

app.get("/recommend", function (req, res) {
  res.render("recommend");
}); // localhost:3000/recommend

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.listen(3000);
