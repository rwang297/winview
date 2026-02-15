'use client';

import AccountMandateCTermsStep from '@/components/OpenAccount/AccountMandateCTermsStep';
import { AccountOpeningBStep } from '@/components/OpenAccount/AccountOpeningBStep';
import { ContactInfoStep } from '@/components/OpenAccount/ContactInfoStep';
import { FormNavigation } from '@/components/OpenAccount/FormNavigation';
import { IppisFormStep } from '@/components/OpenAccount/IppisFormStep';
import { PageHeader } from '@/components/OpenAccount/PageHeader';
// Removed IPPIS + B + C + D flow and restored previous simple form (Personal, Contact, Review)
import { PersonalInfoStep } from '@/components/OpenAccount/PersonalInfoStep';
import { ProgressIndicator } from '@/components/OpenAccount/ProgressIndicator';
import ReferenceFormDStep from '@/components/OpenAccount/ReferenceFormDStep';
import { ReviewStep } from '@/components/OpenAccount/ReviewStep';
import { SuccessScreen } from '@/components/OpenAccount/SuccessScreen';
import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { useOpenAccountForm } from '@/hooks/useOpenAccountForm';
import { useEffect, useState } from 'react';

// NEW: Dedicated sub-component for the Hire-Purchase flow (4 steps)
function OpenAccountHP() {
  const TOTAL_STEPS = 4;
  const winviewGradient = 'from-[#7b5aff] to-[#5ecbf7]';
  const {
    currentStep,
    ippisForm,
    bForm,
    cForm,
    dForm,
    isSubmitting,
    isSuccess,
    handleIppisChange,
    handleBFormChange,
    handleCFormChange,
    handleDFormChange,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useOpenAccountForm({ initialStep: 1, flow: 'full' });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  if (isSuccess) {
    // In HP flow, success screen is fine even if email wasn't entered in simple form
    return <SuccessScreen email={''} winviewGradient={winviewGradient} />;
  }

  const onNext = () => {
    if (currentStep < TOTAL_STEPS) handleNext();
  };
  const onPrevious = () => {
    if (currentStep > 1) handlePrevious();
  };

  return (
    <div className="pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-[900px] mx-auto">
        <PageHeader isVisible={isVisible} winviewGradient={winviewGradient} />

        <ProgressIndicator
          currentStep={currentStep}
          isVisible={isVisible}
          winviewGradient={winviewGradient}
          totalSteps={TOTAL_STEPS}
        />

        {/* Form Card */}
        <div
          className={`bg-white/95 backdrop-blur-sm rounded-[32px] p-8 md:p-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-98'}`}
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: IPPIS form with internal mini-wizard */}
            {currentStep === 1 && (
              <IppisFormStep
                ippisForm={ippisForm}
                onChange={handleIppisChange}
                onCompleteSections={handleNext}
              />
            )}

            {/* Step 2: Section B */}
            {currentStep === 2 && (
              <AccountOpeningBStep bForm={bForm} onChange={handleBFormChange} />
            )}

            {/* Step 3: Section C */}
            {currentStep === 3 && (
              <AccountMandateCTermsStep cForm={cForm} onChange={handleCFormChange} />
            )}

            {/* Step 4: Section D */}
            {currentStep === 4 && <ReferenceFormDStep dForm={dForm} onChange={handleDFormChange} />}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onPrevious={onPrevious}
              onNext={onNext}
              isSubmitting={isSubmitting}
              winviewGradient={winviewGradient}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

// Existing simple flow kept as a dedicated sub-component (unchanged behavior)
function OpenAccountSimple() {
  const TOTAL_STEPS = 3;
  const winviewGradient = 'from-[#7b5aff] to-[#5ecbf7]';
  const {
    currentStep,
    formData,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useOpenAccountForm({ initialStep: 1, flow: 'simple' });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  if (isSuccess) {
    return <SuccessScreen email={formData.email} winviewGradient={winviewGradient} />;
  }

  const onNext = () => {
    if (currentStep < TOTAL_STEPS) handleNext();
  };
  const onPrevious = () => {
    if (currentStep > 1) handlePrevious();
  };

  return (
    <div className="pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-[700px] mx-auto">
        <PageHeader isVisible={isVisible} winviewGradient={winviewGradient} />

        <ProgressIndicator
          currentStep={currentStep}
          isVisible={isVisible}
          winviewGradient={winviewGradient}
          totalSteps={TOTAL_STEPS}
        />

        {/* Form Card */}
        <div
          className={`bg-white/95 backdrop-blur-sm rounded-[32px] p-8 md:p-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-98'}`}
        >
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <PersonalInfoStep formData={formData} onChange={handleInputChange} />
            )}

            {currentStep === 2 && (
              <ContactInfoStep formData={formData} onChange={handleInputChange} />
            )}

            {currentStep === 3 && <ReviewStep formData={formData} onChange={handleInputChange} />}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onPrevious={onPrevious}
              onNext={onNext}
              isSubmitting={isSubmitting}
              winviewGradient={winviewGradient}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OpenAccountPage() {
  // Detect desired flow from query string: /open-account?flow=hire-purchase → HP (IPPIS first)
  const [mode, setMode] = useState('detecting'); // "hp" | "simple" | "detecting"

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      setMode(sp.get('flow') === 'hire-purchase' ? 'hp' : 'simple');
    } catch (e) {
      setMode('simple');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.createusercontent.com/c73162ba-b38e-46de-8a61-78248ef56264/"
          alt="Banking Background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2]/95 to-[#FAF7F2]/85" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7b5aff]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5ecbf7]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />

      {/* Wait until mode is known to avoid flashing the wrong form */}
      {mode === 'detecting' ? (
        <div className="pt-40 pb-40 px-6 relative z-10">
          <div className="max-w-[700px] mx-auto text-center text-[#86868b]">Loading form...</div>
        </div>
      ) : mode === 'hp' ? (
        <OpenAccountHP />
      ) : (
        <OpenAccountSimple />
      )}

      <Footer />
    </div>
  );
}
