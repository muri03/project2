// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Encounter = require("../models/encounter.js");
var sequelize = require("sequelize");
var country = require("countrystatesjs");
var countrynames = require("countrynames");
var changeCase = require("change-case");
var zipcodes = require('zipcodes');

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

  // Get list of 

  // Search for Encounters by city, state & country then provides JSON

app.get("/findcountry/:country?",function(req,res){
   Encounter.findAll({
      where: {
        $or: [
          {country: countrynames.getCode(req.params.country).toLowerCase()},
          {country:req.params.country}
        ]
      },
      order: [
        ['encounter_date','DESC']
      ],
      limit:10
    })
      .then(function(result) {        
        return res.json(result);
      });
});

app.get("/findstate/:country?/:state?",function(req,res){
   Encounter.findAll({
      where: {
        $or: [
          {country: countrynames.getCode(req.params.country).toLowerCase()},
          {country: req.params.country}
        ],
        $or: [
          {state: country.state(req.params.country,req.params.state).abbreviation.toLowerCase()},
          {state: req.params.state}
        ]
      },
      order: [
        ['encounter_date','DESC']
      ],
      limit:10
    })
      .then(function(result) {
        
        return res.json(result);
      });
});

app.get("/findcity/:country?/:city?",function(req,res){
   Encounter.findAll({
      where: {
        $or: [
          {country: countrynames.getCode(req.params.country).toLowerCase()},
          {country: req.params.country}
        ],
        city: req.params.city.toLowerCase()
      },
      order: [
        ['encounter_date','DESC']
      ],
      limit:10
    })
      .then(function(result) {
        //var description = result[0].dataValues.description;
        
        return res.json(result);
      });
});

app.get("/findcitystate/:country?/:state?/:city?",function(req,res){
   Encounter.findAll({
      where: {
        $or: [
          {country: countrynames.getCode(req.params.country).toLowerCase()},
          {country: req.params.country}
        ],
        $or: [
          {state: country.state(req.params.country,req.params.state).abbreviation.toLowerCase()},
          {state: req.params.state}
        ],
        city: req.params.city.toLowerCase()
      },
      order: [
        ['encounter_date','DESC']
      ],
      limit:10
    })
      .then(function(result) {
        //var description = result[0].dataValues.description;
        
        return res.json(result);
      });
});

  app.get("/api/:country?/:state?/:city?", function(req,res) {
    // Display data for all of the encounters.
    if(req.params.city != null){

    Encounter.findAll({
      where: {
        country: countrynames.getCode(req.params.country).toLowerCase(),
        state: country.state(req.params.country,req.params.state).abbreviation.toLowerCase(),
        city: req.params.city.toLowerCase().replace(/-/g, ' ')
      },
      order: [
        ['encounter_date','DESC']
      ],
      limit:10
    })
      .then(function(result) {
        //var description = result[0].dataValues.description;
        
        return res.json(result);
      });
    } else if(req.params.state != null){
      Encounter.findAll({
        where: {
          country: req.params.country,
          state: req.params.state,
        },
        order: [
          ['encounter_date','DESC']
        ],
        limit:10
      })
        .then(function(result) {
          return res.json(result);
        });
      } else if(req.params.country != null){
      Encounter.findAll({
        where: {
          country: req.params.country,
        },
        order: [
          ['encounter_date','DESC']
        ],
        limit:10
      })
        .then(function(result) {
          return res.json(result);
        });
      } else {
        Encounter.findAll({
          attributes: [[sequelize.fn('DISTINCT', sequelize.col('country')), 'country']],
          order: [
            ['country','ASC']
          ]
        })
          .then(function(result) {
            var countryArray = [];
            for(var i = 0; i < result.length; i++){
              if(country.name(result[i].dataValues.country.toUpperCase()) != undefined){
                countryArray.push(country.name(result[i].dataValues.country.toUpperCase()));
              }
            };
            console.log(countryArray);
            return res.json(countryArray);
          });
      }
  });

  // Get list of states

  app.get("/list/:country?",function(req,res) {
    Encounter.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('state')), 'state']],
      where: {
        country: countrynames.getCode(req.params.country).toLowerCase()
      },
      order: [
        ['state','ASC']
      ]
    })
      .then(function(result) {
        var stateArray = [];
        for(var i = 0; i < result.length; i++){
          stateArray.push(country.name(req.params.country,result[i].dataValues.state));
        };
        return res.json(stateArray);
      });
  });

  // Get list of cities based on state

  app.get("/list/:country?/:state?",function(req,res) {
    var state;
    if(req.params.state === "N/A"){
      console.log("null");
      state = null;
    } else{
      state = country.state(req.params.country,req.params.state).abbreviation;
    }
    console.log(state);
    Encounter.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('city')), 'city']],
      where: {
        country: countrynames.getCode(req.params.country).toLowerCase(),
        state: state
      },
      order: [
        ['city','ASC']
      ]
    })
      .then(function(result) {
        var cityArray = [];
        for(var i = 0; i < result.length; i++){
          cityArray.push(result[i].dataValues.city);
        }
        return res.json(cityArray);
      });
  });

  // Get list of cities based on country

  app.get("/list2/:country?",function(req,res) {
  
    Encounter.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('city')), 'city']],
      where: {
        country: countrynames.getCode(req.params.country).toLowerCase(),
      },
      order: [
        ['city','ASC']
      ]
    })
      .then(function(result) {
        console.log(result);
        var cityArray = [];
        for(var i = 0; i < result.length; i++){
          cityArray.push(result[i].dataValues.city);
        }
        console.log(cityArray)
        return res.json(cityArray);
      });
  });

  // Search for Encounters by date then provides JSON
  app.get("/api/:date?", function(req,res) {

    // Display data for all of the encounters.
    Encounter.findAll({
      where: {
        encounter_date: req.params.date
      },
      order: [
        ['encounter_date','DESC']
      ],
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

    var zipObject = zipcodes.lookup(encounter.zipcode);

    var lat = zipObject.latitude;
    var long = zipObject.longitude;

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
      latitude: lat,
      longitude: long
      //zipcode: encounter.zipcode
    }).then(function(dbEncounter) {
      // We have access to the new encounter as an argument inside of the callback function
      res.json(dbEncounter);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });

  });
};