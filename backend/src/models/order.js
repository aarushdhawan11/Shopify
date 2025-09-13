import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const order = sequelize.define("order", {
  shopifyId: { type: DataTypes.BIGINT, unique: true },
  customerId: { type: DataTypes.BIGINT },
  totalPrice: { type: DataTypes.DECIMAL },
  financialStatus: { type: DataTypes.STRING },
  fulfillmentStatus: { type: DataTypes.STRING },
});

export default order;
