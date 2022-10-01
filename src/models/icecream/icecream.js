'use strict';

const iceCreamModel = (sequelize, DataTypes) => sequelize.define('Ice Cream', {
  name: { type: DataTypes.STRING, required: true },
  flavor: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.NUMBER, required: true },
});

module.exports = iceCreamModel;