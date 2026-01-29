import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added border-4 border-red-500 for debugging
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022] border-4 border-red-500">
      <div className="bg-red-500 text-white p-2 text-center font-bold">
        DEBUG: LAYOUT IS LOADED
      </div>
      {children}
    </div>
  );
}