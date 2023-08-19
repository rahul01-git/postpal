'use strict';

/** @type {import('sequelize-cli').Seeders} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        id: 1,
        user_id: 1,
        post_id: 1, 
        description: 'Comment by Gita on the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2, 
        post_id: 2, 
        description: 'Comment by Sita on the second post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
