import React from 'react';

// ✅ The Correct Layout (Empty Shell)
// We remove the Sidebar here because the Dashboard component now handles it.
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