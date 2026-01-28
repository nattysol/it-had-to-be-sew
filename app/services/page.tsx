'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import longarmImage from '../assets/services-longarm.webp'
import trimmingImage from '../assets/services-trimming.webp'
import bindingImage from '../assets/services-binding.webp'

export default function ServicesPage() {
  
  // Animation Variants
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
    <div className="bg-[#f6f6f8] dark:bg-[#161220] min-h-screen font-display text-[#0e1b12] dark:text-white pb-32 transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-[#f6f6f8]/80 dark:bg-[#161220]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 cursor-pointer group hover:opacity-70 transition-opacity">
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back_ios_new</span>
                <span className="font-bold text-lg">Services</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
                <span className="text-[#9d7de8] font-bold text-sm tracking-wide">SERVICES</span>
                <span className="text-[#4f6b57] dark:text-[#a0b8a7] font-medium text-sm hover:text-[#9d7de8] transition-colors cursor-pointer">GALLERY</span>
                <span className="text-[#4f6b57] dark:text-[#a0b8a7] font-medium text-sm hover:text-[#9d7de8] transition-colors cursor-pointer">ABOUT</span>
                <Link href="/wizard">
                    <button className="bg-[#9d7de8] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:brightness-105 transition-all active:scale-95">BOOK NOW</button>
                </Link>
            </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        
        {/* --- HERO --- */}
        <div className="max-w-2xl mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-[#0e1b12] dark:text-white tracking-tight text-4xl md:text-6xl font-bold leading-tight mb-4"
            >
                It Had To Be Sew
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif italic text-xl md:text-2xl leading-relaxed"
            >
                Utility-focused, precision quilting services designed with a quiet, refined touch.
            </motion.p>
        </div>

        {/* --- SERVICE CARDS --- */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-12 md:gap-16">
            
            {/* 1. Long-Arm Quilting */}
            <motion.div variants={item} className="group flex flex-col md:flex-row bg-white dark:bg-[#1a2e20] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-transform duration-300">
                <div className="w-full md:w-[400px] h-[300px] md:h-auto overflow-hidden">
                    <img src={longarmImage.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Long arm quilting" />
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-[#0e1b12] dark:text-white text-3xl font-bold leading-tight mb-2">Long-Arm Quilting</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Precision-guided</span>
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Custom Patterns</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[#9d7de8] text-4xl opacity-20">architecture</span>
                    </div>
                    <p className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif text-lg leading-relaxed mb-8 max-w-xl">
                        Precision and custom patterns for a flawless finish. We offer both computerized and hand-guided work to bring your vision to life with professional-grade tension and stitch regulation.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-black/5 dark:border-white/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] dark:text-[#a0b8a7] font-bold">Base Investment</span>
                            <span className="text-[#0e1b12] dark:text-white text-2xl font-bold">$0.02 / sq inch</span>
                        </div>
                        <Link href="/wizard">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#9d7de8] text-white text-base font-bold transition-all hover:brightness-105 active:scale-95 shadow-md shadow-[#9d7de8]/20">
                                <span>Inquire Now</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* 2. Quilt Trimming (Reversed) */}
            <motion.div variants={item} className="group flex flex-col md:flex-row-reverse bg-white dark:bg-[#1a2e20] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-transform duration-300">
                <div className="w-full md:w-[400px] h-[300px] md:h-auto overflow-hidden">
                    <img src={trimmingImage.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Quilt trimming" />
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-[#0e1b12] dark:text-white text-3xl font-bold leading-tight mb-2">Quilt Trimming</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Expert Squaring</span>
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Clean Edges</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[#9d7de8] text-4xl opacity-20">content_cut</span>
                    </div>
                    <p className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif text-lg leading-relaxed mb-8 max-w-xl">
                        The essential squaring-up process. We ensure your quilt is perfectly rectangular and clean-edged, using rotary precision to prepare your piece for professional binding.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-black/5 dark:border-white/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] dark:text-[#a0b8a7] font-bold">Standard rate</span>
                            <span className="text-[#0e1b12] dark:text-white text-2xl font-bold">$15.00 flat fee</span>
                        </div>
                        <Link href="/wizard">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#9d7de8] text-white text-base font-bold transition-all hover:brightness-105 active:scale-95 shadow-md shadow-[#9d7de8]/20">
                                <span>Add Service</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* 3. Professional Binding */}
            <motion.div variants={item} className="group flex flex-col md:flex-row bg-white dark:bg-[#1a2e20] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-transform duration-300">
                <div className="w-full md:w-[400px] h-[300px] md:h-auto overflow-hidden">
                    <img src={bindingImage.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Quilt binding" />
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-[#0e1b12] dark:text-white text-3xl font-bold leading-tight mb-2">Professional Binding</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Machine-Finished</span>
                                <span className="px-3 py-1 bg-[#9d7de8]/10 text-[#9d7de8] text-[10px] font-bold uppercase tracking-wider rounded-full">Reinforced</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[#9d7de8] text-4xl opacity-20">auto_fix_high</span>
                    </div>
                    <p className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif text-lg leading-relaxed mb-8 max-w-xl">
                        Durable and aesthetic machine-finished edge work. Choose from our curated selection of threads for the perfect final touch that ensures longevity for generations.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-black/5 dark:border-white/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] dark:text-[#a0b8a7] font-bold">Pricing Guide</span>
                            <span className="text-[#0e1b12] dark:text-white text-2xl font-bold">$0.12 / linear inch</span>
                        </div>
                        <Link href="/wizard">
                            <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#9d7de8] text-white text-base font-bold transition-all hover:brightness-105 active:scale-95 shadow-md shadow-[#9d7de8]/20">
                                <span>Book Now</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>

        </motion.div>

        {/* --- QUALITY BOX --- */}
        <div className="mt-20 p-10 rounded-[24px] bg-[#9d7de8]/5 dark:bg-[#9d7de8]/10 border-dashed border-2 border-[#9d7de8]/20 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-[#9d7de8]/10 p-4 rounded-full">
                <span className="material-symbols-outlined text-[#9d7de8] text-3xl">info</span>
            </div>
            <div className="text-center md:text-left">
                <h3 className="font-bold text-xl text-[#0e1b12] dark:text-white mb-2">Our Quality Commitment</h3>
                <p className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif text-lg leading-relaxed">
                    Current turnaround time is 2-3 weeks. All quilts are treated with expert care in a smoke-free, pet-free studio environment. We treat every project like our own heirloom.
                </p>
            </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-[#0e1b12] border-t border-black/5 dark:border-white/5 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#4f6b57] dark:text-[#a0b8a7] text-sm">© 2024 It Had To Be Sew. All rights reserved.</p>
            <div className="flex gap-8">
                <span className="material-symbols-outlined text-[#4f6b57] cursor-pointer hover:text-[#9d7de8] transition-colors">book</span>
                <span className="material-symbols-outlined text-[#4f6b57] cursor-pointer hover:text-[#9d7de8] transition-colors">photo_camera</span>
                <span className="material-symbols-outlined text-[#4f6b57] cursor-pointer hover:text-[#9d7de8] transition-colors">mail</span>
            </div>
        </div>
      </footer>

      {/* --- BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#f6f6f8]/95 dark:bg-[#161220]/95 backdrop-blur-md flex items-center justify-around px-8 border-t border-black/5 dark:border-white/5 z-[60]">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-[#4f6b57] dark:text-[#a0b8a7]">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center gap-0.5 text-[#9d7de8]">
            <span className="material-symbols-outlined text-[24px]">dry_cleaning</span>
            <span className="text-[10px] font-medium">Services</span>
        </Link>
        <Link href="/wizard" className="flex flex-col items-center gap-0.5 text-[#4f6b57] dark:text-[#a0b8a7]">
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            <span className="text-[10px] font-medium">Booking</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-0.5 text-[#4f6b57] dark:text-[#a0b8a7]">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

    </div>
  )
}