'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, Variants } from 'framer-motion'
import heroImage from './assets/home-hero.webp'
import servicesImage from './assets/home-services.webp'

export default function Home() {
  const pathname = usePathname()
  
  // Animation Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40 } }
  }

  const imageReveal: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32 bg-[#f6f6f8] dark:bg-[#161220] font-display text-[#0e1b12] dark:text-white transition-colors duration-300">
      
      {/* --- HEADER (Responsive) --- */}
      <header className="sticky top-0 z-50 bg-[#f6f6f8]/80 dark:bg-[#161220]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button className="md:hidden flex size-10 items-center justify-center rounded-full bg-white dark:bg-[#1a2e20] shadow-sm text-[#0e1b12] dark:text-white">
                    <span className="material-symbols-outlined text-xl">menu</span>
                </button>
                <span className="font-bold text-lg font-serif italic">It Had To Be Sew</span>
            </div>

            {/* Desktop Nav Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8">
                <span className="text-[#9d7de8] font-bold text-sm tracking-wide cursor-pointer">HOME</span>
                <Link href="/services" className="text-[#4f6b57] dark:text-[#a0b8a7] font-medium text-sm hover:text-[#9d7de8] transition-colors">SERVICES</Link>
                <Link href="/contact" className="text-[#4f6b57] dark:text-[#a0b8a7] font-medium text-sm hover:text-[#9d7de8] transition-colors">CONTACT</Link>
                <Link href="/wizard">
                    <button className="bg-[#9d7de8] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:brightness-105 transition-all active:scale-95">START PROJECT</button>
                </Link>
            </div>
            
            {/* Mobile Search (Hidden on Desktop) */}
            <button className="md:hidden flex size-10 items-center justify-center rounded-full bg-white dark:bg-[#1a2e20] shadow-sm text-[#0e1b12] dark:text-white">
                <span className="material-symbols-outlined text-xl">search</span>
            </button>
        </div>
      </header>

      <motion.main variants={container} initial="hidden" animate="show" className="px-6 flex flex-col gap-8 pt-4 max-w-7xl mx-auto w-full">

        {/* --- HERO SECTION --- */}
        <section className="flex flex-col md:flex-row gap-8 items-center md:py-12">
          <div className="space-y-4 flex-1">
            <motion.h1 variants={item} className="font-display font-extrabold text-[42px] md:text-6xl leading-[1.0] tracking-tight">
              Precision Quilting.<br/>
              <span className="text-[#9d7de8] italic font-serif font-normal text-5xl md:text-7xl">Human Touch.</span>
            </motion.h1>
            <motion.p variants={item} className="text-lg leading-relaxed text-[#4f6b57] dark:text-[#a0b8a7] max-w-[320px] font-serif">
              Elevate your handiwork with professional long-arm finishes.
            </motion.p>
          </div>
          
          {/* Hero Image */}
          <motion.div variants={imageReveal} className="relative w-full flex-1 max-w-md">
            <div className="relative w-full aspect-square bg-gray-200 rounded-[32px] shadow-2xl shadow-[#9d7de8]/10 overflow-hidden">
               <img 
                 src={heroImage.src} 
                 alt="Quilt Texture" 
                 className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[32px]"></div>
            </div>
            {/* Floating Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-2 w-24 h-24 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/40 flex items-center justify-center shadow-lg"
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative flex flex-col gap-4 p-5 bg-white dark:bg-[#1a2e20] rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden">
                  <img src={heroImage.src} className="w-full h-full object-cover"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-lg">Custom Quilting</h3>
                  <p className="text-[#4f6b57] dark:text-[#a0b8a7] text-sm font-serif italic">Intricate, one-of-a-kind stitch patterns</p>
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
            <div className="absolute left-[1.15rem] top-2 bottom-4 w-[1px] bg-[#4f6b57]/20"></div>
            
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
                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-bold text-sm transition-colors ${step.active ? 'bg-[#9d7de8] text-white' : 'bg-white dark:bg-[#1a2e20] border border-[#4f6b57]/20 text-[#4f6b57]'}`}>
                  {step.id}
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-none">{step.title}</h4>
                  <p className="text-sm text-[#4f6b57] dark:text-[#a0b8a7] font-serif leading-relaxed mt-1">{step.desc}</p>
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
            <button className="flex w-full items-center justify-between overflow-hidden rounded-2xl h-16 pl-8 pr-3 bg-[#0e1b12] dark:bg-white text-white dark:text-[#0e1b12] shadow-2xl active:scale-[0.98] transition-all group">
              <span className="font-bold tracking-tight text-base">Start New Project</span>
              <div className="bg-white/10 dark:bg-black/10 size-11 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined">straighten</span>
              </div>
            </button>
        </Link>
      </motion.div>

      {/* --- BOTTOM NAV (Shared - Mobile Only) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#f6f6f8]/95 dark:bg-[#161220]/95 backdrop-blur-md flex items-center justify-around px-8 border-t border-black/5 dark:border-white/5 z-[60]">
        <Link href="/" className={`flex flex-col items-center gap-0.5 ${pathname === '/' ? 'text-[#9d7de8]' : 'text-[#4f6b57] dark:text-[#a0b8a7]'}`}>
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/services" className={`flex flex-col items-center gap-0.5 ${pathname === '/services' ? 'text-[#9d7de8]' : 'text-[#4f6b57] dark:text-[#a0b8a7]'}`}>
            <span className="material-symbols-outlined text-[24px]">dry_cleaning</span>
            <span className="text-[10px] font-medium">Services</span>
        </Link>
        <Link href="/wizard" className={`flex flex-col items-center gap-0.5 ${pathname === '/wizard' ? 'text-[#9d7de8]' : 'text-[#4f6b57] dark:text-[#a0b8a7]'}`}>
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            <span className="text-[10px] font-medium">Booking</span>
        </Link>
        <Link href="/contact" className={`flex flex-col items-center gap-0.5 ${pathname === '/contact' ? 'text-[#9d7de8]' : 'text-[#4f6b57] dark:text-[#a0b8a7]'}`}>
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

    </div>
  )
}