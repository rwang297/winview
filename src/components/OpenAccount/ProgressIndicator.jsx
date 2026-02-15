import { Briefcase, FileText, Mail, User } from 'lucide-react';

// Default full flow (7 steps)
const FULL_STEPS = [
  { step: 1, icon: User, label: 'Personal' },
  { step: 2, icon: Mail, label: 'Contact' },
  { step: 3, icon: Briefcase, label: 'Review' },
  { step: 4, icon: FileText, label: 'IPPIS Form' },
  { step: 5, icon: FileText, label: 'Section B' },
  { step: 6, icon: FileText, label: 'Section C' },
  { step: 7, icon: FileText, label: 'Section D' },
];

// Condensed Hire-Purchase flow (4 steps)
const HP_STEPS = [
  { step: 1, icon: FileText, label: 'IPPIS Form' },
  { step: 2, icon: FileText, label: 'Section B' },
  { step: 3, icon: FileText, label: 'Section C' },
  { step: 4, icon: FileText, label: 'Section D' },
];

// Simple flow (3 steps)
const SIMPLE_STEPS = [
  { step: 1, icon: User, label: 'Personal' },
  { step: 2, icon: Mail, label: 'Contact' },
  { step: 3, icon: Briefcase, label: 'Review' },
];

export function ProgressIndicator({ currentStep, isVisible, winviewGradient, totalSteps }) {
  // Decide which set of steps to render based on totalSteps
  const steps = totalSteps === 4 ? HP_STEPS : totalSteps === 3 ? SIMPLE_STEPS : FULL_STEPS;

  return (
    <div
      className={`flex items-center justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      {steps.map((item, index, arr) => (
        <div
          key={`${totalSteps === 4 ? 'hp' : totalSteps === 3 ? 'simple' : 'full'}-${item.step}`}
          className="flex items-center"
        >
          <div
            className={`relative w-14 h-14 rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all duration-500 ease-out shadow-sm ${
              item.step <= currentStep
                ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white scale-110 shadow-lg shadow-brand-500/30'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:scale-105'
            }`}
          >
            <item.icon
              size={18}
              className={item.step <= currentStep ? 'text-white' : 'text-neutral-700 dark:text-neutral-400'}
            />
            <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
          </div>
          {index < arr.length - 1 && (
            <div
              className={`w-16 h-1 mx-3 rounded-full transition-all duration-500 ease-out ${
                item.step < currentStep ? 'bg-brand-500' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
