"use client";

import React from 'react';
// 👇 This imports the "Premium" form logic we built in the other file
import OrderWizard from './OrderWizard'; 

interface OrderWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 👇 This "export const" is what fixes the error in page.tsx
export const OrderWizardModal = ({ isOpen, onClose }: OrderWizardModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white animate-in fade-in duration-200 overflow-y-auto">
       {/* Close Button Overlay */}
       <button 
         onClick={onClose}
         className="fixed top-4 right-4 z-50 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors shadow-sm"
       >
         <span className="material-symbols-outlined text-zinc-900">close</span>
       </button>
       
       {/* The Full Wizard Content */}
       <OrderWizard />
    </div>
  );
};