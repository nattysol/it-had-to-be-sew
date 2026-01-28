import { client } from "@/sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. THE PRODUCTION QUERY
// We map the Nested Sanity fields to the Flat Dashboard fields
const activeOrdersQuery = `
  *[_type == "order" && status in ["ready", "processing", "inProgress", "new"]] | order(orderDate asc) {
    "id": _id,
    
    // Concatenate First + Last Name
    "clientName": customer.firstName + " " + customer.lastName,
    
    // Dereference the Pattern Title
    "pattern": pattern->title, 
    
    // Construct the Dimensions String (e.g. '30" x 50"')
    "dimensions": dimensions.width + "\\" x " + dimensions.height + "\\"",
    
    // Map Order Date to Due Date
    "dueDate": orderDate,
    
    status,
    
    // Calculate Batting (Height + 8 inches)
    "battingLength": dimensions.height + 8, 
    
    // Get Image URL from the referenced Pattern
    "img": pattern->image.asset->url,
    
    // Default values (Since these aren't in your schema yet)
    "materialsAvailable": true,
    "lowStock": false
  }
`;

// 2. THE COMPONENT
export default async function ActiveOrdersPage() {
  // 3. FETCH DATA
  const orders = await client.fetch<Order[]>(activeOrdersQuery, {}, { next: { revalidate: 0 } });

  // 4. RENDER DASHBOARD
  return <OrderDashboard initialOrders={orders} />;
}