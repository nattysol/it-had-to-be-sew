import { client } from "@/sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. DEFINE THE QUERY (Single Definition)
// We are using the "Raw" query temporarily to debug your field names
const activeOrdersQuery = `*[_type == "order"]`; 

// 2. DEFINE THE COMPONENT
export default async function ActiveOrdersPage() {
  // 3. FETCH DATA (using the query defined above)
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 0 } });

  // 4. RENDER DASHBOARD
  return <OrderDashboard initialOrders={orders} />;
}