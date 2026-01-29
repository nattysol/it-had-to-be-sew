import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 👇 A blank canvas. The DashboardShell handles the sidebar now.
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {children}
    </div>
  );
}