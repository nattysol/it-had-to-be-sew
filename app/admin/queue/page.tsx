import React, { Suspense } from 'react';
import type { Metadata } from 'next'; // 👈 Added this import
// ✅ Importing from the NEW file name to kill the zombie
import { AdminDashboard } from '../../components/RealDashboard'; 

export const dynamic = 'force-dynamic';

// 👇 Added ": Metadata" here to satisfy TypeScript
export const metadata: Metadata = {
  title: 'Admin Queue | It Had To Be Sew',
};

// --- MOCK DATA ---
const ORDERS = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    pattern: 'Double Wedding Ring',
    dimensions: '90" x 108" (King)',
    dueDate: 'Oct 15, 2023',
    status: 'Ready to Start',
    materialsAvailable: true,
    battingLength: 116,
    img: 'https://images.unsplash.com/photo-1598555848889-8d5f30e78f7e?q=80&w=600&auto=format&fit=crop'
  }
];

export default function QueuePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <AdminDashboard initialOrders={ORDERS} />
    </Suspense>
  );
}