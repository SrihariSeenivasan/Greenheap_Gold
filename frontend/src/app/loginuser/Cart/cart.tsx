import React from "react";

const Cart = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between border p-4 rounded-lg shadow">
          <div>
            <h2 className="font-medium">Product Name</h2>
            <p className="text-sm text-gray-500">Quantity: 1</p>
          </div>
          <div>
            <p className="text-lg font-bold">₹999</p>
          </div>
        </div>
        {/* Add more items here */}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ₹999</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
