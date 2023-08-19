'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        full_name: 'John Doe',
        email: 'john@example.com',
        email_verified: false,
        otp: 1234,
        password: "$2a$12$TzYLJIqSj7T8g8qt8WXbm.DAmsHDfnNJioBZoPSU7yzXfINFi.pLi", //1234
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        email_verified: true,
        otp: 5678,
        password: "$2a$12$TzYLJIqSj7T8g8qt8WXbm.DAmsHDfnNJioBZoPSU7yzXfINFi.pLi", //1234
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
