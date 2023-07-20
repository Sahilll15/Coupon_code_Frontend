import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const host = 'https://sahilchalke.pythonanywhere.com/';


export function useDelete() {
    const [isLoading, setIsLoading] = useState(false);


    const deleteCoupon = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${host}/deletedata/${id}/`);
            console.log(response);
            toast.success('Coupon deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        setIsLoading(false);
    }

    return [deleteCoupon, isLoading];

}


export function useUpdate() {
    const [isLoading, setIsLoading] = useState(false);

    const update = async (editedCoupon) => {
        console.log(editedCoupon)
        setIsLoading(false);
        try {
            const response = await axios.put(`https://sahilchalke.pythonanywhere.com/updatedata/${editedCoupon.id}/`, editedCoupon);
            console.log(response);
            toast.success('Coupon updated successfully');


        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');

        }

    }

    return [update, isLoading];

}