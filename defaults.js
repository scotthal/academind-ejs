const express = require("express");

const router = express.Router();

router.get("/favicon.ico", (req, res) => {
  res.type("image/x-icon").send();
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
