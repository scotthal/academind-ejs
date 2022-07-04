const fs = require("fs");
const path = require("path");

const restaurantsPath = path.join(__dirname, "data", "restaurants.json");

const readRestaurants = () => {
  return JSON.parse(fs.readFileSync(restaurantsPath));
};

const writeRestaurants = (restaurants) => {
  return fs.writeFileSync(restaurantsPath, JSON.stringify(restaurants));
};

module.exports = {
  readRestaurants: readRestaurants,
  writeRestaurants: writeRestaurants,
};
