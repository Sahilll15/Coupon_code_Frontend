import React from 'react';

const Hero = () => {
  return (
    <div className='mt-16'>
      <div className="bg-gray-200 p-8 flex-col md:flex-row lg:flex gap-24 h-1/4">
        <div className='flex-col flex-1 mt-10 order-last lg:order-first'>
          <div className="text-4xl mb-4">
            <span className="text-blue-500">Save</span> money with coupons
          </div>
          <div className="space-y-4">
            <div className=" text-sm md:text-lg">
              Welcome to our online coupon platform. We bring you the best deals and discounts from your favorite stores. Start saving today!
            </div>
          </div>
        </div>
        <div className="h-32 w-44 flex-1 text-center justify-center mt-10">
          <h1 className="text-7xl font-bold text-blue-500 mt-6 order-first md:order-last">SavingsSpot</h1>
          <p className="text-1xl font-normal text-black mt-2    md:ml-72">coupons for all</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
