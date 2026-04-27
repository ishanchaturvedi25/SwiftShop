import { useEffect, useState } from "react";
import apiClient from "../api/axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await apiClient.get("/products");
        setList(response.data.products);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };

    fetchList();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await apiClient.delete("/products/" + id);
      toast.success(response.data.message || "Product deleted successfully");
      setDeleteTarget(null);
      setList(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong while fetching the items');
    }
  };

  const confirmDelete = (product) => {
    setDeleteTarget(product);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item) => (
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={item._id}>
            <img className="w-12" src={item.imageUrls[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{"INR"}{item.price}</p>
            <button onClick={() => confirmDelete(item)}className="text-right md:text-center text-lg cursor-pointer">X</button>
          </div>
        ))}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
          <div className="absolute inset-0 bg-slate-900/50 transition-opacity" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
              <button type="button" onClick={cancelDelete} className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
                <span className="text-lg">×</span>
              </button>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
                  </svg>
                </div>
                <div>
                  <h2 id="delete-modal-title" className="text-xl font-semibold text-slate-900">Delete product?</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Are you sure you want to delete{" "}
                    <strong>{deleteTarget.name}</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" onClick={cancelDelete} className="inline-flex w-full justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Cancel
                </button>
                <button type="button" onClick={() => removeProduct(deleteTarget._id)} className="inline-flex w-full justify-center rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                  Delete product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
