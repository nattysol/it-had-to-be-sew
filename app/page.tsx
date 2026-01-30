import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f7fa] text-[#131118] font-sans scroll-smooth">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-slate-100 group-hover:border-[#652bee] transition-colors">
              {/* 👇 Ensure you put 'logo.png' in your public folder */}
              <Image 
                src="/logo.png" 
                alt="It Had To Be Sew Logo" 
                fill 
                className="object-cover"
                priority
              /> 
            </div>
            <span className="font-serif text-xl font-bold tracking-tight group-hover:text-[#652bee] transition-colors">
              It Had To Be Sew
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 items-center">
            <Link href="#services" className="hover:text-[#652bee] transition-colors">Services & Pricing</Link>
            <Link href="#gallery" className="hover:text-[#652bee] transition-colors">Gallery</Link>
            <Link href="#contact" className="hover:text-[#652bee] transition-colors">Contact</Link>
            {/* Admin Link (Hidden from general public view usually, but here for your convenience) */}
            <Link href="/admin/queue" className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-400 hover:bg-slate-200">
              Admin
            </Link>
          </div>

          {/* CTA BUTTON */}
          <Link 
            href="#contact"
            className="bg-[#131118] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#652bee] transition-all hover:shadow-lg hover:shadow-[#652bee]/20 transform hover:-translate-y-0.5"
          >
            Book a Quilt
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          {/* TEXT */}
          <div className="flex-1 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#652bee]/10 text-[#652bee] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-[#652bee]/20">
              <span className="material-symbols-outlined text-sm">verified</span>
              Now Accepting New Clients
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-slate-900 tracking-tight">
              Modern quilting for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#652bee] to-pink-500">
                timeless memories.
              </span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
              We turn your quilt tops into finished masterpieces. Professional longarm quilting, binding, and finishing services in Las Vegas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contact"
                className="bg-[#652bee] text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-[#652bee]/20 hover:bg-[#5423c9] transition-all transform hover:-translate-y-1 text-center"
              >
                Start Your Project
              </Link>
              <Link 
                href="#services"
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex-1 relative w-full">
            <div className="relative z-10 w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 group border-4 border-white">
               {/* 👇 REPLACE src below with "/hero.jpg" if you add a local file */}
               <Image 
                 src="/hero.webp" 
                 alt="Longarm Quilting Machine" 
                 fill 
                 className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Featured Project</p>
                  <p className="font-serif text-3xl font-bold">Double Wedding Ring</p>
               </div>
            </div>
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl -z-10 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* 3. SERVICES STRIP */}
      <section id="services" className="bg-white py-24 border-y border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-slate-900">Our Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">From simple edge-to-edge patterns to complex custom designs, we provide a full range of finishing services.</p>
          </div>

          {/* 4-COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              icon="all_inclusive" 
              title="Edge-to-Edge" 
              desc="Beautiful, continuous patterns stitched across your entire quilt top."
              price="2.5¢ / sq inch"
            />
            <ServiceCard 
              icon="draw" 
              title="Custom Quilting" 
              desc="Intricate, block-specific designs that highlight your unique piecing."
              price="5¢ / sq inch"
              highlight
            />
            <ServiceCard 
              icon="straighten" 
              title="Binding Services" 
              desc="Professional machine or hand binding for that perfect finished edge."
              price="from $0.25 / inch"
            />
            <ServiceCard 
              icon="layers" 
              title="Batting & Prep" 
              desc="High-quality batting supply and backing preparation services."
              price="Varies by type"
            />
          </div>
        </div>
      </section>

      {/* 4. CONTACT / INTAKE SECTION (New!) */}
      <section id="contact" className="py-24 px-6 bg-[#f8f7fa] scroll-mt-20">
         <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="text-center mb-10">
               <span className="bg-[#652bee]/10 text-[#652bee] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Get Started</span>
               <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4 mb-2">Ready to quilt?</h2>
               <p className="text-slate-500">Fill out this quick form and we'll be in touch within 24 hours.</p>
            </div>

            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">First Name</label>
                     <input type="text" className="w-full rounded-xl border-slate-200 focus:border-[#652bee] focus:ring-[#652bee] bg-slate-50 p-3 outline-none transition-all" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Last Name</label>
                     <input type="text" className="w-full rounded-xl border-slate-200 focus:border-[#652bee] focus:ring-[#652bee] bg-slate-50 p-3 outline-none transition-all" placeholder="Doe" />
                  </div>
               </div>
               
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full rounded-xl border-slate-200 focus:border-[#652bee] focus:ring-[#652bee] bg-slate-50 p-3 outline-none transition-all" placeholder="jane@example.com" />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tell us about your quilt</label>
                  <textarea className="w-full rounded-xl border-slate-200 focus:border-[#652bee] focus:ring-[#652bee] bg-slate-50 p-3 outline-none transition-all h-32 resize-none" placeholder="Dimensions, pattern style, deadline..." />
               </div>

               <button className="w-full bg-[#131118] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#652bee] transition-all shadow-lg transform active:scale-[0.99]">
                  Send Request
               </button>
            </form>
         </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#131118] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3 opacity-90">
             <div className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#652bee] text-sm">local_florist</span>
             </div>
             <span className="font-serif font-bold text-lg">It Had To Be Sew</span>
           </div>
           <p className="text-sm text-slate-500">© 2026 It Had To Be Sew. All rights reserved.</p>
           <div className="flex gap-6 text-sm font-bold">
              <a href="#" className="text-slate-400 hover:text-[#652bee] transition-colors">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-[#652bee] transition-colors">Facebook</a>
              <a href="#" className="text-slate-400 hover:text-[#652bee] transition-colors">Email</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

// Service Card Component
const ServiceCard = ({ icon, title, desc, price, highlight }: any) => (
  <div className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-start h-full group
    ${highlight 
      ? 'bg-[#652bee] text-white border-[#652bee] shadow-lg shadow-[#652bee]/20' 
      : 'bg-white text-slate-800 border-slate-100 hover:border-[#652bee]/30'
    }
  `}>
    <div className={`size-12 rounded-xl flex items-center justify-center mb-6 text-2xl transition-transform group-hover:scale-110 duration-300
      ${highlight ? 'bg-white/10 text-white' : 'bg-[#652bee]/5 text-[#652bee]'}
    `}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <h3 className="font-bold font-serif text-xl mb-3">{title}</h3>
    <p className={`text-sm mb-6 leading-relaxed flex-1 ${highlight ? 'text-white/80' : 'text-slate-500'}`}>
      {desc}
    </p>
    <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded
       ${highlight ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-[#652bee]/10 group-hover:text-[#652bee] transition-colors'}
    `}>
      {price}
    </div>
  </div>
);