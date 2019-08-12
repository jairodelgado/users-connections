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
          msg: "You must provide a name with only letters"
        },
        len: {
          args: [1, 20],
          msg: "The name must have at least 1 characters long and no more than 20"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.User.belongsToMany(models.User, {
          as: 'Connections',
          through: 'Connection'
        });
      }
    },
    timestamps: false
  });
  return User;
};
