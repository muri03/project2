// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
/*
var sequelize = new Sequelize("alien_encounter_db", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
*/

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL, {})
} else { 
	sequelize = new Sequelize(
		"alien_encounter_db", "root", "admin", {
  		host: "localhost",
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	});
};

// Exports the connection for other files to use
module.exports = sequelize;

//////////////////////////////