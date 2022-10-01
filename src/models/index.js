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
user.hasMany(icecream);
icecream.belongsTo(user);
icecream.hasOne(flavors);
icecream.belongsTo(flavors);
flavors.hasMany(icecream);

//EXPORTS
module.exports = {
  db: sequelize,
  icecream: new Collection(icecream),
  flavors: new Collection(flavors),
  user,
};