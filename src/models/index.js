'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
// const iceCreamModel = require('./icecream/icecream');
// const foodModel = require('./food/model.js');
// const userModel = require('./users');
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
flavors.belongsToMany(icecream);

//EXPORTS
module.exports = {
  db: sequelize,
  icecream: new Collection(icecream),
  flavors: new Collection(flavors),
  user,
};