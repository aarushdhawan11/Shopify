import sequelize from "./db.js";
import customer from "./models/customer.js";
import product from "./models/Product.js";
import order from "./models/order.js";
import { getShopifyProducts, getShopifyCustomers, getShopifyOrders } from "./shopifyService.js";

const syncData = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");

    const [products, customers, orders] = await Promise.all([
      getShopifyProducts(),
      getShopifyCustomers(),
      getShopifyOrders(),
    ]);

    // Sync Products
    for (const p of products) {
      await product.upsert({
        shopifyId: p.id,
        title: p.title,
        price: p.variants?.[0]?.price || 0,
        inventoryQuantity: p.variants?.[0]?.inventory_quantity || 0,
      });
    }

    // Sync Customers
    for (const c of customers) {
      await customer.upsert({
        shopifyId: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        email: c.email,
        totalSpent: c.total_spent,
        ordersCount: c.orders_count,
        tags: c.tags,
      });
    }

    // Sync Orders
    for (const o of orders) {
      await order.upsert({
        shopifyId: o.id,
        customerId: o.customer?.id || null,
        totalPrice: o.total_price,
        financialStatus: o.financial_status,
        fulfillmentStatus: o.fulfillment_status,
      });
    }

    console.log("Shopify data synced to DB ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncData();
