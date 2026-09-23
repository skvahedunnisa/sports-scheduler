'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Sessions', 'venue', {
    type: Sequelize.STRING,
    allowNull: true
  });

  await queryInterface.addColumn('Sessions', 'cancelReason', {
    type: Sequelize.STRING,
    allowNull: true
  });

  await queryInterface.addColumn('Sessions', 'cancelledAt', {
    type: Sequelize.DATE,
    allowNull: true
  });

  await queryInterface.addColumn('Sports', 'createdBy', {
    type: Sequelize.INTEGER,
    allowNull: true
  });
},

async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Sessions', 'venue');
  await queryInterface.removeColumn('Sessions', 'cancelReason');
  await queryInterface.removeColumn('Sessions', 'cancelledAt');
  await queryInterface.removeColumn('Sports', 'createdBy');
}
};
