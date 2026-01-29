"use client";

import React from 'react';

// A simple, dependency-free version to test if the "plumbing" works
export const AdminDashboard = ({ initialOrders }: { initialOrders: any[] }) => {
  return (
    <div className="p-10 bg-red-500 text-white min-h-screen">
      <h1 className="text-4xl font-bold">✅ DASHBOARD IS WORKING</h1>
      <p className="mt-4 text-xl">
        If you can see this, the routing is perfect.
      </p>
      <div className="mt-8 bg-white text-black p-4 rounded-xl">
        <p>Orders loaded: {initialOrders?.length || 0}</p>
      </div>
    </div>
  );
};