import { Sidebar } from "../components/Sidebar"; // Adjust path if needed

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {/* 1. The Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* 2. The Page Content flows on the right */}
      <main className="flex-1 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}