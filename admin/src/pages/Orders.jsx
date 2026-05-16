import { useState } from 'react';
import apiClient from '../api/axios';
import toast from 'react-toastify';
import assets from '../assets/assets';

const Orders = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders/admin');
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (orderId, status) => {
    try {
      const response = await apiClient.post('/orders/status', { orderId, status });
      if (response.status === 201) {
        await fetchOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useState(() => {
    fetchOrders();
  }, []);

  return (
    <div>
        <h3>Order Page</h3>
        <div>
          {
            orders.map((order) => {
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id}>
                <img className='w-12' src={assets.parcel_icon} alt="" />
                <div>
                  <div>
                    {
                      orders.items.map((item, idx) => {
                        if (idx === order.items.length - 1) {
                          return <p className='py-0.5' key={item._id}> {item.name} x {item.quantity} <span> {item.size} </span> </p>
                        } else {
                          return <p className='py-0.5' key={item._id}> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                        }
                      })
                    }
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                  <p className='mt-3'>Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>{order.totalPrice}</p>
                <select onChange={(e) => statusHandler(order._id, e.target.value)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            })
          }
        </div>
    </div>
  )
}

export default Orders