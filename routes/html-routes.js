// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads landing.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // add route loads the add.html page,
  // where users can enter new encounters to the db
  app.get("/report", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/report.html"));
  });

  // all route loads the all.html page,
  // where all encounters in the db are displayed
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });

};
