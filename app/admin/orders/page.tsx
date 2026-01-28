import { client } from "../../../sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. THE FIXED QUERY (Using single quotes to fix the dimensions bug)
const activeOrdersQuery = `
  *[_type == "order" && status in ["ready", "processing", "inProgress", "new"]] | order(orderDate asc) {
    "id": _id,
    "clientName": customer.firstName + " " + customer.lastName,
    "pattern": pattern->title, 
    
    // 👇 FIXED: Uses single quotes for clean string concatenation
    "dimensions": dimensions.width + ' " x ' + dimensions.height + ' "',
    
    "dueDate": orderDate,
    status,
    "battingLength": dimensions.height + 8, 
    "img": pattern->image.asset->url,
    "materialsAvailable": true,
    "lowStock": false
  }
`;

export default async function ActiveOrdersPage() {
  // 2. FETCH DATA (revalidate: 0 ensures instant updates)
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 0 } });

  // 3. PASS TO DASHBOARD
  return <OrderDashboard initialOrders={orders} />;
}