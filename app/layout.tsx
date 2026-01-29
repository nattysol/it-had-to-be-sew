import { Sidebar } from "../app/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {/* 1. Sidebar (Fixed on Desktop, Hidden Drawer on Mobile) */}
      <Sidebar />
      
      {/* 2. Main Content */}
      <main className="flex-1 h-screen overflow-y-auto w-full pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}