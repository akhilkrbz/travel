'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      mobile_no: {
        type: Sequelize.STRING,
        unique: true
      },
      bio_email: {
        type: Sequelize.STRING
      },
      bio_number: {
        type: Sequelize.STRING
      },
      bio_website: {
        type: Sequelize.STRING
      },
      bio_description: {
        type: Sequelize.STRING
      },
      profile_img: {
        type: Sequelize.STRING
      },
      verified_account: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};