'use strict';
module.exports = function(Sequelize, DataTypes) {
  var User = Sequelize.define('Connection', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.Connection.belongsTo(models.User);
        models.Connection.belongsTo(models.User);
      }
    },
    freezeTableName: true,
    timestamps: false
  });
  return User;
};
