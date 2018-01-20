// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


// var db = require("../models")



// Creates a "Encounter" model that matches up with DB
var Encounter = sequelize.define("alien_encounter", {
    freezeTableName: true,
  // encounter date (date & time)
  encounter_date: Sequelize.DATE,
  // city of the encounter (a string)
  city: Sequelize.STRING,
  // state of the encounter (a string)
  state: Sequelize.STRING,
  // country of the encounter (a string)
  country: Sequelize.STRING,
  // shape of the encoutered object (a string)
  object_shape: Sequelize.STRING,
  // duration of the encounter (an int)
  duration: Sequelize.INTEGER,
  // description of the encounter (a string)
  description: Sequelize.STRING,
  // date the encounter was reported (date & time)
  reported_date: Sequelize.DATE,
  // latitude coordinate of the encounter (decimal)
  latitude: Sequelize.DECIMAL(25,20),
  // longitude coordinate of the encounter (decimal)
  longitude: Sequelize.DECIMAL(25,20),
  // zipcode (a string)
  zipcode: Sequelize.STRING
}, {
  timestamps: false
});

// Syncs with DB
Encounter.sync();

// Makes the Encounter Model available for other files (will also create a table)
module.exports = Encounter;