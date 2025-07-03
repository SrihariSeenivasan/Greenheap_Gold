import React from "react";

const BuyNow = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Buy Now</h1>
      <div className="border p-4 rounded-lg shadow mb-4">
        <h2 className="font-medium">Product Name</h2>
        <p className="text-sm text-gray-500">Price: ₹999</p>
        <p className="text-sm text-gray-500">Delivery: 2-3 business days</p>
      </div>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default BuyNow;
