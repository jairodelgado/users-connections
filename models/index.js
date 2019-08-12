"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'database.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var models = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return file !== "index.js";
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync();

module.exports = models;
