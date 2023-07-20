
import React from 'react';

const EditCouponModal = ({ editedCoupon, onChange, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50" />
      <div className="bg-white rounded-lg p-8 w-96 z-50">
        <h2 className="text-xl font-bold mb-4">Edit Coupon</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="code">
              Coupon Code:
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={editedCoupon.code}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="discount">
              Discount (%):
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={editedCoupon.discount}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="expiration_date">
              Expiration Date:
            </label>
            <input
              type="date"
              id="expiration_date"
              name="expiration_date"
              value={editedCoupon.expiration_date}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="isValid">
              Valid:
            </label>
            <input
              type="checkbox"
              id="isValid"
              name="isValid"
              checked={editedCoupon.isValid}
              onChange={onChange}
              className="w-5 h-5 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg"
              onClick={onSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCouponModal;
