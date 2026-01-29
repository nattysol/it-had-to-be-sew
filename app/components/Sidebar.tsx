"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: 'grid_view', href: '/admin/orders' },
  { name: 'Inventory', icon: 'inventory_2', href: '/admin/inventory' },
  { name: 'Customers', icon: 'group', href: '/admin/customers' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Automatically close mobile menu when you click a link (change pages)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#2a1144] z-50 flex items-center justify-between px-4 shadow-md border-b border-white/10">
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsMobileOpen(true)}
             className="text-white p-1 -ml-1"
           >
             <span className="material-symbols-outlined text-3xl">menu</span>
           </button>
           <span className="text-white font-serif font-bold tracking-wide">Admin</span>
        </div>
        {/* Tiny Logo for Mobile */}
        <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center">
             <Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain" />
        </div>
      </div>

      {/* --- MOBILE OVERLAY (Click to close) --- */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden animate-in fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR (Responsive) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-brand-purple text-white shadow-2xl border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen md:shadow-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* BRAND HEADER (Desktop & Mobile Drawer) */}
        <div className="p-6 flex flex-col items-center justify-center border-b border-white/10 bg-[#2a1144]">
          <div className="relative w-full h-24 bg-white rounded-xl shadow-lg p-3 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="It Had To Be Sew" 
              fill 
              className="object-contain p-1"
              priority
            />
          </div>
          {/* Close Button (Mobile Only) */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-brand-teal text-white shadow-lg font-bold' 
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined transition-colors ${isActive ? 'text-white' : 'text-brand-gold'}`}>
                  {item.icon}
                </span>
                <span className="tracking-wide text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-xs font-bold text-white">
              DL
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Danica L.</span>
              <span className="text-[10px] uppercase tracking-widest">Admin</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}