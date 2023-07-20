import React from 'react';
import Hero from '../components/Hero';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CouponList from '../components/CouponList';
import EditCouponModal from '../components/EditCouponModal';
import { useDelete,useUpdate } from '../hooks/Coupon';




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
    console.log(e.target)
  
    
    const newValue = type === 'checkbox' ? checked : value;
  
    setEditedCoupon((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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


   //usedelete hook
   const [deleteCoupon] = useDelete();

   //delete coupon function
  const handleDelete = (couponId) => {
    //uses the delete coupon hook
    deleteCoupon(couponId);
  };

 

  //useupdate hook
  const [update]=useUpdate();

  //edit coupon function
  const handleEditSubmit = (e) => {
    e.preventDefault();
    //uses the update coupon hook
    update(editedCoupon);
    setShowEditModal(false);
  };



 



  return (
  
    <>
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

        <CouponList filteredCoupons={filteredCoupons} onCopy={handleCopyCoupon} onEdit={handleOpenEditModal} onDelete={handleDelete} />
      </div>

      {showEditModal && (
        <EditCouponModal editedCoupon={editedCoupon} onChange={handleEditCouponChange} onSubmit={handleEditSubmit} onClose={handleCloseEditModal} />
      )}
    </div></>
    
  );
};

export default Home;
