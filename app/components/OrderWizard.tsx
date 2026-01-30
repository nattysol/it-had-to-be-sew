'use client'
import { useState, useEffect } from 'react'
import { createClient } from 'next-sanity'
import { useOrderStore } from '../store/useOrderStore'
import { motion, AnimatePresence } from 'framer-motion'
// 👇 Import the Server Action
import { createOrder } from '../actions' 

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
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch patterns (if your schema is named 'pattern' instead of 'pantograph', change it here)
  useEffect(() => {
    const query = `*[_type == "pattern" || _type == "pantograph"]{_id, title, category, "imageUrl": image.asset->url, "imgUrl": img.asset->url}`
    client.fetch(query).then(data => {
      // Handle different image field names
      const mapped = data.map((p: any) => ({
        ...p,
        imageUrl: p.imageUrl || p.imgUrl
      }))
      setPatterns(mapped)
    })
  }, [])

  const handleSubmit = async () => {
    setErrorMessage('');
    
    // Basic Validation
    if (!customer.firstName || !customer.email) { 
        setErrorMessage("Please enter your name and email.");
        return; 
    }

    setIsSubmitting(true);
    
    // 👇 CALL THE SERVER ACTION
    const result = await createOrder(store);

    if (result.success) {
        setOrderComplete(true);
    } else {
        setErrorMessage("Something went wrong. Please try again.");
    }
    
    setIsSubmitting(false);
  }

  if (orderComplete) return <SuccessView />

  // --- STYLING CONSTANTS (Updated to match site) ---
  const inputClass = "w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-[#652bee] focus:border-[#652bee] placeholder:text-slate-300 transition-all shadow-sm";
  const labelClass = "text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block";
  const sectionTitle = "text-2xl font-bold font-serif text-[#131118] mb-6 mt-8 first:mt-0";

  return (
    <div className="bg-[#f8f7fa] min-h-screen font-sans text-[#131118] pb-48">
      
      {/* --- TOP BAR --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 pt-4 pb-0">
        <div className="flex items-center justify-between max-w-xl mx-auto px-6 mb-3">
          <button 
            onClick={step > 1 ? prevStep : undefined} 
            className={`flex size-10 items-center justify-center hover:bg-slate-100 rounded-full transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <span className="material-symbols-outlined text-slate-600">arrow_back</span>
          </button>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
             Step {step} of 4
          </h2>
          <div className="w-10"></div> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <motion.div 
            className="h-full bg-[#652bee]" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 mt-8">
        <AnimatePresence mode='wait'>
          
          {/* STEP 1: DESIGN & SIZE */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className={sectionTitle}>Measurements</h3>
              <div className="flex gap-4 mb-8">
                <div className="flex-1">
                    <label className={labelClass}>Width (inches)</label>
                    <input type="number" className={inputClass} onChange={(e) => setDimensions(Number(e.target.value), dimensions.height)} value={dimensions.width || ''} placeholder="60" autoFocus />
                </div>
                <div className="flex-1">
                    <label className={labelClass}>Height (inches)</label>
                    <input type="number" className={inputClass} onChange={(e) => setDimensions(dimensions.width, Number(e.target.value))} value={dimensions.height || ''} placeholder="80" />
                </div>
              </div>

              <h3 className={sectionTitle}>Select a Pattern</h3>
              <p className="text-slate-500 mb-4 text-sm">Choose a pattern or leave blank if you want us to choose.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 {patterns.map((p) => (
                   <div 
                     key={p._id} 
                     onClick={() => selectPattern(p)} 
                     className={`rounded-xl border-2 p-3 cursor-pointer transition-all hover:-translate-y-1 ${
                        selectedPattern?._id === p._id 
                        ? 'border-[#652bee] bg-[#652bee]/5 shadow-lg shadow-[#652bee]/10' 
                        : 'border-white bg-white shadow-sm hover:shadow-md'
                     }`}
                   >
                      <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden relative">
                        {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover"/>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <span className="material-symbols-outlined">image</span>
                            </div>
                        )}
                      </div>
                      <p className={`text-sm font-bold truncate ${selectedPattern?._id === p._id ? 'text-[#652bee]' : 'text-slate-700'}`}>{p.title}</p>
                   </div>
                 ))}
                 {patterns.length === 0 && (
                    <div className="col-span-2 p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                        No patterns loaded. We'll consult with you later!
                    </div>
                 )}
              </div>
              
              <h3 className={sectionTitle}>Thread & Details</h3>
              <div className="space-y-4">
                <div>
                    <label className={labelClass}>Thread Color Preference</label>
                    <input type="text" className={inputClass} value={designDetails.threadColor} onChange={(e) => updateDesign('threadColor', e.target.value)} placeholder="e.g. White, Grey, or Match Top" />
                </div>
                <label className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-[#652bee]">
                   <span className="font-bold text-slate-700">Is the quilt top directional?</span>
                   <input type="checkbox" className="size-6 accent-[#652bee]" checked={designDetails.isDirectional} onChange={(e) => updateDesign('isDirectional', e.target.checked)} />
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MATERIALS */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className={sectionTitle}>Batting Selection</h3>
              <div className="space-y-4 mb-8">
                {BATTING_OPTIONS.map((b) => (
                  <div 
                    key={b.id} 
                    onClick={() => selectBatting(b)} 
                    className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${
                        selectedBatting?.id === b.id 
                        ? 'border-[#652bee] bg-[#652bee]/5 shadow-md' 
                        : 'border-transparent bg-white shadow-sm hover:border-slate-200'
                    }`}
                  >
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedBatting?.id === b.id ? 'border-[#652bee] bg-[#652bee] text-white' : 'border-slate-200'}`}>
                        {selectedBatting?.id === b.id && <span className="material-symbols-outlined text-sm">check</span>}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">{b.name}</p>
                        <p className="text-sm text-slate-500 mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className={sectionTitle}>Backing Dimensions</h3>
              <p className="text-slate-500 mb-4 text-sm">Backing should be at least 4" larger on all sides.</p>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className={labelClass}>Width (in)</label>
                    <input type="number" className={inputClass} value={backing.width || ''} onChange={(e) => setBacking(Number(e.target.value), backing.height)} />
                </div>
                <div className="flex-1">
                    <label className={labelClass}>Height (in)</label>
                    <input type="number" className={inputClass} value={backing.height || ''} onChange={(e) => setBacking(backing.width, Number(e.target.value))} />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINISHING */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 className={sectionTitle}>Trimming Services</h3>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 mb-8 shadow-sm">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-slate-800">Would you like us to trim?</span>
                    <input type="checkbox" className="size-6 accent-[#652bee]" checked={trimming.wanted} onChange={(e) => updateTrimming('wanted', e.target.checked)} />
                </div>
                {trimming.wanted && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2">
                    <div>
                        <label className={labelClass}>Trimming Method</label>
                        <select className={inputClass} value={trimming.method} onChange={(e) => updateTrimming('method', e.target.value)}>
                            <option>To Edge</option>
                            <option>1/4 inch beyond</option>
                            <option>Custom</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Scraps</label>
                        <select className={inputClass} value={trimming.returnScraps} onChange={(e) => updateTrimming('returnScraps', e.target.value)}>
                            <option>No, discard them</option>
                            <option>Return Fabric Only</option>
                            <option>Return Fabric & Batting</option>
                        </select>
                    </div>
                  </div>
                )}
              </div>

              <h3 className={sectionTitle}>Binding Services</h3>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-slate-800">Add Binding?</span>
                    <input type="checkbox" className="size-6 accent-[#652bee]" checked={binding.wanted} onChange={(e) => updateBinding('wanted', e.target.checked)} />
                </div>
                {binding.wanted && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2">
                     <div>
                        <label className={labelClass}>Binding Method</label>
                        <select className={inputClass} value={binding.method} onChange={(e) => updateBinding('method', e.target.value)}>
                            <option>Machine (Sturdy)</option>
                            <option>Hand (Invisible/Show)</option>
                        </select>
                     </div>
                     <div>
                        <label className={labelClass}>Strip Width</label>
                        <input type="text" className={inputClass} value={binding.stripWidth} onChange={(e) => updateBinding('stripWidth', e.target.value)} placeholder="e.g. 2.5 inches" />
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & REVIEW */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className={sectionTitle}>Contact Information</h3>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                         <label className={labelClass}>First Name</label>
                         <input placeholder="Jane" className={inputClass} value={customer.firstName} onChange={(e) => updateCustomer('firstName', e.target.value)} />
                     </div>
                     <div>
                         <label className={labelClass}>Last Name</label>
                         <input placeholder="Doe" className={inputClass} value={customer.lastName} onChange={(e) => updateCustomer('lastName', e.target.value)} />
                     </div>
                  </div>
                  <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" placeholder="jane@example.com" className={inputClass} value={customer.email} onChange={(e) => updateCustomer('email', e.target.value)} />
                  </div>
                  <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" placeholder="(555) 123-4567" className={inputClass} value={customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} />
                  </div>
              </div>

              <h3 className={sectionTitle}>Shipping Address</h3>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-4">
                  <div>
                      <label className={labelClass}>Street Address</label>
                      <input placeholder="123 Quilt Lane" className={inputClass} value={customer.address} onChange={(e) => updateCustomer('address', e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-[2]">
                        <label className={labelClass}>City</label>
                        <input placeholder="Las Vegas" className={inputClass} value={customer.city} onChange={(e) => updateCustomer('city', e.target.value)} />
                     </div>
                     <div className="flex-1">
                       <label className={labelClass}>State</label>
                       <select className={`${inputClass} px-2`} value={customer.state} onChange={(e) => updateCustomer('state', e.target.value)}>
                         <option value="" disabled>NV</option>
                         {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                     </div>
                     <div className="w-24">
                        <label className={labelClass}>Zip</label>
                        <input placeholder="89101" className={inputClass} value={customer.zip} onChange={(e) => updateCustomer('zip', e.target.value)} />
                     </div>
                  </div>
              </div>

              <label className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 cursor-pointer">
                 <input type="checkbox" className="size-5 accent-[#652bee]" checked={consent.socialMedia} onChange={(e) => updateConsent('socialMedia', e.target.checked)} />
                 <span className="text-sm font-bold text-slate-600">I allow photos of my quilt on social media.</span>
              </label>

              {errorMessage && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center animate-pulse">
                      {errorMessage}
                  </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- FLOATING FOOTER (The Receipt) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-4 bg-gradient-to-t from-[#f8f7fa] via-[#f8f7fa] to-transparent">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden ring-1 ring-black/5">
          
          {/* Header Bar */}
          <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#652bee] text-lg">receipt_long</span>
              <span className="font-bold text-sm text-slate-800">Live Estimate</span>
            </div>
          </div>

          {/* Breakdown Content */}
          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium truncate max-w-[200px]">
                {selectedPattern?.title || 'Edge-to-Edge'} ({dimensions.width || 0}"x{dimensions.height || 0}")
              </span>
              <span className="font-bold text-slate-800 font-mono">
                ${(dimensions.width * dimensions.height * 0.025).toFixed(2)}
              </span>
            </div>
            
            {(selectedBatting || binding.wanted) && (
                <div className="flex flex-col text-xs text-slate-400 font-medium pl-3 border-l-2 border-[#652bee]/30 gap-1.5 pt-1">
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
            <div className="flex justify-between items-end pt-3 border-t border-slate-100 mt-2">
              <span className="font-bold text-slate-900">Estimated Total</span>
              <span className="font-bold text-[#652bee] text-2xl leading-none">${estimatedTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 pt-0">
            {step < 4 ? (
               <button onClick={nextStep} className="w-full bg-[#131118] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-[#652bee] transition-all transform active:scale-[0.98]">
                 Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            ) : (
               <button 
                 onClick={handleSubmit} 
                 disabled={isSubmitting} 
                 className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all transform active:scale-[0.98] ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#652bee] hover:bg-[#5423c9]'}`}
               >
                 {isSubmitting ? (
                    <>
                        <span className="material-symbols-outlined animate-spin">sync</span>
                        Processing...
                    </>
                 ) : (
                    <>
                        Submit Order <span className="material-symbols-outlined">check</span>
                    </>
                 )}
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7fa] p-6 text-center animate-in zoom-in duration-300">
      <div className="size-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
        <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
      </div>
      <h1 className="text-4xl font-serif font-bold text-[#131118] mb-3">Order Received!</h1>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto text-lg">We have received your request. Check your email for your official quote within 24 hours.</p>
      <button onClick={() => window.location.reload()} className="bg-[#131118] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#652bee] transition-colors shadow-lg">Start New Order</button>
    </div>
  )
}