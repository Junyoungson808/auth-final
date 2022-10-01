'use strict';

const flavorsModel = (sequelize, DataTypes) => sequelize.define('Flavors', {
  name: { type: DataTypes.STRING, required: true },
  flavor: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.NUMBER, required: true },
});

module.exports = flavorsModel;