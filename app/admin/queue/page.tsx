import React from 'react';
import type { Metadata } from 'next'; // 👈 Added this import
import { TestDashboard } from '../../components/AdminDashboard'; 

export const dynamic = 'force-dynamic';

// 👇 Added ": Metadata" type annotation
export const metadata: Metadata = {
  title: 'Queue Test | It Had To Be Sew',
};

const TEST_ORDERS = [
  { id: '1', clientName: 'Test Order A' },
  { id: '2', clientName: 'Test Order B' }
];

export default function QueuePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <TestDashboard initialOrders={TEST_ORDERS} />
    </div>
  );
}