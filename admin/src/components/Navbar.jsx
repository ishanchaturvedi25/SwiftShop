import apiClient from '../api/axios';
import assets from '../assets/assets'

const Navbar = ({ setIsAuthenticated }) => {

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      setIsAuthenticated(false);
    }
  }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
        <button onClick={logout} className='cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar