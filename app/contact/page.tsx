import { createClient } from 'next-sanity'
import Link from 'next/link'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export default async function ContactPage() {
  // Fetch FAQs sorted by the 'order' field
  const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`)

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] min-h-screen font-display text-[#0e141b] dark:text-white pb-12">
      
      {/* --- NAV --- */}
      <div className="flex items-center bg-[#f6f7f8] dark:bg-[#111921] p-4 pb-2 justify-between sticky top-0 z-10">
        <Link href="/" className="flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-12">Contact & FAQs</h2>
      </div>

      <main className="max-w-md mx-auto px-4">
        
        {/* --- HERO --- */}
        <div className="pt-6 pb-2">
          <h3 className="tracking-tight text-3xl font-bold leading-tight">Let's bring your quilt to life</h3>
        </div>
        <div className="pb-6">
          <p className="text-[#507395] dark:text-gray-400 text-lg font-serif leading-relaxed italic">
            Tell us about your project and we'll get back to you soon.
          </p>
        </div>

        {/* --- FORM --- */}
        <section className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2">Your Name</label>
            <input className="w-full h-14 rounded-full border-none bg-[#edf1f4] dark:bg-[#1c2631] px-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken outline-none" placeholder="Full name" type="text"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2">Email Address</label>
            <input className="w-full h-14 rounded-full border-none bg-[#edf1f4] dark:bg-[#1c2631] px-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken outline-none" placeholder="email@example.com" type="email"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold px-2">Project Details</label>
            <textarea className="w-full rounded-[24px] border-none bg-[#edf1f4] dark:bg-[#1c2631] p-6 text-base focus:ring-2 focus:ring-[#9d7de8] surface-sunken resize-none outline-none" placeholder="Tell us about the size and style..." rows={4}></textarea>
          </div>
          <button className="w-full h-16 bg-[#9d7de8] text-white font-bold text-lg rounded-full surface-plush mt-4 active:scale-[0.98] transition-all">
            Send Message
          </button>
        </section>

        <div className="h-24"></div>

        {/* --- FAQS (Dynamic from Sanity) --- */}
        <section className="space-y-6">
          <div className="px-2">
            <h4 className="text-2xl font-bold mb-2">Frequently Asked</h4>
            <p className="text-[#507395] dark:text-gray-400 text-sm">Common questions about the process.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.length > 0 ? faqs.map((faq: any) => (
              <details key={faq._id} className="group bg-white dark:bg-[#1c2631] rounded-[24px] surface-raised-card border border-black/5 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <span className="font-bold text-base pr-4">{faq.question}</span>
                  <span className="material-symbols-outlined text-[#9d7de8] chevron">expand_more</span>
                </summary>
                <div className="px-6 pb-6 faq-body">
                  <p className="text-[#507395] dark:text-gray-300 font-serif leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            )) : (
              <div className="text-center p-6 text-gray-400 bg-white rounded-xl border border-dashed">
                No FAQs added in Sanity yet.
              </div>
            )}
          </div>
        </section>

        {/* --- STUDIO INFO --- */}
        <section className="mt-16 mb-8">
          <div className="bg-white dark:bg-[#1c2631] p-8 rounded-[2rem] surface-raised-card border border-black/5">
            <h4 className="text-xl font-bold mb-6">Studio Info</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-[#9d7de8]/10 flex items-center justify-center text-[#9d7de8]">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="text-sm font-bold">The Studio</p>
                  <p className="text-sm text-[#507395] dark:text-gray-400">By Appointment Only<br/>123 Stitch Lane, Quilt City</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-[#9d7de8]/10 flex items-center justify-center text-[#9d7de8]">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Email Us</p>
                  <p className="text-sm text-[#507395] dark:text-gray-400">hello@ithadtobesew.com</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm font-bold mb-3 px-1">Follow our process</p>
                <div className="flex gap-4">
                  <button className="size-10 rounded-full bg-[#f6f7f8] flex items-center justify-center text-[#507395] border border-black/5 hover:scale-110 transition">
                    <span className="material-symbols-outlined text-[18px]">camera_alt</span>
                  </button>
                  <button className="size-10 rounded-full bg-[#f6f7f8] flex items-center justify-center text-[#507395] border border-black/5 hover:scale-110 transition">
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Image (Using Google image from original code as placeholder) */}
        <div className="w-full h-48 rounded-[2rem] overflow-hidden relative mb-8 shadow-inner">
           <img 
             alt="Map location" 
             className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700" 
             src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
           />
           <div className="absolute inset-0 bg-[#9d7de8]/10 pointer-events-none"></div>
        </div>

        <footer className="text-center py-4 pb-8">
          <p className="text-xs text-[#507395] dark:text-gray-500 uppercase tracking-widest font-bold">It Had To Be Sew • 2024</p>
        </footer>
        
      </main>
    </div>
  )
}