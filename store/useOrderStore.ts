import { create } from 'zustand'

type OrderState = {
  // Navigation
  step: number;
  
  // Data
  dimensions: { width: number; height: number };
  selectedPattern: { _id: string; title: string; price: number } | null;
  selectedBatting: { id: string; name: string; price: number } | null;
  services: { binding: boolean; trimming: boolean };
  
  // Computed
  estimatedTotal: number;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setDimensions: (w: number, h: number) => void;
  selectPattern: (pattern: any) => void;
  selectBatting: (batting: any) => void;
  toggleService: (service: 'binding' | 'trimming') => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  step: 1, // Start at Step 1
  dimensions: { width: 0, height: 0 },
  selectedPattern: null,
  selectedBatting: null,
  services: { binding: false, trimming: false },
  estimatedTotal: 0,

  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

  setDimensions: (width, height) => {
    set({ dimensions: { width, height } });
    calculateTotal(set, get);
  },

  selectPattern: (pattern) => {
    set({ selectedPattern: pattern });
    calculateTotal(set, get);
  },

  selectBatting: (batting) => {
    set({ selectedBatting: batting });
    calculateTotal(set, get);
  },

  toggleService: (service) => {
    set((state) => ({ 
      services: { ...state.services, [service]: !state.services[service] } 
    }));
    calculateTotal(set, get);
  }
}))

// Helper to calculate total price
const calculateTotal = (set: any, get: any) => {
  const s = get();
  const area = s.dimensions.width * s.dimensions.height;
  
  // 1. Pattern Cost (Default to 0.025 if missing)
  const patternRate = 0.025; 
  let total = area * patternRate;

  // 2. Batting Cost (Linear Inch or Sq Inch? Let's use Linear for simplicity or fixed)
  // Example: Batting is usually per linear yard, but let's approximate per sq inch for the receipt
  if (s.selectedBatting) {
     total += area * s.selectedBatting.price;
  }

  // 3. Services
  if (s.services.binding) {
    const perimeter = (s.dimensions.width + s.dimensions.height) * 2;
    total += perimeter * 0.25; // $0.25 per inch for binding
  }

  set({ estimatedTotal: parseFloat(total.toFixed(2)) });
}