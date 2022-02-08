// Require necessary packages
const express = require("express");
const { log } = require("console");
const path = require("path");
require("dotenv").config();

const index = require("./routes/index");
const project = require("./routes/project");

// Save express functionalities in app
const app = express();

// Parse received data from post method
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set port
app.set("port", process.env.PORT || 8000);
// Set view engine
app.set("view engine", "ejs");

// Set new root for views & make it public
app.use("/views", express.static(path.join(__dirname, "views")));
// Set public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Set routes
app.use("/", index);
app.use("/projects", project);

// download CV
app.get("/download", (req, res) => {
  res.sendFile(path.join(__dirname, "./data/CV_Haluesst_Scharif.pdf"));
});

// Set server listener
app.listen(app.get("port"), () => {
  log(`The server is running on port: ${app.get("port")}`);
});
