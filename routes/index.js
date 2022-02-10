const express = require("express");
const fs = require("fs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const request = require("request");
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

router.get(
  "/.well-known/acme-challenge/aOWctIm1pBNayelm7VaRPxdtf-ZcYCWxxwRhEvsC-qg",
  (req, res) => {
    res.send(
      "aOWctIm1pBNayelm7VaRPxdtf-ZcYCWxxwRhEvsC-qg.AGNhHyx1ee94a74oe9kEeWMjwPReQUayN9tzh-iUfGI"
    );
  }
);

router.get(
  "/.well-known/acme-challenge/UsKuKzbWo_iqbsK6PdLEsVxDx4goTgR57f0dLExHqqo",
  (req, res) => {
    res.send(
      "UsKuKzbWo_iqbsK6PdLEsVxDx4goTgR57f0dLExHqqo.AGNhHyx1ee94a74oe9kEeWMjwPReQUayN9tzh-iUfGI"
    );
  }
);

router.post("/", (req, res, next) => {
  // console.log(req.body);
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    process.env.RECAPTCHA_KEY +
    "&response=" +
    req.body["g-recaptcha-response"];
  //+
  // "&remoteip=" +
  // req.connection.remoteAddress;

  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      res.render("error", {
        error: {
          title: "Fehler",
          message: "Verifizierung fehlgeschlagen",
        },
      });
    } else {
      sendEmail(req.body)
        .then(() => {
          res.render("success", {
            success: {
              title: "Nachricht gesendet",
              message: "Vielen Dank für Ihre Nachricht",
            },
          });
        })
        .catch((error) => {
          res.render("error", { error: error });
        });
    }
  });
});

module.exports = router;
