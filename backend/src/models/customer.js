import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const customer = sequelize.define("customer", {
  shopifyId: { type: DataTypes.BIGINT, unique: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  totalSpent: { type: DataTypes.DECIMAL },
  ordersCount: { type: DataTypes.INTEGER },
  tags: { type: DataTypes.STRING },
});

export default customer;
