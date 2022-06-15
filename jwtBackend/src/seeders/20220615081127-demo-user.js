'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'User',
      [
        {
          email: 'John Doe',
          password: '123',
          username: 'fake',
        },
        {
          email: 'John ',
          password: '123',
          username: 'fake fake',
        },
        {
          email: ' Doe',
          password: '123',
          username: 'fake fake fake',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
