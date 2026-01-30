import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f7fa] text-[#131118] font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#652bee] text-3xl">local_florist</span>
            <span className="font-serif text-xl font-bold tracking-tight">It Had To Be Sew</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
            <Link href="/" className="text-[#652bee]">Home</Link>
            <Link href="#services" className="hover:text-slate-900 transition-colors">Services</Link>
            <Link href="#gallery" className="hover:text-slate-900 transition-colors">Gallery</Link>
            <Link href="/admin/queue" className="hover:text-slate-900 transition-colors">Admin Login</Link>
          </div>
          <button className="bg-[#131118] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#652bee] transition-colors shadow-lg">
            Book a Quilt
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-[#652bee] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-sm">verified</span>
              Now Accepting New Clients
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-slate-900">
              Modern quilting for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#652bee] to-pink-500">
                timeless memories.
              </span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
              We turn your quilt tops into finished masterpieces. Professional longarm quilting, binding, and finishing services in Las Vegas.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#652bee] text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-[#652bee]/20 hover:bg-[#5423c9] transition-transform hover:-translate-y-1">
                Start Your Project
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                View Pricing
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="relative z-10 w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
               <Image 
                 src="https://images.unsplash.com/photo-1574635671569-42b4737d2f9d?q=80&w=1200" 
                 alt="Quilting Machine" 
                 fill 
                 className="object-cover" 
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
               <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Latest Work</p>
                  <p className="font-serif text-2xl">Double Wedding Ring</p>
               </div>
            </div>
            {/* Decorative Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-200/50 to-pink-200/50 blur-3xl -z-10 rounded-full" />
          </div>
        </div>
      </header>

      {/* 3. THE SERVICE BAR (This is what you asked for!) */}
      <section id="services" className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">From simple edge-to-edge patterns to complex custom designs, we provide a full range of finishing services.</p>
          </div>

          {/* 👇 THE 4-COLUMN GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: E2E */}
            <ServiceCard 
              icon="all_inclusive" 
              title="Edge-to-Edge" 
              desc="Beautiful, continuous patterns stitched across your entire quilt top."
              price="2.5¢ / sq inch"
            />
            
            {/* Card 2: Custom */}
            <ServiceCard 
              icon="draw" 
              title="Custom Quilting" 
              desc="Intricate, block-specific designs that highlight your unique piecing."
              price="5¢ / sq inch"
              highlight
            />

            {/* Card 3: Binding (New!) */}
            <ServiceCard 
              icon="straighten" 
              title="Binding Services" 
              desc="Professional machine or hand binding for that perfect finished edge."
              price="from $0.25 / inch"
            />

            {/* Card 4: Batting/Prep (New!) */}
            <ServiceCard 
              icon="layers" 
              title="Batting & Prep" 
              desc="High-quality batting supply and backing preparation services."
              price="Varies by type"
            />

          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-[#131118] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 opacity-80">
            <span className="material-symbols-outlined text-[#652bee]">local_florist</span>
            <span className="font-serif font-bold">It Had To Be Sew</span>
           </div>
           <p className="text-sm text-slate-500">© 2026 It Had To Be Sew. All rights reserved.</p>
           <div className="flex gap-6">
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">Facebook</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for the Service Cards to keep code clean
const ServiceCard = ({ icon, title, desc, price, highlight }: any) => (
  <div className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col items-start h-full
    ${highlight 
      ? 'bg-[#652bee] text-white border-[#652bee] shadow-lg shadow-[#652bee]/20' 
      : 'bg-white text-slate-800 border-slate-100 hover:border-slate-200'
    }
  `}>
    <div className={`size-12 rounded-xl flex items-center justify-center mb-6 text-2xl
      ${highlight ? 'bg-white/10 text-white' : 'bg-purple-50 text-[#652bee]'}
    `}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <h3 className="font-bold font-serif text-xl mb-3">{title}</h3>
    <p className={`text-sm mb-6 leading-relaxed flex-1 ${highlight ? 'text-white/80' : 'text-slate-500'}`}>
      {desc}
    </p>
    <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded
       ${highlight ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}
    `}>
      {price}
    </div>
  </div>
);