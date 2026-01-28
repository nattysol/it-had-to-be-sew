import { client } from "../../../sanity/lib/client";
import OrderDashboard, { Order } from "./OrderDashboard";

// 1. FETCH EVERYTHING (Active + Completed)
const allOrdersQuery = `
  *[_type == "order"] | order(orderDate asc) {
    "id": _id,
    "clientName": customer.firstName + " " + customer.lastName,
    "pattern": pattern->title, 
    "dimensions": dimensions.width + ' " x ' + dimensions.height + ' "',
    "dueDate": orderDate,
    status,
    "totalPrice": totalPrice, 
    
    // Captured Data from History
    "actualTimeSeconds": actualTimeSeconds,
    "efficiencyMetrics": efficiencyMetrics,

    "battingLength": dimensions.height + 8, 
    "img": pattern->image.asset->url,
    "materialsAvailable": true,
    "lowStock": false
  }
`;

export default async function OrdersPage() {
  // 2. GET DATA
  const orders = await client.fetch<Order[]>(allOrdersQuery, {}, { next: { revalidate: 0 } });

  // 3. SEPARATE INTO TWO LISTS
  // Active = Ready, Processing, In Progress, New
  const activeOrders = orders.filter(o => 
    ['ready', 'processing', 'inProgress', 'new'].includes(o.status.toLowerCase())
  );
  
  // Completed = Completed
  const completedOrders = orders.filter(o => 
    o.status.toLowerCase() === 'completed'
  );

  // 4. PASS BOTH LISTS TO DASHBOARD
  return (
    <OrderDashboard 
      activeOrders={activeOrders} 
      completedOrders={completedOrders} 
    />
  );
}