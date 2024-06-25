import React, { useState } from 'react'
import AxiosApi from '../AxiosAPI';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify'

const UpdateProduct = ({products}) => {
  const {handleSubmit:handleSubmit3 , register:register3} = useForm()
const [image,setimage] = useState()
const handleimage = (e) =>setimage(e.target.files)

console.log(products._id,"getting")

const product = async(data)=>{
  const Mydata = new FormData();
  for (let [key,value] of Object.entries(data)){
   Mydata.append(key,value)
  }
 for (let images of image){
  Mydata.append('image',images)
 }
  try{
  
    const response = await AxiosApi.put(`/admin/product/${products._id}`,Mydata);
    console.log(response)
    toast.success(response.data.message)

  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
  }
}




  return (
    <div className="flex flex-col items-center justify-end  ml-60 max-h-screen ">
      <div className="mb-4 mt-12">
        <h3 className="text-xl font-bold ">Update Product</h3>
      </div>
      <div className="w-full ">
        <form className="bg-white shadow-md border border-zinc-300 rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit3(product)} encType="multipart/file" >
   
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              placeholder="Product Name"
              {
                ...register3('productname')
              }
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Description"
              rows="3"{
                ...register3('description')
              }
            ></textarea>
          </div>
          <div className=" flex space-x-2">

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="originalPrice">
              Original Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="originalPrice"
              type="text"
              placeholder="Original Price" {
                ...register3('Originalprice')
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              placeholder="Price"{
                ...register3('Price')
              }
            />
          </div>
          </div>
          <div className=" flex space-x-2">

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category" {
                ...register3('category')
              }
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing and Apparel">Clothing and Apparel</option>
              <option value="Home and Kitchen">Home and Kitchen</option>
              <option value="Beauty and Personal Care">Beauty and Personal Care</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Books and Media">Books and Media</option>
              <option value="Toys and Games">Toys and Games</option>
              <option value="Sports and Outdoors">Sports and Outdoors</option>
              <option value="Food and Beverages">Food and Beverages</option>
              <option value="Jewelry and Accessories">Jewelry and Accessories</option>
              <option value="Automotive">Automotive</option>
              <option value="Pets">Pets</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="text"
              placeholder="Stock" {
                ...register3('stock')
              }
            />
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              images
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="file"
              placeholder="images"
              onChange={handleimage}
              multiple
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="sumbit"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default UpdateProduct
