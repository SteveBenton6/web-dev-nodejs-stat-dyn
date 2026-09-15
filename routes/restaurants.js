const express = require("express");

const resData = require("../utils/restaurant-data");
const uuid = require("uuid");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
}); // localhost:3000/restaurants

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  // No matching Id
  res.status(404).render("404");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
}); // localhost:3000/confirm

router.get("/recommend", function (req, res) {
  res.render("recommend");
}); // localhost:3000/recommend

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

module.exports = router;
