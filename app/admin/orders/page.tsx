export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';
// Ensure this import matches your actual filename (DashboardShell or AdminDashboard)
import { DashboardShell } from '../../components/DashboardShell'; 

// Mock Data
const ORDERS = [
  { id: '1', clientName: 'TEST ORDER', pattern: 'Test', dimensions: '10x10', dueDate: 'Now', status: 'New', battingLength: 10, img: '' }
];

export default function Page() {
  return (
    <div className="border-4 border-blue-500 p-4">
      <h1 className="text-xl font-bold mb-4">DEBUG: PAGE IS LOADED</h1>
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <DashboardShell initialOrders={ORDERS} />
      </Suspense>
    </div>
  );
}