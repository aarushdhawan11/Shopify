import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  shopifyId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'shopify_id'   
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
    field: 'inventory_quantity' 
  }
}, {
  tableName: 'Products', 
  timestamps: true
});

export default Product;
