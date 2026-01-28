"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: 'grid_view', href: '/admin/orders' },
  { name: 'Inventory', icon: 'inventory_2', href: '/admin/inventory' },
  { name: 'Customers', icon: 'group', href: '/admin/customers' }, // Future placeholder
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-purple text-white flex flex-col h-screen sticky top-0 border-r border-white/10 shadow-2xl z-50">
      
      {/* BRAND HEADER */}
      <div className="p-6 flex flex-col items-center justify-center border-b border-white/10 bg-[#2a1144]">
        {/* 👇 Added bg-white and rounded-xl to make the logo visible */}
        <div className="relative w-full h-24 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center">
          <Image 
            src="/logo.png" 
            alt="It Had To Be Sew" 
            fill 
            className="object-contain p-1"
            priority
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
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
          <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-xs font-bold">
            DL
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold">Danica L.</span>
            <span className="text-[10px] uppercase tracking-widest">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};