const sequelize = require("./db");
const Product = require("./models/Product");
const Customer = require("./models/customer");
const Order = require("./models/order");
const Tenant = require("./models/Tenant");

async function syncDB() {
  await sequelize.sync({ alter: true });
  console.log("Database & tables created/updated.");
  process.exit(0);
}

syncDB().catch(err => { console.error(err); process.exit(1); });
