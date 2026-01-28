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

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function OrderWizard() {
  const store = useOrderStore()
  const { 
    step, nextStep, prevStep, estimatedTotal,
    dimensions, setDimensions, backing, setBacking,
    selectedPattern, selectPattern, designDetails, updateDesign,
    selectedBatting, selectBatting,
    trimming, updateTrimming,
    binding, updateBinding,
    customer, updateCustomer, consent, updateConsent
  } = store
  
  const [patterns, setPatterns] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "pantograph"]{_id, title, category, "imageUrl": image.asset->url}`).then(setPatterns)
  }, [])

  const submitOrder = async () => {
    if (!customer.firstName || !customer.email) { alert("Please fill in your contact info."); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        body: JSON.stringify(store)
      });
      if (response.ok) setOrderComplete(true);
    } catch (error) { alert("Something went wrong."); }
    setIsSubmitting(false);
  }

  if (orderComplete) return <SuccessView />

  // Styles
  const inputClass = "w-full p-3 rounded-xl border border-teal-200 bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-[#9d7de8] placeholder:text-gray-400";
  const labelClass = "text-xs font-bold text-teal-600 uppercase ml-2 mb-1 block";
  const sectionTitle = "text-xl font-bold text-zinc-900 mb-4 mt-6 first:mt-0";

  return (
    <div className="bg-[#f6f6f8] min-h-screen font-display text-zinc-900 pb-64">
      
      {/* --- TOP BAR --- */}
      <div className="sticky top-0 z-30 bg-[#f6f6f8]/90 backdrop-blur-md pt-4 pb-2">
        <div className="flex items-center justify-between max-w-[480px] mx-auto px-4">
          <button onClick={step > 1 ? prevStep : undefined} className={`flex size-12 items-center justify-center hover:bg-black/5 rounded-full transition ${step === 1 ? 'opacity-0' : ''}`}>
            <span className="material-symbols-outlined text-zinc-900">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold text-zinc-900">
             {step === 1 ? 'Design' : step === 2 ? 'Materials' : step === 3 ? 'Finish' : 'Contact'}
          </h2>
          <div className="w-12"></div>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'w-8 bg-[#9d7de8]' : 'w-2 bg-teal-200'}`} />
          ))}
        </div>
      </div>

      <main className="max-w-[480px] mx-auto px-6 mt-6">
        <AnimatePresence mode='wait'>
          
          {/* STEP 1: DESIGN & SIZE */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h3 className={sectionTitle}>1. Quilt Dimensions</h3>
              <div className="flex gap-4 mb-6">
                <div className="flex-1"><label className={labelClass}>Width</label><input type="number" className={inputClass} onChange={(e) => setDimensions(Number(e.target.value), dimensions.height)} value={dimensions.width || ''} /></div>
                <div className="flex-1"><label className={labelClass}>Height</label><input type="number" className={inputClass} onChange={(e) => setDimensions(dimensions.width, Number(e.target.value))} value={dimensions.height || ''} /></div>
              </div>

              <h3 className={sectionTitle}>2. Design Choice</h3>
              <div className="mb-4">
                 <label className={labelClass}>Vibe / Search</label>
                 <textarea className={`${inputClass} h-24 resize-none`} placeholder="e.g. Modern, floral, halloween..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                 {patterns.map((p) => (
                   <div key={p._id} onClick={() => selectPattern(p)} className={`rounded-xl border-2 p-2 cursor-pointer ${selectedPattern?._id === p._id ? 'border-[#9d7de8] bg-[#9d7de8]/10' : 'border-transparent bg-white'}`}>
                      <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                        {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover mix-blend-multiply opacity-75"/>}
                      </div>
                      <p className="text-xs font-bold truncate">{p.title}</p>
                   </div>
                 ))}
              </div>
              
              <h3 className={sectionTitle}>3. Details</h3>
              <div className="space-y-4">
                <div><label className={labelClass}>Thread Color</label><input type="text" className={inputClass} value={designDetails.threadColor} onChange={(e) => updateDesign('threadColor', e.target.value)} /></div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-teal-200">
                   <span className="font-bold">Is Quilt Directional?</span>
                   <input type="checkbox" className="size-5 accent-[#9d7de8]" checked={designDetails.isDirectional} onChange={(e) => updateDesign('isDirectional', e.target.checked)} />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MATERIALS */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className={sectionTitle}>Batting Selection</h3>
              <div className="space-y-3 mb-8">
                {BATTING_OPTIONS.map((b) => (
                  <div key={b.id} onClick={() => selectBatting(b)} className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${selectedBatting?.id === b.id ? 'border-[#9d7de8] bg-[#9d7de8]/5' : 'border-teal-200 bg-white'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBatting?.id === b.id ? 'border-[#9d7de8] bg-[#9d7de8] text-white' : 'border-gray-300'}`}>{selectedBatting?.id === b.id && <span className="material-symbols-outlined text-xs">check</span>}</div>
                    <div><p className="font-bold text-sm">{b.name}</p><p className="text-xs text-teal-600">{b.desc}</p></div>
                  </div>
                ))}
              </div>
              <h3 className={sectionTitle}>Backing Dimensions</h3>
              <div className="flex gap-4 mb-6">
                <div className="flex-1"><label className={labelClass}>Width</label><input type="number" className={inputClass} value={backing.width || ''} onChange={(e) => setBacking(Number(e.target.value), backing.height)} /></div>
                <div className="flex-1"><label className={labelClass}>Height</label><input type="number" className={inputClass} value={backing.height || ''} onChange={(e) => setBacking(backing.width, Number(e.target.value))} /></div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINISHING */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className={sectionTitle}>Trimming</h3>
              <div className="bg-white p-4 rounded-xl border border-teal-200 space-y-4 mb-6">
                <div className="flex justify-between"><span className="font-bold">Trim Quilt?</span><input type="checkbox" className="size-5 accent-[#9d7de8]" checked={trimming.wanted} onChange={(e) => updateTrimming('wanted', e.target.checked)} /></div>
                {trimming.wanted && (
                  <>
                    <div><label className={labelClass}>Method</label><select className={inputClass} value={trimming.method} onChange={(e) => updateTrimming('method', e.target.value)}><option>To Edge</option><option>1/4 inch beyond</option><option>Custom</option></select></div>
                    <div><label className={labelClass}>Return Scraps?</label><select className={inputClass} value={trimming.returnScraps} onChange={(e) => updateTrimming('returnScraps', e.target.value)}><option>No</option><option>Fabric Only</option><option>Fabric & Batting</option></select></div>
                  </>
                )}
              </div>
              <h3 className={sectionTitle}>Binding</h3>
              <div className="bg-white p-4 rounded-xl border border-teal-200 space-y-4">
                <div className="flex justify-between"><span className="font-bold">Add Binding?</span><input type="checkbox" className="size-5 accent-[#9d7de8]" checked={binding.wanted} onChange={(e) => updateBinding('wanted', e.target.checked)} /></div>
                {binding.wanted && (
                  <>
                     <div><label className={labelClass}>Method</label><select className={inputClass} value={binding.method} onChange={(e) => updateBinding('method', e.target.value)}><option>Machine</option><option>Hand</option></select></div>
                     <div><label className={labelClass}>Strip Width</label><input type="text" className={inputClass} value={binding.stripWidth} onChange={(e) => updateBinding('stripWidth', e.target.value)} /></div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & REVIEW */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className={sectionTitle}>Contact Info</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                 <input placeholder="First Name" className={inputClass} value={customer.firstName} onChange={(e) => updateCustomer('firstName', e.target.value)} />
                 <input placeholder="Last Name" className={inputClass} value={customer.lastName} onChange={(e) => updateCustomer('lastName', e.target.value)} />
              </div>
              <input placeholder="Email" className={`${inputClass} mb-3`} value={customer.email} onChange={(e) => updateCustomer('email', e.target.value)} />
              <input placeholder="Phone" className={`${inputClass} mb-6`} value={customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} />

              <h3 className={sectionTitle}>Shipping Address</h3>
              <input placeholder="Street Address" className={`${inputClass} mb-3`} value={customer.address} onChange={(e) => updateCustomer('address', e.target.value)} />
              <div className="flex gap-3 mb-6">
                 <div className="flex-[2]"><input placeholder="City" className={inputClass} value={customer.city} onChange={(e) => updateCustomer('city', e.target.value)} /></div>
                 <div className="flex-1 min-w-[80px]">
                   <select className={`${inputClass} appearance-none`} value={customer.state} onChange={(e) => updateCustomer('state', e.target.value)}>
                     <option value="" disabled>State</option>
                     {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
                 <div className="w-24"><input placeholder="Zip" className={inputClass} value={customer.zip} onChange={(e) => updateCustomer('zip', e.target.value)} /></div>
              </div>
              <div className="flex items-center gap-3 mb-8 bg-white p-4 rounded-xl border border-teal-200">
                 <input type="checkbox" className="size-5 accent-[#9d7de8]" checked={consent.socialMedia} onChange={(e) => updateConsent('socialMedia', e.target.checked)} />
                 <span className="text-sm text-zinc-600">I allow photos of my quilt on social media.</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- RESTORED: DETAILED FLOATING FOOTER --- */}
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

          {/* Breakdown Content */}
          <div className="px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-teal-600 truncate max-w-[200px]">
                {selectedPattern?.title || 'Pattern'} ({dimensions.width}"x{dimensions.height}")
              </span>
              <span className="font-medium text-zinc-900 font-mono">
                ${(dimensions.width * dimensions.height * 0.025).toFixed(2)}
              </span>
            </div>
            
            {(selectedBatting || binding.wanted) && (
                <div className="flex flex-col text-xs text-teal-600 italic pl-3 border-l-2 border-[#9d7de8]/30 gap-1">
                    {selectedBatting && (
                        <div className="flex justify-between">
                            <span>{selectedBatting.name}</span>
                            <span>+${(dimensions.width * dimensions.height * selectedBatting.price).toFixed(2)}</span>
                        </div>
                    )}
                    {binding.wanted && (
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

          {/* Buttons */}
          <div className="p-4 pt-0">
            {step < 4 ? (
               <button onClick={nextStep} className="w-full bg-[#9d7de8] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                 Next Step <span className="material-symbols-outlined">arrow_forward</span>
               </button>
            ) : (
               <button onClick={submitOrder} disabled={isSubmitting} className="w-full bg-zinc-900 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50">
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

function SuccessView() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f8] p-6 text-center">
      <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-teal-600">check_circle</span>
      </div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Order Received!</h1>
      <p className="text-teal-600 mb-6 max-w-xs mx-auto">We'll review your details and send you a confirmation email shortly.</p>
      <button onClick={() => window.location.reload()} className="bg-[#9d7de8] text-white px-6 py-3 rounded-full font-bold shadow-lg">Start New Order</button>
    </div>
  )
}