'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Sessions', 'team1Players', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Sessions', 'team2Players', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Sessions', 'additionalPlayers', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Sessions', 'team1Players');
    await queryInterface.removeColumn('Sessions', 'team2Players');
    await queryInterface.removeColumn('Sessions', 'additionalPlayers');
  }
};