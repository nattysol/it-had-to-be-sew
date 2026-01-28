'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion' // <--- Added Variants

export default function ServicesPage() {
  
  // --- FIX: Added ': Variants' ---
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  }

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] min-h-screen font-display text-[#0e1b12] dark:text-white pb-32">
      
      {/* --- TOP NAV --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 flex items-center bg-[#f6f7f8]/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-black/5"
      >
        <Link href="/" className="flex size-12 shrink-0 items-center justify-center hover:bg-black/5 rounded-full transition active:scale-95">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-12">Services</h2>
      </motion.div>

      {/* --- HEADER --- */}
      <div className="px-6 pt-8 pb-4">
        <motion.h1 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="tracking-tight text-[32px] font-bold leading-tight"
        >
          It Had To Be Sew
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="text-[#4f6b57] font-serif italic text-lg leading-relaxed pt-3"
        >
            Utility-focused, precision quilting services designed with a quiet, refined touch.
        </motion.p>
      </div>

      {/* --- SERVICE CARDS --- */}
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 p-4">
        
        {/* 1. Long-Arm */}
        <motion.div variants={item} className="group relative flex flex-col rounded-[32px] bg-white shadow-sm overflow-hidden border border-black/5 active:scale-[0.99] transition-transform duration-300">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1634225252824-332309f44865?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Long-Arm Quilting</h3>
              <span className="material-symbols-outlined text-[#9d7de8]">architecture</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">Precision and custom patterns for a flawless finish.</p>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Starts at</span>
                <span className="font-bold text-lg">$0.02 / sq inch</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-[#9d7de8] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#9d7de8]/20 hover:bg-[#8b6bd9] active:scale-95 transition-all">
                    Inquire Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 2. Trimming */}
        <motion.div variants={item} className="group relative flex flex-col rounded-[32px] bg-white shadow-sm overflow-hidden border border-black/5 active:scale-[0.99] transition-transform duration-300">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1598465037326-06e92787c8d7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Quilt Trimming</h3>
              <span className="material-symbols-outlined text-[#9d7de8]">content_cut</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">The essential squaring-up process for perfect edges.</p>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Standard rate</span>
                <span className="font-bold text-lg">$15.00 flat fee</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-[#9d7de8] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#9d7de8]/20 hover:bg-[#8b6bd9] active:scale-95 transition-all">
                    Add Service
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 3. Binding */}
        <motion.div variants={item} className="group relative flex flex-col rounded-[32px] bg-white shadow-sm overflow-hidden border border-black/5 active:scale-[0.99] transition-transform duration-300">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Binding</h3>
              <span className="material-symbols-outlined text-[#9d7de8]">auto_fix_high</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">Durable and aesthetic machine-finished edge work.</p>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Per Linear Inch</span>
                <span className="font-bold text-lg">$0.12 / inch</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-[#9d7de8] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#9d7de8]/20 hover:bg-[#8b6bd9] active:scale-95 transition-all">
                    Book Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* --- BOTTOM NAV --- */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-black/5 flex items-center justify-around px-6 pb-2 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        {/* Active Item */}
        <div className="flex flex-col items-center gap-1 text-[#9d7de8] p-2 rounded-xl bg-[#9d7de8]/10 w-16 relative">
          <div className="absolute -top-1 w-1 h-1 bg-[#9d7de8] rounded-full"></div>
          <span className="material-symbols-outlined text-[26px]">dry_cleaning</span>
          <span className="text-[10px] font-bold">Services</span>
        </div>

        <Link href="/wizard" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">calendar_today</span>
          <span className="text-[10px] font-bold">Booking</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">person</span>
          <span className="text-[10px] font-bold">Contact</span>
        </Link>
      </div>

    </div>
  )
}