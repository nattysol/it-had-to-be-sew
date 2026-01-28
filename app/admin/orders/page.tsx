import { client } from "../../../sanity/lib/client"; // Ensure you have your sanity client set up
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. The GROQ Query to get active orders
const activeOrdersQuery = `
  *[_type == "order" && status in ["new", "processing", "inProgress"]] | order(dueDate asc) {
    "id": _id,
    clientName,
    "pattern": pattern->title, 
    "dimensions": width + '" x ' + height + '"',
    dueDate,
    status,
    // Calculate theoretical batting based on height + 8" margin
    "battingLength": height + 8, 
    "img": pattern->image.asset->url,
    materialsAvailable,
    lowStock
  }
`;

// 2. This is now a Server Component (Async)
export default async function ActiveOrdersPage() {
  // 3. Fetch data directly from Sanity
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 30 } });

  // 4. Pass real data to the Client Dashboard
  return <OrderDashboard initialOrders={orders} />;
}