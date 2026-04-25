import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import apiClient from '../api/axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/orders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error(error.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='mt-8'>
        {loading ? (
          <p className='text-gray-500'>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className='text-gray-500'>You have not placed any orders yet.</p>
        ) : (
          <div className='space-y-8'>
            {orders.map((order) => (
              <div key={order._id} className='border rounded-lg p-6 shadow-sm'>
                <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
                  <div>
                    <p className='text-sm text-gray-500'>Order ID</p>
                    <p className='font-medium break-all'>{order._id}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Placed</p>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Status</p>
                    <p className='uppercase'>{order.status}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Total</p>
                    <p>{currency} {order.totalPrice?.toFixed(2)}</p>
                  </div>
                </div>

                <div className='mt-6 space-y-3'>
                  <p className='font-semibold'>Items</p>
                  {order.items.map((item, index) => (
                    <div key={`${order._id}-${index}`} className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700'>
                      <div className='col-span-2'>{item.product?.name || 'Product'}</div>
                      <div>Size: {item.size}</div>
                      <div>Qty: {item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders