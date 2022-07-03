const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

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
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", (req, res) => {
  const restaurants = readRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.listen(3000);
