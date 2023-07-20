import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SavedCoupon = () => {
  const [savedcoupon, setsavedCoupon] = useState([]);

  const getSavedCoupon = () => {
    // Getting the coupons from the local storage
    const existingCoupons = localStorage.getItem('copiedCoupons');
    if (existingCoupons) {
      const parsedCoupons = JSON.parse(existingCoupons);
      setsavedCoupon(parsedCoupons);
    }
  };

  const handleremove = (id) => {
    const existingCoupons = localStorage.getItem('copiedCoupons');
    if (existingCoupons) {
      const parsedCoupons = JSON.parse(existingCoupons);
      const newCoupons = parsedCoupons.filter((coupon) => coupon.id !== id);
      localStorage.setItem('copiedCoupons', JSON.stringify(newCoupons));
      setsavedCoupon(newCoupons);
      toast.success('removed from the saved coupons')
    }
    else{
        toast.error('something went wrong')
    }
  };

  useEffect(() => {
    getSavedCoupon();
  }, []);

  return (
    <div className='p-10 bg-black h-screen'>
      <h1 className="text-white text-center text-4xl font-bold pt-6 mt-16 mb-10">
        <span className="text-blue-500">Saved </span> Coupons
      </h1>

      {savedcoupon.length === 0 ? (
        <p className="text-white text-center">No saved coupons.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedcoupon.map((coupon) => (
            <div key={coupon.id} className="rounded-lg shadow-lg dark:bg-gray-800 bg-grey-900">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800 dark:text-blue-600">
                    {coupon.code}
                  </span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{coupon.discount}%</span>
                </div>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-gray-200 rounded-full">
                  Expiration Date: {coupon.expiration_date}
                </span>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold ${
                    coupon.isValid ? 'text-green-700' : 'text-red-700'
                  } mr-2 mb-2 bg-gray-200 rounded-full`}
                >
                  {coupon.isValid ? 'Valid' : 'Expired'}
                </span>
                <button
                  onClick={() => handleremove(coupon.id)} 
                  className={`inline-block px-3 py-1 text-sm font-semibold 
                    text-red-700
                   mr-2 mb-2 bg-gray-200 rounded-full`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
        <ToastContainer />
    </div>
  );
};

export default SavedCoupon;
