import { create } from 'zustand'

type OrderState = {
  step: number;
  
  // Data
  customer: { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; state: string; zip: string; shippingMethod: string };
  dimensions: { width: number; height: number };
  backing: { width: number; height: number };
  selectedPattern: { _id: string; title: string; price: number } | null;
  designDetails: { threadColor: string; isDirectional: boolean; safetyPinning: string };
  selectedBatting: { id: string; name: string; price: number } | null;
  trimming: { wanted: boolean; method: string; returnScraps: string };
  binding: { wanted: boolean; method: string; providedByCustomer: boolean; stripWidth: string };
  consent: { socialMedia: boolean; terms: boolean };
  
  estimatedTotal: number;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateCustomer: (field: string, value: any) => void;
  setDimensions: (w: number, h: number) => void;
  setBacking: (w: number, h: number) => void;
  selectPattern: (pattern: any) => void;
  updateDesign: (field: string, value: any) => void;
  selectBatting: (batting: any) => void;
  updateTrimming: (field: string, value: any) => void;
  updateBinding: (field: string, value: any) => void;
  updateConsent: (field: string, value: any) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  step: 1,
  
  // Initial State
  customer: { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', shippingMethod: 'standard' },
  dimensions: { width: 0, height: 0 },
  backing: { width: 0, height: 0 },
  selectedPattern: null,
  designDetails: { threadColor: '', isDirectional: false, safetyPinning: 'None' },
  selectedBatting: null,
  trimming: { wanted: false, method: 'To Edge', returnScraps: 'No' },
  binding: { wanted: false, method: 'Machine', providedByCustomer: true, stripWidth: '2.5 inches' },
  consent: { socialMedia: true, terms: false },
  estimatedTotal: 0,

  // Setters
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  
  updateCustomer: (field, value) => set((state) => ({ customer: { ...state.customer, [field]: value } })),
  
  setDimensions: (width, height) => {
    set({ dimensions: { width, height } });
    calculateTotal(set, get);
  },
  
  setBacking: (width, height) => set({ backing: { width, height } }),
  
  selectPattern: (pattern) => {
    set({ selectedPattern: pattern });
    calculateTotal(set, get);
  },
  
  updateDesign: (field, value) => set((state) => ({ designDetails: { ...state.designDetails, [field]: value } })),
  
  selectBatting: (batting) => {
    set({ selectedBatting: batting });
    calculateTotal(set, get);
  },
  
  updateTrimming: (field, value) => set((state) => ({ trimming: { ...state.trimming, [field]: value } })),
  updateBinding: (field, value) => {
    set((state) => ({ binding: { ...state.binding, [field]: value } }));
    calculateTotal(set, get);
  },
  updateConsent: (field, value) => set((state) => ({ consent: { ...state.consent, [field]: value } })),
}))

// Helper to calculate total
const calculateTotal = (set: any, get: any) => {
  const s = get();
  const area = s.dimensions.width * s.dimensions.height;
  let total = 0;

  // 1. Pattern ($0.025/sq in)
  if (s.selectedPattern) total += area * 0.025;

  // 2. Batting
  if (s.selectedBatting) total += area * s.selectedBatting.price;

  // 3. Binding ($0.25/linear inch)
  if (s.binding.wanted) {
    const perimeter = (s.dimensions.width + s.dimensions.height) * 2;
    total += perimeter * 0.25;
  }

  set({ estimatedTotal: parseFloat(total.toFixed(2)) });
}