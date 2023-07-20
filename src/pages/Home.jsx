import React from 'react';
import Hero from '../components/Hero';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {
  const [cupone, setCupone] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCoupon, setEditedCoupon] = useState({
    code: '',
    discount: 0,
    expiration_date: '',
    isValid: false,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCopyCoupon = (couponCode) => {
    
    const existingCopiedCoupons = localStorage.getItem('copiedCoupons');
    const copiedCoupons = existingCopiedCoupons ? JSON.parse(existingCopiedCoupons) : [];
  
    if (!copiedCoupons.includes(couponCode)) {
    
      navigator.clipboard.writeText(couponCode);
      copiedCoupons.push(couponCode);
      localStorage.setItem('copiedCoupons', JSON.stringify(copiedCoupons));
      toast.success('Coupon copied to clipboard and added to localStorage');
    } else {
     
      toast.info('Coupon is already in localStorage');
    }
  };
  
  const handleEditCouponChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    
    const newValue = type === 'checkbox' ? checked : value;
  
    setEditedCoupon((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `https://sahilchalke.pythonanywhere.com/updatedata/${editedCoupon.id}/`;
    axios.put(apiUrl, editedCoupon)
      .then(response => {
        toast.success('coupon updated successfully');
        console.log(response.data)
      })
      .catch(error => {
        toast.error('something went wrong');
        console.error('Error fetching data:', error);
      });
  };


  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = (coupon) => {
    setEditedCoupon({
      id: coupon.id, 
      code: coupon.code,
      discount: coupon.discount,
      expiration_date: coupon.expiration_date,
      isValid: coupon.isValid,
    });
    setShowEditModal(true);
  };

  const filteredCoupons = cupone.filter((coupon) => {
    const couponCode = coupon.code.toLowerCase();
    const couponDiscount = coupon.discount.toString().toLowerCase();
    const query = searchQuery.toLowerCase();
  
    return couponCode.includes(query) || couponDiscount.includes(query);
  });
  

  useEffect(() => {
    const apiUrl = 'https://sahilchalke.pythonanywhere.com/';
    axios.get(apiUrl)
      .then(response => {
        setCupone(response.data);
        console.log(response.data)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleDelete = (couponCode) => {

  
    const apiUrl = `https://sahilchalke.pythonanywhere.com/deletedata/${couponCode}/`;
    axios.delete(apiUrl)
      .then(response => {
        toast.success('coupon deleted successfully');
        console.log(response.data)
       
      })
      .catch(error => {
        toast.error('something went wrong');
        console.error('Error fetching data:', error);
      });
  

    
  };

 



  return (
    <div className="dark:bg-gray-900">
      <ToastContainer />
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

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 ">
          {filteredCoupons.length === 0 ? (
            <div className="text-center text-white text-xl">No coupons match your search query.</div>
          ) : (
            filteredCoupons.map((coupon) => (
              <div key={coupon.code} className="rounded-lg shadow-lg dark:bg-gray-800 bg-grey-900">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800 dark:text-blue-600">{coupon.code}
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-blue-500 cursor-pointer ml-2"
                      onClick={() => handleCopyCoupon(coupon)}
                    />
                    </span>
                    
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{coupon.discount}%</span>
                   
                
                  </div>
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 bg-gray-200 rounded-full">Expiration Date: {coupon.expiration_date}</span>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold ${coupon.isValid ? 'text-green-700' : 'text-red-700'} mr-2 mb-2 bg-gray-200 rounded-full`}>
                    {coupon.isValid ? 'Valid' : 'Expired'}
                  </span>
                </div>
                <div className="px-6 pb-2">
                <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 cursor-pointer mr-2"
                    onClick={() => handleOpenEditModal(coupon)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(coupon.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      //Modal for editing
      {showEditModal && (
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
            onChange={handleEditCouponChange}
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
            onChange={handleEditCouponChange}
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
            onChange={handleEditCouponChange}
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
            onChange={handleEditCouponChange}
            className="w-5 h-5 border rounded-lg focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg"
            onClick={handleEditSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            onClick={handleCloseEditModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
    
  );
};

export default Home;
