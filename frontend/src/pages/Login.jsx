import React, { useContext, useEffect, useState } from 'react'
import apiClient from '../api/axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { isAuthenticated, setIsAuthenticated, navigate } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const route = currentState === 'Login' ? '/auth/login' : '/auth/signup';

      const response = await apiClient.post(route, formData);

      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setIsAuthenticated(true);
      toast.success(response.data.message);
      navigate('/collection');
    } catch (error) {
      toast.error(error.response?.data?.error[0]?.message || error.response?.data?.error || 'Something went wrong');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/collection');
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && (
        <input type="text" name='name' value={formData.name} onChange={onChangeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      )}
      <input type="email" name='email' value={formData.email} onChange={onChangeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" name='password' value={formData.password} onChange={onChangeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>{currentState === 'Login' ? 'Forgot your password?' : ''}</p>
        {
          currentState === 'Login'
          ? <p className='cursor-pointer' onClick={() => {setCurrentState('Sign Up'); setFormData({ name: '', email: '', password: '' });}}>Create Account</p>
          : <p className='cursor-pointer' onClick={() => {setCurrentState('Login'); setFormData({ name: '', email: '', password: '' });}}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer' disabled={loading}>
        {loading ? 'Processing...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login