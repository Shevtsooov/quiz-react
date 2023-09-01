'use strict';

const TABLE_NAME = 'questions';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      answers: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      correctAnswer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      difficulty: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
