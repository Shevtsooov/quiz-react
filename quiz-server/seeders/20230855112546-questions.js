'use strict';

const TABLE_NAME = 'questions';

const questions = require('../api/questions.json');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(TABLE_NAME, questions);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
