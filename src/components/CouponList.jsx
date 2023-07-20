
import React from 'react';
import CouponCard from './CouponCard';

const CouponList = ({ filteredCoupons, onCopy, onEdit, onDelete }) => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 ">
      {filteredCoupons.length === 0 ? (
        <div className="text-center text-white text-xl">No coupons match your search query.</div>
      ) : (
        filteredCoupons.map((coupon) => (
          <CouponCard
            key={coupon.code}
            coupon={coupon}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default CouponList;
