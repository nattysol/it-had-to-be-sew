import { Sidebar } from "../../components/Sidebar"; // Adjust path if needed

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. REMOVED "flex". Added "relative" for safety.
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022] relative font-sans">
      
      {/* 2. Sidebar is now Fixed/Absolute. It floats above the page. */}
      <Sidebar />
      
      {/* 3. Main Content - Pushed over/down using padding/margin */}
      {/* pt-16    -> Mobile: Pushes content down 64px so Header doesn't cover it
          md:pt-0  -> Desktop: Removes top padding (no header)
          md:pl-64 -> Desktop: Pushes content right 256px so Sidebar doesn't cover it
      */}
      <main className="pt-16 md:pt-0 md:pl-64 min-h-screen transition-all duration-300">
        <div className="h-full w-full">
           {children}
        </div>
      </main>
    </div>
  );
}