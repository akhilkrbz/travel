const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require('dotenv').config();

//DATABASE CONNECTION CONFIGURATION
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
});

//CONNECT TO DATABASE
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        //Sync all db table models. Also this creates tables if they don't exist
        await sequelize.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}

module.exports = connectDB;
module.exports.sequelize = sequelize;