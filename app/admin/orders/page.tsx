import { client } from "../../../sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. DEFINE THE QUERY FIRST (Top of file)
const activeOrdersQuery = `
  *[_type == "order" && status in ["ready", "processing", "inProgress", "new"]] | order(dueDate asc) {
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
// TEMPORARY RAW QUERY
// This grabs the raw document so we can see the real field names
const activeOrdersQuery = `*[_type == "order"]`;

// 2. DEFINE THE COMPONENT SECOND
export default async function ActiveOrdersPage() {
  // 3. USE THE QUERY
  // (We add 'revalidate: 0' so it always fetches fresh data on refresh)
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 0 } });

  // 4. PASS DATA TO DASHBOARD
  return <OrderDashboard initialOrders={orders} />;
}