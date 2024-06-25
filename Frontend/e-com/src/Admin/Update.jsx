import React from 'react'

const Update = () => {
  return (
    <div>
      <div class="flex flex-col items-center justify-end ml-60 max-h-screen">
  <div class="mb-4 mt-12">
    <h3 class="text-xl font-bold">Add New Product</h3>
  </div>
  <div class="w-full">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" encType="multipart/file">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Product Name</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="productName" type="text" placeholder="Product Name" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" rows="3"></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="originalPrice">Original Price</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="originalPrice" type="text" placeholder="Original Price" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Price" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="category">Category</label>
        <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing and Apparel">Clothing and Apparel</option>
      
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="stock">Stock</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="text" placeholder="Stock" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="images">Images</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" type="file" placeholder="Images" multiple />
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Product</button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Update
