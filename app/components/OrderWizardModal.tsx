     "use client";

import React, { useState, useEffect } from 'react';

interface OrderWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderWizardModal = ({ isOpen, onClose }: OrderWizardProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    width: '',
    height: '',
    service: 'e2e', // 'e2e' or 'custom'
    batting: false,
    binding: false,
    notes: ''
  });

  // Derived Estimates
  const width = parseFloat(formData.width) || 0;
  const height = parseFloat(formData.height) || 0;
  const sqInches = width * height;
  const servicePrice = formData.service === 'e2e' ? 0.025 : 0.05;
  const baseCost = sqInches * servicePrice;
  const battingCost = formData.batting ? (Math.max(width, height) / 36) * 15 : 0; // Rough est
  const bindingCost = formData.binding ? (width + height) * 2 * 0.25 : 0;
  const totalEst = baseCost + battingCost + bindingCost;

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setStep(5); // Success Screen
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* HEADER & PROGRESS */}
        <div className="bg-[#131118] text-white p-6">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold font-serif">Project Intake</h2>
                <p className="text-white/60 text-sm">Let's get your quilt in the queue.</p>
              </div>
              <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
           </div>
           
           {/* Progress Bar */}
           <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= s ? 'bg-[#652bee]' : 'bg-white/20'}`} />
              ))}
           </div>
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto flex-1 bg-[#f8f7fa]">
          
          {/* STEP 1: DIMENSIONS */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
              <h3 className="text-xl font-bold text-slate-800">Measurements</h3>
              <p className="text-slate-500 text-sm">Enter the width and height of your quilt top in inches.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 focus-within:border-[#652bee] focus-within:ring-1 focus-within:ring-[#652bee] transition-all">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Width</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={formData.width}
                      onChange={e => setFormData({...formData, width: e.target.value})}
                      className="w-full outline-none text-2xl font-bold text-slate-700 placeholder-slate-200"
                      placeholder="60" 
                      autoFocus
                    />
                    <span className="text-slate-400 font-bold">in</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 focus-within:border-[#652bee] focus-within:ring-1 focus-within:ring-[#652bee] transition-all">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Height</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={formData.height}
                      onChange={e => setFormData({...formData, height: e.target.value})}
                      className="w-full outline-none text-2xl font-bold text-slate-700 placeholder-slate-200"
                      placeholder="80" 
                    />
                    <span className="text-slate-400 font-bold">in</span>
                  </div>
                </div>
              </div>

              {sqInches > 0 && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-center gap-3 text-sm">
                   <span className="material-symbols-outlined">straighten</span>
                   <span>Total Area: <strong>{sqInches.toLocaleString()} sq inches</strong></span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SERVICE TYPE */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
              <h3 className="text-xl font-bold text-slate-800">Select Service</h3>
              
              <div 
                onClick={() => setFormData({...formData, service: 'e2e'})}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${formData.service === 'e2e' ? 'border-[#652bee] bg-[#652bee]/5' : 'border-slate-200 hover:border-[#652bee]/50'}`}
              >
                <div className={`size-6 rounded-full border-2 flex items-center justify-center mt-1 ${formData.service === 'e2e' ? 'border-[#652bee] bg-[#652bee]' : 'border-slate-300'}`}>
                  {formData.service === 'e2e' && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                </div>
                <div>
                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-bold text-lg">Edge-to-Edge</h4>
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">2.5¢ / sq in</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">Continuous design stitched across the entire quilt top. Best for utility quilts and modern aesthetics.</p>
                </div>
              </div>

              <div 
                onClick={() => setFormData({...formData, service: 'custom'})}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${formData.service === 'custom' ? 'border-[#652bee] bg-[#652bee]/5' : 'border-slate-200 hover:border-[#652bee]/50'}`}
              >
                <div className={`size-6 rounded-full border-2 flex items-center justify-center mt-1 ${formData.service === 'custom' ? 'border-[#652bee] bg-[#652bee]' : 'border-slate-300'}`}>
                  {formData.service === 'custom' && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                </div>
                <div>
                  <div className="flex justify-between items-center w-full">
                    <h4 className="font-bold text-lg">Custom Quilting</h4>
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">5.0¢ / sq in</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">Block-specific designs, ruler work, and intricate detailing to highlight your piecing.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADD-ONS */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
              <h3 className="text-xl font-bold text-slate-800">Add-ons</h3>

              <label className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${formData.batting ? 'border-[#652bee] bg-[#652bee]/5' : 'border-slate-200'}`}>
                 <div className="flex items-center gap-3">
                    <div className={`size-5 rounded border flex items-center justify-center ${formData.batting ? 'bg-[#652bee] border-[#652bee]' : 'border-slate-300'}`}>
                       {formData.batting && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </div>
                    <span className="font-bold text-slate-700">Need Batting?</span>
                 </div>
                 <input type="checkbox" className="hidden" checked={formData.batting} onChange={e => setFormData({...formData, batting: e.target.checked})} />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${formData.binding ? 'border-[#652bee] bg-[#652bee]/5' : 'border-slate-200'}`}>
                 <div className="flex items-center gap-3">
                    <div className={`size-5 rounded border flex items-center justify-center ${formData.binding ? 'bg-[#652bee] border-[#652bee]' : 'border-slate-300'}`}>
                       {formData.binding && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </div>
                    <span className="font-bold text-slate-700">Binding Services?</span>
                 </div>
                 <input type="checkbox" className="hidden" checked={formData.binding} onChange={e => setFormData({...formData, binding: e.target.checked})} />
              </label>

              <div className="bg-slate-100 p-4 rounded-xl mt-4">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Estimated Cost</h4>
                 <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold text-slate-800">${totalEst.toFixed(2)}</div>
                    <div className="text-xs text-slate-400">*Final price may vary</div>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT */}
          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
              <h3 className="text-xl font-bold text-slate-800">Contact Info</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-[#652bee] outline-none" placeholder="Jane" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-[#652bee] outline-none" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-sm font-bold text-slate-700">Email</label>
                 <input type="email" className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-[#652bee] outline-none" placeholder="jane@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-1">
                 <label className="text-sm font-bold text-slate-700">Notes / Pattern Requests</label>
                 <textarea className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-[#652bee] outline-none h-24 resize-none" placeholder="I like floral patterns..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div className="text-center py-12 animate-in zoom-in duration-300">
               <div className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100">
                 <span className="material-symbols-outlined text-5xl">check_circle</span>
               </div>
               <h3 className="text-3xl font-bold font-serif mb-3 text-slate-900">Request Received!</h3>
               <p className="text-slate-500 mb-8 max-w-sm mx-auto">We have received your project details. Look out for an email from us within 24 hours with your official quote.</p>
               <button onClick={onClose} className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                 Back to Home
               </button>
            </div>
          )}

        </div>

        {/* FOOTER NAV */}
        {step < 5 && (
          <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
             {step > 1 ? (
               <button onClick={handleBack} className="text-slate-500 font-bold hover:text-slate-800 transition-colors">
                 Back
               </button>
             ) : <div />}
             
             {step < 4 ? (
               <button onClick={handleNext} className="bg-[#131118] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#652bee] transition-all shadow-lg flex items-center gap-2">
                 Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
             ) : (
               <button onClick={handleSubmit} disabled={loading} className="bg-[#652bee] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5423c9] transition-all shadow-lg shadow-[#652bee]/20 flex items-center gap-2">
                 {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Submit Request'}
               </button>
             )}
          </div>
        )}

      </div>
    </div>
  );
};