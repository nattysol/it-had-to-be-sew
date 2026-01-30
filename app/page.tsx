"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7fa] text-[#131118] font-sans scroll-smooth pb-20 md:pb-0">
      
      {/* 1. NAVBAR (Cleaned up) */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-slate-100 group-hover:border-[#652bee] transition-colors">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill 
                className="object-cover"
                priority
              /> 
            </div>
            <span className="font-serif text-xl font-bold tracking-tight group-hover:text-[#652bee] transition-colors">
              It Had To Be Sew
            </span>
          </Link>

          {/* DESKTOP LINKS (Hidden on mobile) */}
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 items-center">
            <Link href="#services" className="hover:text-[#652bee] transition-colors">Services</Link>
            <Link href="#gallery" className="hover:text-[#652bee] transition-colors">Gallery</Link>
            <Link href="#contact" className="hover:text-[#652bee] transition-colors">Contact</Link>
            <Link href="/admin/queue" className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-400 hover:bg-slate-200">
              Admin Login
            </Link>
          </div>
          
          {/* "Book a Quilt" button REMOVED from here per request */}
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
              {/* 👇 STARTS THE WIZARD */}
              <button 
                onClick={() => setIsWizardOpen(true)}
                className="bg-[#652bee] text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-[#652bee]/20 hover:bg-[#5423c9] transition-all transform hover:-translate-y-1 text-center"
              >
                Start Your Project
              </button>
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
               <Image 
                 src="https://images.unsplash.com/photo-1574635671569-42b4737d2f9d?q=80&w=1200" 
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard icon="all_inclusive" title="Edge-to-Edge" desc="Beautiful, continuous patterns stitched across your entire quilt top." price="2.5¢ / sq inch" />
            <ServiceCard icon="draw" title="Custom Quilting" desc="Intricate, block-specific designs that highlight your unique piecing." price="5¢ / sq inch" highlight />
            <ServiceCard icon="straighten" title="Binding Services" desc="Professional machine or hand binding for that perfect finished edge." price="from $0.25 / inch" />
            <ServiceCard icon="layers" title="Batting & Prep" desc="High-quality batting supply and backing preparation services." price="Varies by type" />
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-[#131118] text-white py-12 border-t border-white/10 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3 opacity-90">
             <span className="font-serif font-bold text-lg">It Had To Be Sew</span>
           </div>
           <p className="text-sm text-slate-500">© 2026 It Had To Be Sew. All rights reserved.</p>
        </div>
      </footer>

      {/* 5. MOBILE BOTTOM NAV (Restored!) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-50 md:hidden flex justify-around shadow-lg">
        <a href="#" className="flex flex-col items-center gap-1 text-[#652bee]">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </a>
        <a href="#services" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#652bee]">
          <span className="material-symbols-outlined">design_services</span>
          <span className="text-[10px] font-bold">Services</span>
        </a>
        <button onClick={() => setIsWizardOpen(true)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#652bee]">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-[10px] font-bold">Start</span>
        </button>
        <a href="/admin/queue" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#652bee]">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="text-[10px] font-bold">Admin</span>
        </a>
      </div>

      {/* 6. ORDER WIZARD MODAL */}
      <OrderWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}

// --- SUB COMPONENTS ---

const ServiceCard = ({ icon, title, desc, price, highlight }: any) => (
  <div className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col items-start h-full group
    ${highlight ? 'bg-[#652bee] text-white border-[#652bee] shadow-lg shadow-[#652bee]/20' : 'bg-white text-slate-800 border-slate-100 hover:border-[#652bee]/30'}
  `}>
    <div className={`size-12 rounded-xl flex items-center justify-center mb-6 text-2xl transition-transform group-hover:scale-110 duration-300
      ${highlight ? 'bg-white/10 text-white' : 'bg-[#652bee]/5 text-[#652bee]'}
    `}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <h3 className="font-bold font-serif text-xl mb-3">{title}</h3>
    <p className={`text-sm mb-6 leading-relaxed flex-1 ${highlight ? 'text-white/80' : 'text-slate-500'}`}>{desc}</p>
    <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded ${highlight ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{price}</div>
  </div>
);

// 👇 THE NEW WIZARD COMPONENT
const OrderWizardModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success Step
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#652bee] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-serif">Start Your Project</h2>
            <p className="text-white/80 text-sm">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><span className="material-symbols-outlined">close</span></button>
        </div>

        {/* Body */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">What is your name?</label>
                <input type="text" placeholder="Jane Doe" className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#652bee]" autoFocus />
              </div>
              <div className="space-y-4">
                 <label className="block text-sm font-bold text-slate-700">Email Address</label>
                 <input type="email" placeholder="jane@example.com" className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#652bee]" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#131118] text-white py-4 rounded-xl font-bold hover:bg-[#652bee] transition-colors flex justify-center items-center gap-2">
                Next Step <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Width (in)</label>
                    <input type="number" placeholder="60" className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#652bee]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Height (in)</label>
                    <input type="number" placeholder="80" className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#652bee]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Any specific requests?</label>
                  <textarea placeholder="I'm looking for a modern geometric pattern..." className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-[#652bee] h-24 resize-none"></textarea>
               </div>
               <button disabled={loading} className="w-full bg-[#652bee] text-white py-4 rounded-xl font-bold hover:bg-[#5423c9] transition-colors flex justify-center items-center gap-2">
                 {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Submit Request'}
               </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8 animate-in zoom-in">
               <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="material-symbols-outlined text-4xl">check_circle</span>
               </div>
               <h3 className="text-2xl font-bold font-serif mb-2">Request Received!</h3>
               <p className="text-slate-500 mb-8">We'll review your project and email you a quote within 24 hours.</p>
               <button onClick={onClose} className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};