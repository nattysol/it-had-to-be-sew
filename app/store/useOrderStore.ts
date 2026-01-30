import { create } from 'zustand'

interface Dimensions { width: number; height: number }
interface Batting { id: string; name: string; price: number; desc: string }

interface OrderState {
  step: number
  dimensions: Dimensions
  backing: Dimensions
  selectedPattern: any | null
  designDetails: { threadColor: string; isDirectional: boolean }
  selectedBatting: Batting | null
  trimming: { wanted: boolean; method: string; returnScraps: string }
  binding: { wanted: boolean; method: string; stripWidth: string }
  customer: {
    firstName: string; lastName: string; email: string; phone: string;
    address: string; city: string; state: string; zip: string;
  }
  consent: { socialMedia: boolean }
  estimatedTotal: number

  // Actions
  nextStep: () => void
  prevStep: () => void
  setDimensions: (w: number, h: number) => void
  setBacking: (w: number, h: number) => void
  selectPattern: (p: any) => void
  updateDesign: (field: string, value: any) => void
  selectBatting: (b: Batting) => void
  updateTrimming: (field: string, value: any) => void
  updateBinding: (field: string, value: any) => void
  updateCustomer: (field: string, value: any) => void
  updateConsent: (field: string, value: any) => void
}

// Helper to calculate total
const calculateTotal = (s: OrderState) => {
  const sqInches = s.dimensions.width * s.dimensions.height
  const basePrice = sqInches * 0.025 // Base pantograph rate
  
  let battingPrice = 0
  if (s.selectedBatting) {
    battingPrice = sqInches * s.selectedBatting.price
  }

  let bindingPrice = 0
  if (s.binding.wanted) {
    const linearInches = (s.dimensions.width + s.dimensions.height) * 2
    bindingPrice = linearInches * 0.25
  }

  return basePrice + battingPrice + bindingPrice
}

export const useOrderStore = create<OrderState>((set, get) => ({
  step: 1,
  dimensions: { width: 0, height: 0 },
  backing: { width: 0, height: 0 },
  selectedPattern: null,
  designDetails: { threadColor: '', isDirectional: false },
  selectedBatting: null,
  trimming: { wanted: false, method: 'To Edge', returnScraps: 'No' },
  binding: { wanted: false, method: 'Machine', stripWidth: '' },
  customer: {
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: ''
  },
  consent: { socialMedia: false },
  estimatedTotal: 0,

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  
  setDimensions: (w, h) => set((state) => {
    const newState = { ...state, dimensions: { width: w, height: h } }
    return { ...newState, estimatedTotal: calculateTotal(newState) }
  }),

  setBacking: (w, h) => set((state) => ({ backing: { width: w, height: h } })),
  
  selectPattern: (p) => set(() => ({ selectedPattern: p })),
  
  updateDesign: (field, value) => set((state) => ({ 
    designDetails: { ...state.designDetails, [field]: value } 
  })),

  selectBatting: (b) => set((state) => {
    const newState = { ...state, selectedBatting: b }
    return { ...newState, estimatedTotal: calculateTotal(newState) }
  }),

  updateTrimming: (field, value) => set((state) => ({
    trimming: { ...state.trimming, [field]: value }
  })),

  updateBinding: (field, value) => set((state) => {
    const newState = { ...state, binding: { ...state.binding, [field]: value } }
    return { ...newState, estimatedTotal: calculateTotal(newState) }
  }),

  updateCustomer: (field, value) => set((state) => ({
    customer: { ...state.customer, [field]: value }
  })),

  updateConsent: (field, value) => set((state) => ({
    consent: { ...state.consent, [field]: value }
  })),
}))