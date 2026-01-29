import React from 'react';

// This layout must be "clean" because AdminDashboard handles its own Sidebar/Navigation
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {children}
    </div>
  );
}