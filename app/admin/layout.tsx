import { Sidebar } from "../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#151022] relative">
      {/* 1. Sidebar is FIXED. It takes up no physical space in the flow. */}
      <Sidebar />
      
      {/* 2. Main Content Wrapper */}
      {/* MOBILE: mt-16 (Push down 4rem/64px so header doesn't cover it)
         DESKTOP: md:ml-64 (Push right 16rem/256px so sidebar doesn't cover it) 
         md:mt-0 (Remove top margin on desktop since there is no top header)
      */}
      <div className="transition-all duration-300 ease-in-out pt-16 md:pt-0 md:pl-64">
        
        {/* Inner container to ensure scrolling works nicely */}
        <main className="min-h-[calc(100vh-4rem)] md:min-h-screen w-full">
          {children}
        </main>
        
      </div>
    </div>
  );
}