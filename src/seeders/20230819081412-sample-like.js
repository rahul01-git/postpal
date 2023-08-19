'use strict';

/** @type {import('sequelize-cli').Seeders} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      {
        id: 1,
        user_id: 1,
        post_id: 1,
        is_liked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2, 
        post_id: 2, 
        is_liked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  },
};
