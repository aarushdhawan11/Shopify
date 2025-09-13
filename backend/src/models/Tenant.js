const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Tenant = sequelize.define("Tenant", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  store_url: DataTypes.STRING,
  access_token: DataTypes.STRING
});

module.exports = Tenant;
