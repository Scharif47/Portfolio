const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const router = express.Router();

const { sendEmail } = require("../models/emailhandler");

router.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../data/projects.json"), (error, data) => {
    if (error) {
      res.render("error", { error: error });
    } else {
      res.render("index", { data: JSON.parse(data.toString()) });
    }
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  sendEmail(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.render("error", { error: error });
    });
});

module.exports = router;
