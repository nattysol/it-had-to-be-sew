import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Just a clean wrapper
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}