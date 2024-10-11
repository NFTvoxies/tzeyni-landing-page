'use client'
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-24 lg:px-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 p-6 mx-auto mb-16 max-w-screen-md bg-white rounded-lg border border-gray-200 shadow-sm lg:mb-28 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-[#aa9270] focus:border-[#aa9270]"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Nom de famille</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-[#aa9270] focus:border-[#aa9270]"
            placeholder="Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#aa9270] focus:border-[#aa9270] block w-full p-2.5"
            placeholder="name@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Numéro de téléphone</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-[#aa9270] focus:border-[#aa9270]"
            placeholder="+1 (123) 456-7890"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Votre message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-[#aa9270] focus:border-[#aa9270]"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#aa9270] sm:w-fit hover:bg-[#8e7a5d] focus:ring-4 focus:outline-none focus:ring-[#d4bd9c]">Envoyer un message</button>
      </form>
    </div>
  );
};

export default ContactForm;