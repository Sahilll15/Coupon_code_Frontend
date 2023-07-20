import React from 'react';
import Hero from '../components/Hero';
import { useState } from 'react';

const cupone = [
    {
      "code": "SAVEMORE",
      "discount": "15.00",
      "isValid": true,
      "expiration_date": "2023-09-30"
    },
    {
      "code": "BIGSALE50",
      "discount": "50.00",
      "isValid": true,
      "expiration_date": "2023-10-15"
    },
    {
      "code": "FLASHDEAL",
      "discount": "20.00",
      "isValid": true,
      "expiration_date": "2023-08-31"
    },
    {
      "code": "NEWUSER10",
      "discount": "10.00",
      "isValid": true,
      "expiration_date": "2024-01-31"
    },
    {
      "code": "HOLIDAY25",
      "discount": "25.00",
      "isValid": false,
      "expiration_date": "2023-12-25"
    },
    {
      "code": "SUMMERSALE",
      "discount": "30.00",
      "isValid": true,
      "expiration_date": "2023-07-31"
    },
    {
      "code": "BACKTOSCHOOL",
      "discount": "12.50",
      "isValid": true,
      "expiration_date": "2023-09-15"
    },
    {
      "code": "FALL2023",
      "discount": "18.75",
      "isValid": true,
      "expiration_date": "2023-11-30"
    },
    {
      "code": "WINTERSPECIAL",
      "discount": "40.00",
      "isValid": true,
      "expiration_date": "2024-02-28"
    },
    {
      "code": "SPRINGSAVINGS",
      "discount": "20.00",
      "isValid": true,
      "expiration_date": "2024-04-30"
    },
    {
      "code": "EASTER20",
      "discount": "10.00",
      "isValid": true,
      "expiration_date": "2024-04-10"
    },
    {
      "code": "MOTHERSDAY",
      "discount": "25.00",
      "isValid": true,
      "expiration_date": "2024-05-12"
    },
    {
      "code": "FATHERSDAY",
      "discount": "20.00",
      "isValid": true,
      "expiration_date": "2024-06-20"
    },
    {
      "code": "INDEPENDENCE",
      "discount": "15.00",
      "isValid": true,
      "expiration_date": "2024-07-04"
    },
    {
        "code": "LABORDAY",
        "discount": "15.00",
        "isValid": false,
        "expiration_date": "2024-09-02"
        },

 
  ];
  



  const Home = () => {
    const [searchQuery, setSearchQuery] = useState(''); 
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredCoupons = cupone.filter((coupon) => {
        const couponCode = coupon.code.toLowerCase();
        const couponDiscount = coupon.discount.toString().toLowerCase();
        const query = searchQuery.toLowerCase();
      
        return couponCode.includes(query) || couponDiscount.includes(query);
      });
      
    return (
      <div className="dark:bg-gray-900">
        <Hero />
  
        <div className="px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900 bg-gray-900 ">
          <h1 className="text-white text-center text-4xl font-bold pt-6">
            <span className="text-blue-500">Coupons</span> for all
          </h1>
  
         
          <div className="my-6 mx-auto max-w-md bg-gray-900">
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Search for coupons..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
  
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
          {filteredCoupons.length === 0 ? (
            <div className="text-center text-white text-xl">No coupons match your search query.</div>
          ) : (
            filteredCoupons.map((coupon) => (
              <div key={coupon.code} className="rounded-lg shadow-lg dark:bg-gray-800 bg-grey-900">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800 dark:text-blue-600">{coupon.code}</span>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{coupon.discount}%</span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-gray-200 rounded-full">Expiration Date: {coupon.expiration_date}</span>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold ${coupon.isValid ? 'text-green-700' : 'text-red-700'} mr-2 mb-2 bg-gray-200 rounded-full`}>
                    {coupon.isValid ? 'Valid' : 'Expired'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
