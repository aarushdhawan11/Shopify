import fetch from "node-fetch";

const SHOPIFY_STORE = process.env.SHOPIFY_STORE_URL; 
const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

export const getShopifyProducts = async () => {
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-07/products.json`, {
    headers: { "X-Shopify-Access-Token": SHOPIFY_TOKEN }
  });
  const data = await res.json();
  return data.products;
};

export const getShopifyCustomers = async () => {
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-07/customers.json`, {
    headers: { "X-Shopify-Access-Token": SHOPIFY_TOKEN }
  });
  const data = await res.json();
  return data.customers;
};

export const getShopifyOrders = async () => {
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/api/2025-07/orders.json?status=any`, {
    headers: { "X-Shopify-Access-Token": SHOPIFY_TOKEN }
  });
  const data = await res.json();
  return data.orders;
};
