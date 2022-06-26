'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        field: 'body',
        allowNull: false,
        type: Sequelize.STRING(400),
      },
      isDone: {
        field: 'is_done',
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      deadline: {
        field: 'deadline',
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
