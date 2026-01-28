'use client'
import { useState, useEffect } from 'react'
import { createClient } from 'next-sanity'
import { useOrderStore } from '../../store/useOrderStore'
import { motion, AnimatePresence } from 'framer-motion'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const BATTING_OPTIONS = [
  { id: 'hobbs-80-20', name: 'Hobbs 80/20', price: 0.004, desc: 'The classic choice. Soft & durable.' },
  { id: 'wool', name: 'Tuscany Wool', price: 0.008, desc: 'Extra loft and warmth. Hand-wash only.' },
  { id: 'bamboo', name: 'Bamboo Blend', price: 0.006, desc: 'Silky drape, eco-friendly, antibacterial.' },
]

export default function OrderWizard() {
  const store = useOrderStore()
  const { step, nextStep, prevStep, dimensions, selectedPattern, selectedBatting, services, estimatedTotal } = store
  
  const [patterns, setPatterns] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "pantograph"]{_id, title, category, "imageUrl": image.asset->url}`)
      .then(setPatterns)
      .catch(console.error)
  }, [])

  const submitOrder = async () => {
    console.log("Submit clicked!"); // Debug log
    if (!selectedPattern || !dimensions.width) {
      alert("Please select a pattern and dimensions first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimensions,
          patternId: selectedPattern?._id,
          batting: selectedBatting?.name,
          services,
          total: estimatedTotal
        })
      });
      
      if (response.ok) {
        setOrderComplete(true);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Check your connection.");
    }
    setIsSubmitting(false);
  }

  // --- SUCCESS VIEW ---
  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f8] p-6 text-center font-display">
        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-teal-600">check</span>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Order Received!</h1>
        <p className="text-teal-600 mb-8">We'll start stitching your quilt soon.</p>
        <button onClick={() => window.location.reload()} className="bg-[#9d7de8] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#8b6bd9] transition">Start New Order</button>
      </div>
    )
  }

  return (
    <div className="bg-[#f6f6f8] min-h-screen font-display text-zinc-900 pb-64">
      
      {/* --- TOP BAR --- */}
      <div className="sticky top-0 z-30 bg-[#f6f6f8]/90 backdrop-blur-md pt-4 pb-2">
        <div className="flex items-center justify-between max-w-[480px] mx-auto px-4">
          <button onClick={step > 1 ? prevStep : undefined} className={`flex size-12 items-center justify-center hover:bg-black/5 rounded-full transition ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <span className="material-symbols-outlined text-zinc-900">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold text-zinc-900">
            {step === 1 ? 'Size & Pattern' : step === 2 ? 'Materials' : 'Review'}
          </h2>
          <div className="w-12"></div>
        </div>
        <div className="flex justify-center gap-3 mt-2 pb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-[#9d7de8]' : 'w-2 bg-teal-200'}`} />
          ))}
        </div>
      </div>

      <main className="max-w-[480px] mx-auto px-6 mt-6">
        <AnimatePresence mode='wait'>
          {/* --- STEP 1: PATTERNS --- */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              
              {/* Vibe Input - Fixed Colors */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-zinc-900">Describe your quilt vibe</h3>
                <textarea 
                  className="w-full h-32 p-4 rounded-xl border border-teal-200 bg-white text-zinc-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#9d7de8]/50 resize-none outline-none"
                  placeholder="e.g. modern, floral..."
                ></textarea>
              </div>

              {/* Dimensions - Fixed Colors */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1">
                  <label className="text-xs font-bold text-teal-600 uppercase ml-2">Width</label>
                  <input 
                    type="number" 
                    className="w-full p-3 rounded-xl border border-teal-200 bg-white text-zinc-900 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#9d7de8]"
                    onChange={(e) => store.setDimensions(Number(e.target.value), dimensions.height)} 
                    value={dimensions.width || ''} 
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-teal-600 uppercase ml-2">Height</label>
                  <input 
                    type="number" 
                    className="w-full p-3 rounded-xl border border-teal-200 bg-white text-zinc-900 placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#9d7de8]"
                    onChange={(e) => store.setDimensions(dimensions.width, Number(e.target.value))} 
                    value={dimensions.height || ''} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {patterns.map((p) => (
                  <div key={p._id} onClick={() => store.selectPattern(p)} className={`relative rounded-[24px] overflow-hidden border-2 cursor-pointer transition-all ${selectedPattern?._id === p._id ? 'border-[#9d7de8] ring-2 ring-[#9d7de8]/20' : 'border-transparent hover:border-[#9d7de8]/30'} bg-white shadow-sm`}>
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                      {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-contain mix-blend-multiply opacity-80" />}
                    </div>
                    <div className="p-3"><p className="font-bold text-sm truncate text-zinc-900">{p.title}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- STEP 2: MATERIALS --- */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">Select Batting</h3>
              <div className="space-y-3 mb-8">
                {BATTING_OPTIONS.map((b) => (
                  <div key={b.id} onClick={() => store.selectBatting(b)} className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${selectedBatting?.id === b.id ? 'border-[#9d7de8] bg-[#9d7de8]/5' : 'border-teal-200 bg-white'}`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedBatting?.id === b.id ? 'border-[#9d7de8] bg-[#9d7de8] text-white' : 'border-gray-300'}`}>{selectedBatting?.id === b.id && <span className="material-symbols-outlined text-sm">check</span>}</div>
                    <div>
                      <p className="font-bold text-zinc-900">{b.name}</p>
                      <p className="text-xs text-teal-600">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">Services</h3>
              <div onClick={() => store.toggleService('binding')} className={`p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center ${services.binding ? 'border-[#9d7de8] bg-[#9d7de8]/5' : 'border-teal-200 bg-white'}`}>
                <div><p className="font-bold text-zinc-900">Machine Binding</p><p className="text-xs text-teal-600">We trim and stitch edges.</p></div>
                <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${services.binding ? 'bg-[#9d7de8]' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${services.binding ? 'translate-x-5' : 'translate-x-0'}`} /></div>
              </div>
            </motion.div>
          )}

          {/* --- STEP 3: REVIEW --- */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-teal-200 space-y-4">
                <h3 className="text-xl font-bold border-b border-dashed border-gray-200 pb-4 text-zinc-900">Order Summary</h3>
                <div className="space-y-2 text-zinc-800">
                    <div className="flex justify-between"><span className="text-teal-600">Dimensions</span><span className="font-bold">{dimensions.width}" x {dimensions.height}"</span></div>
                    <div className="flex justify-between"><span className="text-teal-600">Pattern</span><span className="font-bold">{selectedPattern?.title || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-teal-600">Batting</span><span className="font-bold">{selectedBatting?.name || 'None'}</span></div>
                    <div className="flex justify-between"><span className="text-teal-600">Services</span><span className="font-bold">{services.binding ? 'Binding' : '-'}</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- PERSISTENT FLOATING CALCULATOR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6">
        <div className="max-w-[480px] mx-auto bg-white rounded-[24px] shadow-2xl border border-teal-200 overflow-hidden">
          
          {/* Header Bar */}
          <div className="px-5 py-3 border-b border-teal-200 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9d7de8] text-lg">info</span>
              <span className="font-bold text-sm text-zinc-900">Price Explainer</span>
            </div>
            <span className="text-xs text-teal-600 font-medium uppercase tracking-wide">Live Receipt</span>
          </div>

          {/* Dynamic Breakdown Content */}
          <div className="px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-teal-600 truncate max-w-[200px]">
                {selectedPattern?.title || 'Pattern'} ({dimensions.width}"x{dimensions.height}")
              </span>
              <span className="font-medium text-zinc-900 font-mono">
                ${(dimensions.width * dimensions.height * 0.025).toFixed(2)}
              </span>
            </div>
            
            {(selectedBatting || services.binding) && (
                <div className="flex flex-col text-xs text-teal-600 italic pl-3 border-l-2 border-[#9d7de8]/30 gap-1">
                    {selectedBatting && (
                        <div className="flex justify-between">
                            <span>{selectedBatting.name}</span>
                            <span>+${(dimensions.width * dimensions.height * selectedBatting.price).toFixed(2)}</span>
                        </div>
                    )}
                    {services.binding && (
                        <div className="flex justify-between">
                            <span>Binding Service</span>
                            <span>+${((dimensions.width + dimensions.height) * 2 * 0.25).toFixed(2)}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Total Line */}
            <div className="flex justify-between text-sm pt-3 border-t border-teal-200 mt-2">
              <span className="font-bold text-zinc-900 text-lg">Estimated Total</span>
              <span className="font-bold text-[#9d7de8] text-2xl">${estimatedTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="p-4 pt-0">
            {step < 3 ? (
                <button type="button" onClick={nextStep} className="w-full bg-[#9d7de8] hover:bg-[#8b6bd9] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                    {step === 2 ? 'Review Order' : 'Next Step'} 
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            ) : (
                <button 
                  type="button" 
                  onClick={submitOrder} 
                  disabled={isSubmitting} 
                  className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50"
                >
                    {isSubmitting ? 'Processing...' : 'Submit Order'}
                    <span className="material-symbols-outlined">check</span>
                </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}