import { PublicNavbar } from "../app/components/PublicNavbar"; 
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light/30 font-sans text-brand-purple selection:bg-brand-teal selection:text-white">
      
      {/* 1. Navigation */}
      <PublicNavbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-brand-teal/20">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest">Now Accepting New Quilts</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-purple mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              Give your quilt the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple italic pr-2">
                finish it deserves.
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-purple/60 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Professional longarm quilting services by Danica. 
              Turn your tops into treasured heirlooms with precision edge-to-edge designs and a touch of magic.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Link 
                href="/order/new"
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-white font-bold rounded-xl shadow-xl shadow-brand-gold/20 hover:scale-105 hover:bg-[#b89a3e] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Get an Estimate</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link 
                href="/gallery"
                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-purple border border-brand-purple/10 font-bold rounded-xl hover:bg-brand-purple/5 transition-colors flex items-center justify-center gap-2"
              >
                <span>Browse Patterns</span>
              </Link>
            </div>

          </div>

          {/* Background Blobs (Decoration) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
             <div className="absolute top-20 left-10 md:left-1/4 w-72 h-72 bg-brand-teal/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
             <div className="absolute top-20 right-10 md:right-1/4 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700"></div>
             <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-brand-gold/20 rounded-full blur-[100px] mix-blend-multiply"></div>
          </div>
        </section>

        {/* --- VALUE PROPS --- */}
        <section className="py-24 bg-white border-y border-brand-purple/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">straighten</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Precision Stitching</h3>
                <p className="text-brand-purple/60 leading-relaxed">
                  Computer-guided accuracy ensures every swirl, loop, and point is perfectly placed on your masterpiece.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-teal group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">avg_pace</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Fast Turnaround</h3>
                <p className="text-brand-purple/60 leading-relaxed">
                  We know you're excited. Our streamlined process gets your quilt back in your arms faster than the competition.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">palette</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Curated Thread</h3>
                <p className="text-brand-purple/60 leading-relaxed">
                  Choose from our premium Glide thread collection to find the perfect sheen and color match for your fabric.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* --- SIMPLE FOOTER --- */}
        <footer className="bg-brand-purple text-white py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
             <div className="flex justify-center items-center gap-2 opacity-50 mb-4">
                <span className="material-symbols-outlined">diamond</span>
                <span className="text-sm tracking-widest uppercase">It Had To Be Sew</span>
             </div>
             <p className="opacity-40 text-sm">
               © {new Date().getFullYear()} Danica L. | Las Vegas, NV
             </p>
          </div>
        </footer>

      </main>
    </div>
  );
}