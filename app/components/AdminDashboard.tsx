"use client";

import React from 'react';

// Removed explicit types to prevent TypeScript build errors
export const TestDashboard = ({ initialOrders }: { initialOrders: any }) => {
  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center text-white p-10">
      <h1 className="text-6xl font-bold">✅ IT WORKS!</h1>
      <p className="mt-4 text-2xl">
        You are seeing the Test Dashboard on /admin/queue
      </p>
      <div className="mt-8 bg-white text-black p-6 rounded-xl shadow-lg">
         <p className="font-bold font-mono">
           Orders Loaded: {initialOrders?.length || 0}
         </p>
      </div>
    </div>
  );
};