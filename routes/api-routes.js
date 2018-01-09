// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Encounter = require("../models/encounter.js");

// Routes
// =============================================================
module.exports = function(app) {

  // Search for Encounters within a specific zipcode then provides JSON
    //app.get("/api/:zipcode?", function(req, res) {

    // Display the data for all of the ecounters.
      //Encouter.findAll({
        //where: {
          //zipcode: req.params.zipcode,
        //},
        //order: ['encounter_date', 'DESC'],
        //limit: 10
      //})
        //.then(function(result) {
          //return res.json(result);
        //});
    //});

  // Search for Encounters by city, state & country then provides JSON
  app.get("/api/:city?:state?:country?", function(req,res) {

    // Display data for all of the encounters.
    Encounter.findAll({
      where: {
        city: req.params.city,
        state: req.params.state,
        country: req.params.country
      },
      order: ['encounter_date','DESC'],
      limit:10
    })
      .then(function(result) {
        return res.json(result);
      });
  });

  // Search for Encounters by state & country

  app.get("/api/:state?:country?", function(req,res) {

    // Display data for all of the encounters.
    Encounter.findAll({
      where: {
        state: req.params.state,
        country: req.params.country
      },
      order: ['encounter_date','DESC'],
      limit: 10
    })
      .then(function(result) {
        return res.json(result);
      });
  });

  // Search for Encounters by country

  app.get("/api/:country?", function(req,res) {

    // Display data for all of the encounters.
    Encounter.findAll({
      where: {
        country: req.params.country
      },
      order: ['encounter_date','DESC'],
      limit: 10
    })
      .then(function(result) {
        return res.json(result);
      });
  });

  // Search for Encounters by date then provides JSON
  app.get("/api/:date?", function(req,res) {

    // Display data for all of the encounters.
    Encounter.findAll({
      where: {
        encounter_date: req.params.date
      }
      order: ['encounter_date','DESC'],
      limit: 10
    })
      .then(function(result){
        return res.json(result);
      });
  });

  // If a user sends data to add a new encounter...
  app.post("/api/new", function(req, res) {

    // Take the request...
    var encounter = req.body;

    // Then add the encounter to the database using sequelize
    Encounter.create({
      encounter_date: encounter.date,
      city: encounter.city,
      state: encounter.state,
      country: encounter.country,
      object_shape: encounter.shape,
      duration: encounter.duration,
      description: encounter.description,
      reported_date: encounter.reported,
      latitude: encounter.latitude,
      longitude: encounter.longitude,
      //zipcode: encounter.zipcode
    });

  });
};