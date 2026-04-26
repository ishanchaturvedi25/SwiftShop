import { useState } from 'react'
import assets from '../assets/assets'
import { toast } from 'react-toastify';
import apiClient from '../api/axios';

const Add = () => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('men');
  const [productSubCategory, setProductSubCategory] = useState('topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [productSizes, setProductSizes] = useState([]);
  const [productStock, setProductStock] = useState('');

  const handleSize = (size) => {
    if (productSizes.includes(size))
      setProductSizes(prev => prev.filter(item => item !== size));
    else
      setProductSizes(prev => [...prev, size]);
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      if (image1 === false && image2 === false && image3 === false && image4 === false && image5 === false) {
        toast.error('Please upload at least one image.');
        return;
      }

      if (productSizes.length === 0) {
        toast.error('Please select available sizes.');
        return;
      }
      
      const formData = new FormData();

      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('price', productPrice);
      formData.append('category', productCategory);
      formData.append('subCategory', productSubCategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(productSizes));
      formData.append('stock', productStock);
      if (image1)
        formData.append('images', image1);
      if (image2)
        formData.append('images', image2);
      if (image3)
        formData.append('images', image3);
      if (image4)
        formData.append('images', image4);
      if (image5)
        formData.append('images', image5);

      const response = await apiClient.post('/products', formData)

      if (response.status === 201) {
        toast.success('Product added successfully!');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setImage5(false);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('men');
        setProductSubCategory('topwear');
        setBestSeller(false);
        setProductSizes([]);
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      toast.error(error.response?.data?.error[0]?.message ||'Failed to add product. Please try again.');
    }
  }

  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2'>Upload Images</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp" hidden />
          </label>
          <label htmlFor="image5">
            <img className='w-20' src={!image5 ? assets.upload_area : URL.createObjectURL(image5)} alt="" />
            <input onChange={(e) => setImage5(e.target.files[0])} type="file" id="image5" accept="image/jpeg, image/png, image/webp, .jpg, .jpeg, .png, .webp" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setProductName(e.target.value)} value={productName} className='w-full max-w-125 px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setProductDescription(e.target.value)} value={productDescription} className='w-full max-w-125 px-3 py-2' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setProductCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setProductSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setProductPrice(e.target.value)} value={productPrice} className='w-full px-3 py-2 sm:w-30' type="number" placeholder='25' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => handleSize('S')}>
            <p className={`${productSizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => handleSize('M')}>
            <p className={`${productSizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => handleSize('L')}>
            <p className={`${productSizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => handleSize('XL')}>
            <p className={`${productSizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => handleSize('XXL')}>
            <p className={`${productSizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Stock</p>
        <input onChange={(e) => setProductStock(e.target.value)} value={productStock} className='w-full max-w-125 px-3 py-2' type="number" placeholder='25' required />
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add