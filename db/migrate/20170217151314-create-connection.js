'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Connection', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserIdLeft: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    UserIdRight: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Connection');
  }
};
