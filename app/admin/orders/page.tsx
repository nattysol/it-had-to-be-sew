import { client } from "../../../sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. THE PRODUCTION QUERY
const activeOrdersQuery = `
  *[_type == "order" && status in ["ready", "processing", "inProgress", "new"]] | order(orderDate asc) {
    "id": _id,
    "clientName": customer.firstName + " " + customer.lastName,
    "pattern": pattern->title, 
    
    // 👇 FIXED: Simplified quote syntax
    "dimensions": dimensions.width + '" x ' + dimensions.height + '"',
    
    "dueDate": orderDate,
    status,
    "battingLength": dimensions.height + 8, 
    "img": pattern->image.asset->url,
    "materialsAvailable": true,
    "lowStock": false
  }
`;

export default async function ActiveOrdersPage() {
  // Use revalidate: 0 so you always see the latest status changes
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 0 } });
  return <OrderDashboard initialOrders={orders} />;
}