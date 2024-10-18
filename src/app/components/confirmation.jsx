import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';

const StepConfirmation = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  React.useEffect(() => {
    // Clear the cart after showing the confirmation
    return () => clearCart();
  }, [clearCart]);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">Order Confirmed!</h2>
          <p className="mt-1 text-sm text-gray-500">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Order Summary</h3>
          <dl className="mt-2 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <dt className="text-sm text-gray-600">{item.name}</dt>
                <dd className="text-sm font-medium text-gray-900">{item.price}</dd>
              </div>
            ))}
            <div className="flex justify-between py-2 font-medium">
              <dt className="text-sm text-gray-900">Total</dt>
              <dd className="text-sm text-gray-900">${total.toFixed(2)}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <Link href="/">
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StepConfirmation;