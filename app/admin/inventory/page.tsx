import { client } from "../../../sanity/lib/client";
import InventoryDashboard, { InventoryItem } from "./InventoryDashboard";

// 👇 Updated Query to match YOUR Schema
const inventoryQuery = `
  *[_type == "inventoryItem"] | order(name asc) {
    "id": _id,
    name,
    category,       // 'thread', 'batting', 'fabric'
    stockLevel,     // The number
    yardsPerOz,     // For thread calibration
    isPublic,       // Visible to clients?
    "imageUrl": image.asset->url
  }
`;

export default async function InventoryPage() {
  const items = await client.fetch<InventoryItem[]>(inventoryQuery, {}, { next: { revalidate: 0 } });
  
  return <InventoryDashboard initialItems={items} />;
}