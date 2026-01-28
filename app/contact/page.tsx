'use client'

import { useState, useEffect } from 'react'
import { createClient } from 'next-sanity'
import Link from 'next/link'
import { motion } from 'framer-motion'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export default function ContactPage() {
  const [faqs, setFaqs] = useState<any[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "faq"] | order(order asc)`).then(setFaqs)
  }, [])

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  }

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] min-h-screen font-display text-[#0e141b] dark:text-white pb-32">
      
      {/* --- TOP NAV --- */}
      <div className="flex items-center bg-[#f6f7f8]/90 dark:bg-[#111921]/90 backdrop-blur-md p-4 pb-2 justify-between sticky top-0 z-20 border-b border-transparent transition-all">
        <Link href="/" className="flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors active:scale-95">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-12">Contact & FAQs</h2>
      </div>

      <motion.main 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-md mx-auto px-4"
      >
        
        {/* --- HERO --- */}
        <motion.div variants={item} className="pt-6 pb-2">
          <h3 className="tracking-tight text-3xl font-bold leading-tight">Let's bring your quilt to life</h3>
        </motion.div>
        <motion.div variants={item} className="pb-6">
          <p className="text-[#507395] dark:text-gray-400 text-lg font-serif leading-relaxed italic">
            Tell us about your project and we'll get back to you soon.
          </p>
        </motion.div>

        {/* --- FORM --- */}
        <motion.section variants={item} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2 text-[#0e141b]/80">Your Name</label>
            <input className="w-full h-14 rounded-full border-none bg-[#edf1f4] dark:bg-[#1c2631] px-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken outline-none transition-shadow" placeholder="Full name" type="text"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2 text-[#0e141b]/80">Email Address</label>
            <input className="w-full h-14 rounded-full border-none bg-[#edf1f4] dark:bg-[#1c2631] px-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken outline-none transition-shadow" placeholder="email@example.com" type="email"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2 text-[#0e141b]/80">Project Details</label>
            <textarea className="w-full rounded-[24px] border-none bg-[#edf1f4] dark:bg-[#1c2631] p-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken resize-none outline-none transition-shadow" placeholder="Tell us about the size and style..." rows={4}></textarea>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-[#9d7de8] text-white font-bold text-lg rounded-full surface-plush mt-4 shadow-lg shadow-[#9d7de8]/30 hover:shadow-[#9d7de8]/50 transition-all"
          >
            Send Message
          </motion.button>
        </motion.section>

        <div className="h-16"></div>

        {/* --- FAQS --- */}
        <motion.section variants={item} className="space-y-6">
          <div className="px-2">
            <h4 className="text-2xl font-bold mb-2">Frequently Asked</h4>
            <p className="text-[#507395] dark:text-gray-400 text-sm">Common questions about the process.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.length > 0 ? faqs.map((faq: any) => (
              <motion.details 
                key={faq._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white dark:bg-[#1c2631] rounded-[24px] surface-raised-card border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <span className="font-bold text-base pr-4 leading-tight">{faq.question}</span>
                  <span className="material-symbols-outlined text-[#9d7de8] chevron transition-transform duration-300 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-6 pb-6 faq-body">
                  <p className="text-[#507395] dark:text-gray-300 font-serif leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.details>
            )) : (
              <div className="text-center p-8 text-gray-400 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">quiz</span>
                <p>Loading FAQs...</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* --- STUDIO INFO --- */}
        <motion.section variants={item} className="mt-16 mb-8">
          <div className="bg-white dark:bg-[#1c2631] p-8 rounded-[2rem] surface-raised-card border border-black/5 relative overflow-hidden">
            {/* Subtle purple accent blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#9d7de8]/10 rounded-full blur-2xl pointer-events-none"></div>

            <h4 className="text-xl font-bold mb-6 relative z-10">Studio Info</h4>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-[#9d7de8]/10 flex items-center justify-center text-[#9d7de8] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="text-sm font-bold">The Studio</p>
                  <p className="text-sm text-[#507395] dark:text-gray-400">By Appointment Only<br/>123 Stitch Lane, Quilt City</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-[#9d7de8]/10 flex items-center justify-center text-[#9d7de8] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Email Us</p>
                  <p className="text-sm text-[#507395] dark:text-gray-400">hello@ithadtobesew.com</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 mt-2">
                <p className="text-sm font-bold mb-3 px-1">Follow our process</p>
                <div className="flex gap-4">
                  <button className="size-12 rounded-full bg-[#f6f7f8] dark:bg-black/20 flex items-center justify-center text-[#507395] dark:text-gray-300 border border-black/5 hover:scale-110 hover:bg-white hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-[20px]">camera_alt</span>
                  </button>
                  <button className="size-12 rounded-full bg-[#f6f7f8] dark:bg-black/20 flex items-center justify-center text-[#507395] dark:text-gray-300 border border-black/5 hover:scale-110 hover:bg-white hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Map Image Placeholder */}
        <motion.div variants={item} className="w-full h-48 rounded-[2rem] overflow-hidden relative mb-8 shadow-inner border border-black/5">
           <img 
             alt="Map location" 
             className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
             src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
           />
           <div className="absolute inset-0 bg-[#9d7de8]/10 pointer-events-none mix-blend-overlay"></div>
        </motion.div>

        <footer className="text-center py-4 pb-8">
          <p className="text-xs text-[#507395] dark:text-gray-500 uppercase tracking-widest font-bold opacity-60">It Had To Be Sew • 2024</p>
        </footer>
        
      </motion.main>

      {/* --- BOTTOM NAV (Functional) --- */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-[#111921]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 flex items-center justify-around px-6 z-50 pb-2">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#507395] hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center gap-1 text-[#507395] hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">dry_cleaning</span>
          <span className="text-[10px] font-bold">Services</span>
        </Link>
        <Link href="/wizard" className="flex flex-col items-center gap-1 text-[#507395] hover:text-[#9d7de8] transition-colors p-2 rounded-xl hover:bg-[#9d7de8]/5 w-16">
          <span className="material-symbols-outlined text-[26px]">calendar_today</span>
          <span className="text-[10px] font-bold">Booking</span>
        </Link>
        {/* Active State (Profile/Contact) */}
        <div className="flex flex-col items-center gap-1 text-[#9d7de8] p-2 rounded-xl bg-[#9d7de8]/10 w-16 relative">
          <div className="absolute -top-1 w-1 h-1 bg-[#9d7de8] rounded-full"></div>
          <span className="material-symbols-outlined text-[26px] font-variation-fill">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </div>

    </div>
  )
}