const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//const Story = require('../models/Story')

//Login or Landing Page
router.get("/", ensureGuest, (req, res) => {
  res.send("Failed Login / Successful Logout");
});

router.get("/dashboard", ensureAuth, (req, res) => {
  console.log(req.user);
  const name = req.user.firstName;
  res.send(`Welcome ${name}`);
});

module.exports = router;
