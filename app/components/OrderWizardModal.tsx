"use client";

import React from 'react';
import OrderWizard from './OrderWizard'; // Import the component we just made

interface OrderWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderWizardModal = ({ isOpen, onClose }: OrderWizardModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white animate-in fade-in duration-200 overflow-y-auto">
       {/* Close Button Overlay */}
       <button 
         onClick={onClose}
         className="fixed top-4 right-4 z-50 bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors"
       >
         <span className="material-symbols-outlined text-zinc-900">close</span>
       </button>
       
       {/* The Full Wizard */}
       <OrderWizard />
    </div>
  );
};