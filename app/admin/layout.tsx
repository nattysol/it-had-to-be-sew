import { Sidebar } from "../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022]">
      {/* 1. The Fixed Sidebar */}
      <Sidebar />
      
      {/* 2. The Main Content Area */}
      {/* md:pl-64 -> Pushes content right on desktop to clear the sidebar
          pt-16    -> Pushes content down on mobile to clear the header
      */}
      <main className="md:pl-64 pt-16 md:pt-0 min-h-screen transition-all duration-300">
        <div className="h-full w-full">
           {children}
        </div>
      </main>
    </div>
  );
}