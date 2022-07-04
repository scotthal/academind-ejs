const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

const storage = require("./storage");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/favicon.ico", (req, res) => {
  res.type("image/x-icon").send();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = storage.readRestaurants();
  restaurants.push(restaurant);
  storage.writeRestaurants(restaurants);
  res.redirect("/confirm");
});

app.get("/backfill-ids", (req, res) => {
  const restaurants = storage.readRestaurants();
  for (const restaurant of restaurants) {
    restaurant.id = uuid.v4();
  }
  storage.writeRestaurants(restaurants);
  res.send("<p>Backfill complete</p>");
});

app.get("/restaurants", (req, res) => {
  const restaurants = storage.readRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.get("/restaurant/:id", (req, res) => {
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

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
