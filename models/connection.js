'use strict';
module.exports = function(Sequelize, DataTypes) {
  var Connection = Sequelize.define('Connection', {
    UserId: {
      type: DataTypes.INTEGER
    },
    ConnectionId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
  return Connection;
};
