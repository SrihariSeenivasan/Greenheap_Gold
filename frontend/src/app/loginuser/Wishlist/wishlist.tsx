import React from "react";

const Wishlist = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between border p-4 rounded-lg shadow">
          <div>
            <h2 className="font-medium">Wishlist Item</h2>
            <p className="text-sm text-gray-500">Category: Gold</p>
          </div>
          <div className="space-x-2">
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
              Add to Cart
            </button>
            <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
              Remove
            </button>
          </div>
        </div>
        {/* Add more items here */}
      </div>
    </div>
  );
};

export default Wishlist;
