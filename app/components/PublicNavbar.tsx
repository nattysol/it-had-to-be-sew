"use client";

import Image from 'next/image';
import Link from 'next/link';

export function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brand-purple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* 1. LOGO (Left) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative w-16 h-16 transition-transform group-hover:scale-105 duration-300">
              <Image 
                src="/logo.png" 
                alt="It Had To Be Sew" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block flex-col">
              <span className="font-serif text-2xl font-bold text-brand-purple leading-none block">
                It Had To Be Sew
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-teal font-bold">
                Custom Longarm Quilting
              </span>
            </div>
          </Link>

          {/* 2. LINKS (Middle - Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-brand-purple/70">
            <Link href="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="hover:text-brand-purple transition-colors">
              Gallery
            </Link>
            <Link href="/pricing" className="hover:text-brand-purple transition-colors">
              Pricing
            </Link>
          </div>

          {/* 3. CTA BUTTON (Right) */}
          <div className="flex items-center gap-4">
             {/* Admin Link (Secret Door for you) */}
            <Link 
              href="/admin/orders"
              className="hidden lg:block text-xs font-bold text-brand-purple/30 hover:text-brand-purple transition-colors uppercase tracking-widest"
            >
              Admin Login
            </Link>

            <Link 
              href="/order/new" // We will build this wizard next!
              className="bg-brand-purple hover:bg-brand-teal text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-purple/20 hover:shadow-brand-teal/30 hover:-translate-y-0.5"
            >
              Start Order
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}