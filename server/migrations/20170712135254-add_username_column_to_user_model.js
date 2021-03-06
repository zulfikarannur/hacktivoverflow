'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
    'Users',
    'username',
    Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
    'Users',
    'username',
    Sequelize.STRING
    )
  }
};
