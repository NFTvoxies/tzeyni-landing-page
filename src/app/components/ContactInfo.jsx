import { Icon } from '@iconify/react';

const ContactInfo = () => {
  return (
    <div className="space-y-8 mt-96 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div>
        <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg lg:h-16 lg:w-16">
          <Icon icon="mdi:email-outline" className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8" />
        </div>
        <p className="mb-2 text-xl font-bold">Email us:</p>
        <p className="mb-3 text-gray-500">Email us for general queries, including marketing and partnership opportunities.</p>
        <a href="mailto:contact@tzeyni.com" className="font-semibold text-[#aa9270] hover:underline">contact@tzeyni.com</a>
      </div>
      <div>
        <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg lg:h-16 lg:w-16">
          <Icon icon="mdi:phone-outline" className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8" />
        </div>
        <p className="mb-2 text-xl font-bold">Call us:</p>
        <p className="mb-3 text-gray-500">Call us to speak to a member of our team. We are always happy to help.</p>
        <span className="font-semibold text-[#aa9270]">+1 (123) 456-7890</span>
      </div>
      <div>
        <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 bg-gray-100 rounded-lg lg:h-16 lg:w-16">
          <Icon icon="mdi:help-circle-outline" className="w-5 h-5 text-gray-600 lg:w-8 lg:h-8" />
        </div>
        <p className="mb-2 text-xl font-bold">Support</p>
        <p className="mb-3 text-gray-500">Visit our support center for answers to common questions and issues.</p>
        <a href="#" className="inline-flex py-2 px-4 text-sm font-medium text-center rounded-lg border text-[#aa9270] border-[#aa9270] hover:text-white hover:bg-[#aa9270] focus:ring-4 focus:outline-none focus:ring-[#d4bd9c]">Support center</a>
      </div>
    </div>
  );
};

export default ContactInfo;