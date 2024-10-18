import React, { useState } from 'react';
import { useRouter } from 'next/router';
import StepCart from './cart';
import StepAddress from './address';
import StepPayment from './payment';
import StepConfirmation from './confirmation';

const steps = ['Cart', 'Address', 'Payment', 'Confirmation'];

const CheckoutWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

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
    <div className="checkout-wizard">
      <div className="steps">
        {steps.map((label, index) => (
          <div key={label} className={index <= activeStep ? 'step-active' : 'step'}>
            {label}
          </div>
        ))}
      </div>
      <div className="step-content">{getStepContent(activeStep)}</div>
    </div>
  );
};

export default CheckoutWizard;
