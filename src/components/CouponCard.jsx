
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CouponCard = ({ coupon, onCopy, onEdit, onDelete }) => {
  return (
    <div key={coupon.code} className="rounded-lg shadow-lg dark:bg-gray-800 bg-grey-900">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800 dark:text-blue-600">
            {coupon.code}
            <FontAwesomeIcon
              icon={faCopy}
              className="text-blue-500 cursor-pointer ml-2"
              onClick={() => onCopy(coupon)}
            />
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
      </div>
      <div className="px-6 pb-2">
        <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mr-2" onClick={() => onEdit(coupon)} />
        <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" onClick={() => onDelete(coupon.id)} />
      </div>
    </div>
  );
};

export default CouponCard;
