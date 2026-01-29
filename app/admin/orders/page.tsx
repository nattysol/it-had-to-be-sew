export const dynamic = 'force-dynamic';

import React from 'react';
// 👇 Named import matching the export above
import { AdminDashboard } from '../../components/AdminDashboard';

export const metadata = {
  title: 'Debug Dashboard',
};

// Simple mock data
const MOCK_ORDERS = [
  { id: '1', clientName: 'Test Order A' },
  { id: '2', clientName: 'Test Order B' }
];

export default function Page() {
  return (
    // No Suspense needed for this simple test
    <AdminDashboard initialOrders={MOCK_ORDERS} />
  );
}