'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./model-interface.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const sequelize = new Sequelize(DATABASE_URL);

// Models
const user = require('./users/users')(sequelize, DataTypes);
const coffees = require('./coffees/coffees')(sequelize, DataTypes);
const flavors = require('./flavors/flavors')(sequelize, DataTypes);

// Relationships
user.hasMany(coffees);       // one user has many ice creams
coffees.belongsTo(user);     // one ice cream belongs to one user
coffees.hasOne(flavors);     // ice cream has one flavor
coffees.belongsTo(flavors);  // ice cream belongs to flavors
flavors.hasMany(coffees);    // flavors has many ice cream

//EXPORTS
module.exports = {
  db: sequelize,
  coffees: new Collection(coffees),
  flavors: new Collection(flavors),
  user,
};