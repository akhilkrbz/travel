'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      google_business_id: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      location_lat: {
        type: Sequelize.STRING
      },
      location_lng: {
        type: Sequelize.STRING
      },
      location_place: {
        type: Sequelize.STRING
      },
      location_district: {
        type: Sequelize.STRING
      },
      location_state: {
        type: Sequelize.STRING
      },
      map_link: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      category_main: {
        type: Sequelize.STRING
      },
      category_sub: {
        type: Sequelize.STRING
      },
      save_count: {
        type: Sequelize.INTEGER
      },
      view: {
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
    await queryInterface.dropTable('Spots');
  }
};