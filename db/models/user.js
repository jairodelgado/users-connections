'use strict';
module.exports = function(Sequelize, DataTypes) {
  var User = Sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "you must provide a name with only letters"
        },
        len: {
          args: [5, 20],
          msg: "the name must have at least 5 characters long and no more than 20"
        }
      }
    }
  }, {
    classMethods: {
    },
    freezeTableName: true,
    timestamps: false
  });
  return User;
};
