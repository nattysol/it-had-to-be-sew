// @ts-nocheck
import React from 'react';
import { TestDashboard } from '../components/AdminDashboard'; // 👈 Note: one less "../"

export const metadata = {
  title: 'Public Test',
};

const TEST_ORDERS = [{ id: '1', clientName: 'Public Route Test' }];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100">
      <TestDashboard initialOrders={TEST_ORDERS} />
    </div>
  );
}