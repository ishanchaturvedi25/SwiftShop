import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  const visible = location.pathname === '/collection';

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input type="text" placeholder='Search' className='flex outline-none bg-inherit text-sm' value={search} onChange={(e) => setSearch(e.target.value)} />
            <img src={assets.search_icon} alt="" className='w-4' />
        </div>
        <img src={assets.cross_icon} alt="" className='inline w-3 cursor-pointer' onClick={() => setShowSearch(false)} />
    </div>
  ) : null
}

export default SearchBar