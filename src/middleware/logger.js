'use strict';

module.exports = function (req, res, next) {
  console.log('Request:', req.method, req.path);
  next();
};