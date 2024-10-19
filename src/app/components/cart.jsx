import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';

const StepCart = ({ handleNext }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Mon Panier</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex">
                  <Image 
                    src={item.images[0]} 
                    alt={item.name} 
                    width={80} 
                    height={80} 
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.selectedColor}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Sous-total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleNext}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Passer à l'adresse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCart;