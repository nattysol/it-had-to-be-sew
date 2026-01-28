import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-[#0e1b12] dark:text-white pb-24">
      
      {/* --- TOP NAV --- */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5">
        <Link href="/" className="flex size-12 shrink-0 items-center justify-center hover:bg-black/5 rounded-full transition">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Services</h2>
      </div>

      {/* --- HERO HEADER --- */}
      <div className="px-6 pt-8 pb-4">
        <h1 className="tracking-tight text-[32px] font-bold leading-tight">It Had To Be Sew</h1>
        <p className="text-[#4f6b57] dark:text-[#a0b8a7] font-serif italic text-lg leading-relaxed pt-3">
            Utility-focused, precision quilting services designed with a quiet, refined touch.
        </p>
      </div>

      {/* --- SERVICE CARDS --- */}
      <div className="flex flex-col gap-6 p-4">
        
        {/* 1. Long-Arm Quilting */}
        <div className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#1a2e20] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-black/5 transition-transform active:scale-[0.99]">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1634225252824-332309f44865?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Long arm quilting" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Long-Arm Quilting</h3>
              <span className="material-symbols-outlined text-primary">architecture</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">
                Precision and custom patterns for a flawless finish. Computerized and hand-guided work to bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Precision-guided</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Custom Patterns</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Starts at</span>
                <span className="font-bold text-lg">$0.02 / sq inch</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-primary text-[#0e1b12] text-sm font-bold rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-sm">
                    Inquire Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Quilt Trimming */}
        <div className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#1a2e20] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-black/5 transition-transform active:scale-[0.99]">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1598465037326-06e92787c8d7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Scissors cutting fabric" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Quilt Trimming</h3>
              <span className="material-symbols-outlined text-primary">content_cut</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">
                The essential squaring-up process. We ensure your quilt is perfectly rectangular and ready for binding.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Expert Squaring</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Clean Edges</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Standard rate</span>
                <span className="font-bold text-lg">$15.00 flat fee</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-primary text-[#0e1b12] text-sm font-bold rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-sm">
                    Add Service
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Binding */}
        <div className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#1a2e20] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-black/5 transition-transform active:scale-[0.99]">
          <div className="w-full aspect-[16/9] bg-gray-200 relative">
             <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Quilt binding" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight">Professional Binding</h3>
              <span className="material-symbols-outlined text-primary">auto_fix_high</span>
            </div>
            <p className="text-[#4f6b57] font-serif text-base leading-relaxed">
                Durable and aesthetic machine-finished edge work. Choose from our curated threads for the perfect finish.
            </p>
            <div className="flex flex-wrap gap-2 py-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Machine-Finished</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#4f6b57] font-bold">Per Linear Inch</span>
                <span className="font-bold text-lg">$0.12 / inch</span>
              </div>
              <Link href="/wizard">
                <button className="h-11 px-6 bg-primary text-[#0e1b12] text-sm font-bold rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-sm">
                    Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Info Box */}
        <div className="p-6 mt-4 rounded-2xl bg-primary/5 border-dashed border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">info</span>
                <h3 className="font-bold">Our Process</h3>
            </div>
            <p className="text-sm text-[#4f6b57] font-serif leading-relaxed">
                Current turnaround time is 2-3 weeks. All quilts are treated with expert care in a smoke-free, pet-free studio.
            </p>
        </div>

      </div>

      {/* --- BOTTOM NAV --- */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-black/5 flex items-center justify-around px-8 pb-4 z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#4f6b57]">
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-[24px]">dry_cleaning</span>
          <span className="text-[10px] font-bold">Services</span>
        </div>
        <Link href="/wizard" className="flex flex-col items-center gap-1 text-[#4f6b57]">
          <span className="material-symbols-outlined text-[24px]">calendar_today</span>
          <span className="text-[10px] font-bold">Booking</span>
        </Link>
        <div className="flex flex-col items-center gap-1 text-[#4f6b57] opacity-50">
          <span className="material-symbols-outlined text-[24px]">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </div>

    </div>
  )
}