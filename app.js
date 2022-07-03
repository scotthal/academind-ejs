const fs = require("fs");
const path = require("path");
const express = require("express");

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

const readRestaurants = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "restaurants.json"))
  );
};

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const restaurants = readRestaurants();
  restaurants.push(restaurant);
  fs.writeFileSync(
    path.join(__dirname, "data", "restaurants.json"),
    JSON.stringify(restaurants)
  );
  res.redirect("/confirm");
});

app.get("/restaurants", (req, res) => {
  const restaurants = readRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.get("/restaurant/:id", (req, res) => {
  const restaurantId = req.params.id;
  res.render("restaurant-detail", { restaurantId: restaurantId });
});

app.listen(3000);
