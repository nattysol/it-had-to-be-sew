export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {/* We removed the Sidebar here because AdminDashboard.tsx handles it now */}
      {children}
    </div>
  );
}