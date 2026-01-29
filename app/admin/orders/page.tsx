import React from 'react';
import { ActiveOrdersDashboard } from '../../components/ActiveOrdersDashboard';

export const metadata = {
  title: 'Active Orders | It Had To Be Sew',
};

// Mock Data (Replace with Sanity fetch in production)
const ORDERS = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    pattern: 'Double Wedding Ring Pattern',
    dimensions: '90" x 108" (King)',
    dueDate: 'Oct 15, 2023',
    status: 'Ready to Start',
    materialsAvailable: true,
    battingLength: 116,
    img: 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    pattern: 'Modern Log Cabin',
    dimensions: '60" x 60" (Throw)',
    dueDate: 'Oct 22, 2023',
    status: 'In Progress',
    lowStock: true,
    battingLength: 68,
    img: 'https://images.unsplash.com/photo-1524355529124-749e75556214?q=80&w=600&auto=format&fit=crop'
  }
];

export default function Page() {
  return (
    <main className="bg-[#f6f6f8] dark:bg-[#151022] min-h-screen pb-24 font-sans text-[#131118] dark:text-white">
      {/* We pass the data down to the client component. 
        The server handles the fetch; the client handles the click.
      */}
      <ActiveOrdersDashboard initialOrders={ORDERS} />
    </main>
  );
}