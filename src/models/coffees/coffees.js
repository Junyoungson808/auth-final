'use strict';

const coffeesModel = (sequelize, DataTypes) => sequelize.define('Coffee', {
  type: { type: DataTypes.ENUM('Cappuccino', 'Latte', 'Americano','Mocha', 'Espresso', 'Macchiato'), required: true },
  temp: { type: DataTypes.ENUM('Hot', 'Iced'), required: true },
  size: { type: DataTypes.ENUM('Small', 'Medium', 'Large'), required: true },
});

module.exports = coffeesModel;