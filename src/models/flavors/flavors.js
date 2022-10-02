'use strict';

const flavorsModel = (sequelize, DataTypes) => sequelize.define('Flavors', {
  type: { type: DataTypes.ENUM('Caramel', 'Hazelnut', 'Chocolate','Pumpkin Spice', 'Vanilla'), required: true },
  pumps: { type: DataTypes.INTEGER, required: true },
  calories: { type: DataTypes.INTEGER, required: true },
});

module.exports = flavorsModel;