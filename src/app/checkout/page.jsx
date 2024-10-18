'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepCart from '../components/cart';
import StepAddress from '../components/address';
import StepPayment from '../components/payment';
import StepConfirmation from '../components/confirmation';

const steps = ['Cart', 'Address', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepCart handleNext={handleNext} />;
      case 1:
        return <StepAddress handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <StepPayment handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <StepConfirmation />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <nav aria-label="Progress" className="mb-8">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li key={step} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${index < activeStep ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  </div>
                  <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                    index < activeStep ? 'bg-indigo-600' : 
                    index === activeStep ? 'bg-white border-2 border-indigo-600' : 'bg-white border-2 border-gray-300'
                  }`}>
                    {index < activeStep ? (
                      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-medium ${index === activeStep ? 'text-indigo-600' : 'text-gray-500'}`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-500">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
          {getStepContent(activeStep)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;