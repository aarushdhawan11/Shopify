const shopify = require("./shopifyService");
const Product = require("./models/Product");

async function fetchAndStoreProducts() {
  try {
    const res = await shopify.get("/products.json");
    const products = res.data.products || [];

    for (const p of products) {
      const shopifyId = String(p.id);
      const title = p.title;
      const price = parseFloat(p.variants?.[0]?.price || 0);
      const inventory = parseInt(p.variants?.[0]?.inventory_quantity || 0, 10);

      await Product.upsert({
        shopify_id: shopifyId,
        title,
        price,
        inventory
      });
    }

    console.log(`Saved ${products.length} products.`);
    return products.length;
  } catch (err) {
    console.error("Error fetching products:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { fetchAndStoreProducts };
