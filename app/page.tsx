'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  
  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } }
  }

  const imageReveal = {
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32 bg-background-light dark:bg-background-dark font-display text-zinc-900 dark:text-white">
      
      {/* --- HEADER --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-xl p-4 justify-between"
      >
        <div className="flex items-center gap-3">
          <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm hover:scale-105 transition active:scale-95">
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <h2 className="text-lg font-accent italic tracking-tight text-xl font-bold">It Had To Be Sew</h2>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm hover:scale-105 transition active:scale-95">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
      </motion.header>

      <motion.main variants={container} initial="hidden" animate="show" className="px-6 flex flex-col gap-8 pt-4">

        {/* --- HERO SECTION --- */}
        <section className="flex flex-col gap-6">
          <div className="space-y-4">
            <motion.h1 variants={item} className="font-display font-extrabold text-[42px] leading-[1.0] tracking-tight">
              Precision Quilting.<br/>
              <span className="text-[#9d7de8] italic font-serif font-normal text-5xl">Human Touch.</span>
            </motion.h1>
            <motion.p variants={item} className="text-lg leading-relaxed text-zinc-500 max-w-[320px] font-serif">
              Elevate your handiwork with professional long-arm finishes.
            </motion.p>
          </div>
          
          {/* Hero Image */}
          <motion.div variants={imageReveal} className="relative w-full">
            <div className="relative w-full aspect-square bg-gray-200 rounded-[32px] shadow-2xl shadow-[#9d7de8]/10 overflow-hidden">
               {/* Use your local image or this placeholder */}
               <img 
                 src="https://images.unsplash.com/photo-1588013626219-c4d633c3a447?q=80&w=800&auto=format&fit=crop" 
                 alt="Quilt Texture" 
                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]"></div>
            </div>
            {/* Floating Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-2 w-24 h-24 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-4xl text-[#9d7de8]">texture</span>
            </motion.div>
          </motion.div>
        </section>

        {/* --- SERVICES TEASER --- */}
        <section className="py-8">
          <motion.div variants={item} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Services</h2>
            <Link href="/services" className="text-[#9d7de8] text-sm font-bold flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6">
            <motion.div variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative flex flex-col gap-4 p-5 bg-white rounded-[32px] border border-black/5 shadow-sm">
              <div className="w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1628147879482-629dfc29d0f3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-lg">Custom Quilting</h3>
                  <p className="text-zinc-400 text-sm font-serif italic">Intricate, one-of-a-kind stitch patterns</p>
                </div>
                <span className="material-symbols-outlined text-[#9d7de8] bg-[#9d7de8]/10 p-3 rounded-full">auto_awesome</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- WORKFLOW --- */}
        <section className="py-4 pb-12">
          <motion.h2 variants={item} className="text-2xl font-bold tracking-tight mb-8">The Workflow</motion.h2>
          <div className="space-y-10 relative pl-2">
            <div className="absolute left-[1.15rem] top-2 bottom-4 w-[1px] bg-zinc-200"></div>
            
            {[
              { id: '01', title: 'In-Take', desc: 'Drop off or mail your prepped quilt top.', active: false },
              { id: '02', title: 'Design Sync', desc: 'We select the perfect thread and pattern.', active: false },
              { id: '03', title: 'Execution', desc: 'High-precision long-arm quilting.', active: true }
            ].map((step, i) => (
              <motion.div 
                key={step.id} 
                variants={item}
                className="flex gap-6 items-start relative"
              >
                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-bold text-sm transition-colors ${step.active ? 'bg-[#9d7de8] text-white' : 'bg-white border border-zinc-200 text-zinc-500'}`}>
                  {step.id}
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">{step.title}</h4>
                  <p className="text-sm text-zinc-500 font-serif leading-relaxed mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.main>

      {/* --- FAB (Start Project) --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[40] w-[calc(100%-48px)] max-w-sm"
      >
        <Link href="/wizard">
            <button className="flex w-full items-center justify-between overflow-hidden rounded-2xl h-16 pl-8 pr-3 bg-[#161220] text-white shadow-2xl active:scale-[0.98] transition-all hover:bg-black group">
              <span className="font-bold tracking-tight text-base">Start New Project</span>
              <div className="bg-white/10 size-11 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined">straighten</span>
              </div>
            </button>
        </Link>
      </motion.div>

      {/* --- BOTTOM NAV --- */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-black/5 flex items-center justify-around px-6 pb-2 z-50">
        {/* Active Item */}
        <div className="flex flex-col items-center gap-1 text-[#9d7de8] p-2 rounded-xl bg-[#9d7de8]/10 w-16 relative">
          <div className="absolute -top-1 w-1 h-1 bg-[#9d7de8] rounded-full"></div>
          <span className="material-symbols-outlined text-[26px] font-variation-fill">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </div>
        
        <Link href="/services" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">dry_cleaning</span>
          <span className="text-[10px] font-bold">Services</span>
        </Link>
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