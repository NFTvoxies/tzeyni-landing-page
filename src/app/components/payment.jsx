import React, { useState } from 'react';

const StepPayment = ({ handleNext, handleBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const isFormValid = paymentMethod && (
    paymentMethod === 'paypal' || 
    (cardDetails.cardNumber && cardDetails.expirationDate && cardDetails.cvv)
  );

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Méthode de paiement</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="creditCard"
              name="paymentMethod"
              type="radio"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={() => setPaymentMethod('creditCard')}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
              Carte de crédit
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
              PayPal
            </label>
          </div>
        </div>
        {paymentMethod === 'creditCard' && (
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Numéro de carte
              </label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  name="expirationDate"
                  id="expirationDate"
                  value={cardDetails.expirationDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="MM/AA"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Passer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;