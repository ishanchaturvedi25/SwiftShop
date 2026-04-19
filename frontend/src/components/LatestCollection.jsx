import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import apiClient from '../api/axios';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    async function fetchLatestProducts() {
        try {
            const data = await apiClient.get('/products?limit=20');
            console.log(data);
            setLatestProducts(data?.products || []);
        } catch (error) {
            console.log('Error while fetching the latest products', error);
            setLatestProducts([]);
        }
    }

    fetchLatestProducts();
  }, [])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores distinctio quos culpa soluta saepe debitis?
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item) => {
                    <ProductItem key={item.id} id={item.id} image={item.image} name={item.name} price={item.price} />
                })
            }
        </div>
    </div>
  )
}

export default LatestCollection