import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Addcoupons = () => {

    const [formdata,serFormdata]=useState({
        couponcode:"",
        discount:"",
        isvalid:"True",
        expirationDate:""

    })

    const onChange=(e)=>{
        serFormdata({...formdata,[e.target.name]:e.target.value})
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        const apiUrl = 'https://sahilchalke.pythonanywhere.com/createdata/';
        axios.post(apiUrl,{
            code:formdata.couponcode,
            discount:formdata.discount,
            isValid:formdata.isvalid,
            expiration_date:formdata.expirationDate

        })
            .then(response => {
                toast.success('coupon added successfully');
                console.log(response.data)
            })
            .catch(error => {
                toast.error('something went wrong');
                console.error('Error fetching data:', error);
            });
    }
  return (
    <div>
    
    <ToastContainer />

<div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
    
  
    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Add an coupon
        </h2>
        <form class="mt-8 space-y-6" onSubmit={handlesubmit}>
            <div>
                <label for="couponcode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Code</label>
                <input type="text" name="couponcode" id="couponcode" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Couponcode.." required
                onChange={onChange}
                />
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">discount</label>
                <input type="number" name="discount" id="discount" placeholder="Discount.." class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required 
                 onChange={onChange}
                />
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Isvalid</label>
                
                <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" required
                name='isvalid'
                 onChange={onChange}
                 value={formdata.isvalid} 
                >
                    <option>True</option>
                    <option>False</option>
                </select>
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration Date</label>
                <input type="date" name="expirationDate" id="expirationDate" placeholder="Expiration Date.." class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required 
                
                 onChange={onChange}
                />
            </div>

            
        
         
            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Create Coupon</button>
           
        
        </form>
    </div>
</div>
    </div>
  )
}

export default Addcoupons;