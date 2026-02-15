import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting,
  winviewGradient,
}) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrevious}
          className="btn-secondary flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>
      ) : (
        <div />
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          className="btn-primary flex items-center gap-2"
        >
          <span>Next Step</span>
          <ChevronRight size={20} />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:hover:from-brand-600 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </>
          ) : (
            'Complete Setup'
          )}
        </button>
      )}
    </div>
  );
}
