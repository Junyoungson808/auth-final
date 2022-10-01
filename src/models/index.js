'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./model-interface.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const sequelize = new Sequelize(DATABASE_URL);

// Models
const user = require('./users/users')(sequelize, DataTypes);
const icecream = require('./icecream/icecream')(sequelize, DataTypes);
const flavors = require('./flavors/flavors')(sequelize, DataTypes);

// Relationships
user.hasMany(icecream);       // one user has many ice creams
icecream.belongsTo(user);     // one ice cream belongs to one user
icecream.hasOne(flavors);     // ice cream has one flavor
icecream.belongsTo(flavors);  // ice cream belongs to flavors
flavors.hasMany(icecream);    // flavors has many ice cream

//EXPORTS
module.exports = {
  db: sequelize,
  icecream: new Collection(icecream),
  flavors: new Collection(flavors),
  user,
};