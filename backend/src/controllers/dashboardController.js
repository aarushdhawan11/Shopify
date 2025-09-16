import shopify from "../shopify.js"; 


export const getDashboard = async (req, res) => {
  try {
    const { start, end } = req.query;
    let dateQuery = "";
    if (start && end) {
      dateQuery = `&created_at_min=${start}T00:00:00-00:00&created_at_max=${end}T23:59:59-00:00`;
    }

    const [customersRes, productsRes, ordersRes] = await Promise.all([
      shopify.get("/customers.json"),
      shopify.get("/products.json"),
      shopify.get(`/orders.json?status=any${dateQuery}`)
    ]);

    const customers = customersRes.data.customers || [];
    const products = productsRes.data.products || [];
    const orders = ordersRes.data.orders || [];

    const customerTotals = {};
    orders.forEach((order) => {
      const email = order.customer?.email;
      if (email) {
        const totalPrice = parseFloat(order.total_price) || 0;
        customerTotals[email] = (customerTotals[email] || 0) + totalPrice;
      }
    });

    const topCustomers = Object.entries(customerTotals)
      .map(([email, total]) => ({ email, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    res.json({
      success: true,
      counts: {
        customers: customers.length,
        products: products.length,
        orders: orders.length,
      },
      topCustomers,
      ordersTrend: orders.map((o) => ({
        id: o.id,
        created_at: o.created_at,
        total_price: parseFloat(o.total_price) || 0,
      })),
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
  }
};
