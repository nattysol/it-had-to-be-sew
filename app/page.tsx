import Link from 'next/link'
import heroImage from './assets/home-hero.webp'
import servicesImage from './assets/home-services.webp'
import birdImage from './assets/home-bird.webp'
import heartsImage from './assets/home-hearts.webp'

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/70 backdrop-blur-xl p-4 justify-between">
        <div className="flex items-center gap-3">
          <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-plush-sm hover:scale-105 transition">
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <h2 className="text-lg font-accent italic tracking-tight text-xl">It Had To Be Sew</h2>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-white shadow-plush-sm">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
      </header>

     {/* --- HERO SECTION (Updated for "Above the Fold") --- */}
      <section className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="font-display font-extrabold text-[40px] leading-[1.0] tracking-tight text-[#0d1b19]">
            Precision Quilting.<br/>
            <span className="text-primary italic font-accent font-normal text-5xl">Human Touch.</span>
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 max-w-[320px] font-serif">
            Elevate your handiwork with professional long-arm finishes.
          </p>
        </div>
        
        {/* Hero Image - Now Square & Tighter */}
        <div className="relative w-full">
          {/* Changed aspect-[4/5] to aspect-square to save vertical space */}
          <div className="relative w-[100%] ml-auto aspect-video bg-gray-200 rounded-2xl shadow-plush overflow-hidden">
            <img 
              src={heroImage.src} 
              alt="Quilt Texture" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
          </div>
          
          {/* Adjusted Badge Position */}
          <div className="absolute -bottom-4 -left-2 w-24 h-24 bg-primary/10 backdrop-blur-md rounded-2xl -rotate-12 border border-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary/60">texture</span>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="px-6 py-12 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold tracking-tight">Services</h2>
          <button className="text-primary text-sm font-bold flex items-center gap-1">
            Details <span className="material-symbols-outlined text-sm">north_east</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Main Card */}
          <div className="group relative flex flex-col gap-4 p-5 bg-background-light rounded-3xl border border-black/5">
            <div className="w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden">
                <img src={servicesImage.src} className="w-full h-full object-cover"/>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-display font-bold text-lg">Custom Quilting</h3>
                <p className="text-zinc-500 text-sm font-serif italic">Intricate, one-of-a-kind stitch patterns</p>
              </div>
              <span className="material-symbols-outlined text-primary bg-white p-2 rounded-full">auto_awesome</span>
            </div>
          </div>

          {/* Small Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 p-4 bg-background-light rounded-3xl border border-black/5">
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden">
                 <img src={birdImage.src} className="w-full h-full object-cover"/>
              </div>
              <p className="font-display font-bold text-sm">Edge-to-Edge</p>
            </div>
            <div className="flex flex-col gap-3 p-4 bg-background-light rounded-3xl border border-black/5">
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden">
                <img src={heartsImage.src} className="w-full h-full object-cover"/>
              </div>
              <p className="font-display font-bold text-sm">Basting</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WORKFLOW --- */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-display font-bold tracking-tight mb-8">The Workflow</h2>
        <div className="space-y-10 relative pl-2">
          {/* Vertical Line */}
          <div className="absolute left-[1.15rem] top-2 bottom-4 w-[1px] bg-zinc-200"></div>
          
          {[
            { id: '01', title: 'In-Take', desc: 'Drop off or mail your prepped quilt top and backing.' },
            { id: '02', title: 'Design Sync', desc: 'We select the perfect thread and pattern for your style.' },
            { id: '03', title: 'Execution', desc: 'High-precision long-arm quilting on our Gammill machine.', active: true }
          ].map((item) => (
            <div key={item.id} className="flex gap-6 items-start relative">
              <div className={`size-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm font-display font-bold text-xs ${item.active ? 'bg-primary text-black' : 'bg-white border border-zinc-200'}`}>
                {item.id}
              </div>
              <div>
                <h4 className="font-display font-bold text-base">{item.title}</h4>
                <p className="text-sm text-zinc-500 font-serif leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FLOATING ACTION BUTTON --- */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[40] w-[calc(100%-48px)] max-w-sm">
        <Link href="/wizard">
            <button className="flex w-full items-center justify-between overflow-hidden rounded-2xl h-16 pl-8 pr-3 bg-[#0d1b19] text-white shadow-2xl active:scale-[0.98] transition-all hover:bg-black">
            <span className="font-display font-bold tracking-tight text-base">Start New Project</span>
            <div className="bg-white/10 size-11 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">straighten</span>
            </div>
            </button>
        </Link>
      </div>

      {/* --- BOTTOM NAV --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-black/5 flex items-center justify-around px-8 pb-4 z-50">
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="material-symbols-outlined">grid_view</span>
        </div>
        <div className="size-8"></div> {/* Spacer for FAB */}
        <div className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="material-symbols-outlined">loyalty</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-400">
          <span className="material-symbols-outlined">person</span>
        </div>
      </nav>

    </div>
  )
}