import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiClient from '../api/axios';
import { toast } from 'react-toastify';

const Verify = () => {

  const { navigate, setCartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    if (success == undefined || !orderId)
        return;

    try {
        const response = await apiClient.post('/orders/verify', { success, orderId });
        if (response.data.order) {
            setCartItems({});
            navigate('/orders');
        }
    } catch (error) {
        navigate('/cart');
        toast.error(error.message);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div>
        
    </div>
  )
}

export default Verify