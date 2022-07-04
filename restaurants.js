const uuid = require("uuid");

const express = require("express");

const storage = require("./storage");

const router = express.Router();

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body;
  console.log(restaurant.name);
  restaurant.id = uuid.v4();
  const restaurants = storage.readRestaurants();
  restaurants.push(restaurant);
  console.log(restaurants);
  storage.writeRestaurants(restaurants);
  res.redirect("/confirm");
});

router.get("/backfill-ids", (req, res) => {
  const restaurants = storage.readRestaurants();
  for (const restaurant of restaurants) {
    restaurant.id = uuid.v4();
  }
  storage.writeRestaurants(restaurants);
  res.send("<p>Backfill complete</p>");
});

router.get("/restaurants", (req, res) => {
  const restaurants = storage.readRestaurants();
  let order = parseInt(req.query.order);
  if (order !== 1 && order !== -1) {
    order = 1;
  }
  restaurants.sort((a, b) => {
    if (a.name > b.name) {
      return order * 1;
    } else if (a.name < b.name) {
      return order * -1;
    } else {
      return 0;
    }
  });
  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
    order: order * -1,
  });
});

router.get("/restaurant/:id", (req, res) => {
  const restaurantId = req.params.id;
  const theRestaurant = storage.readRestaurants().filter((aRestaurant) => {
    return aRestaurant.id === restaurantId;
  });
  if (theRestaurant.length === 1) {
    res.render("restaurant-detail", { restaurant: theRestaurant[0] });
  } else {
    res.status(404).render("404");
  }
});

module.exports = router;
