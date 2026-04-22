'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    google_business_id: DataTypes.STRING,
    phone: DataTypes.STRING,
    location_lat: DataTypes.STRING,
    location_lng: DataTypes.STRING,
    location_place: DataTypes.STRING,
    location_district: DataTypes.STRING,
    location_state: DataTypes.STRING,
    map_link: DataTypes.STRING,
    image: DataTypes.STRING,
    category_main: DataTypes.STRING,
    category_sub: DataTypes.STRING,
    save_count: DataTypes.INTEGER,
    view: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};