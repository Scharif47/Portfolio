const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "../data/projects.json"), (error, data) => {
    if (error) {
      res.render("error", { error: error });
    } else {
      let project = JSON.parse(data.toString()).find(
        (p) => p.id === Number(req.params.id)
      );
      res.render("project-template", { data: project });
    }
  });
});

module.exports = router;
