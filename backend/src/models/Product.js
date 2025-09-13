import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  shopifyId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'shopify_id'   // 👈 ensures correct column name
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inventoryQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'inventory_quantity' // 👈 ensures correct column name
  }
}, {
  tableName: 'Products', // Sequelize will use exactly this table
  timestamps: true
});

export default Product;
