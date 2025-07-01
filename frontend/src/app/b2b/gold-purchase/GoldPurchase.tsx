import { B2B_PRIMARY } from "../theme";

export default function GoldPurchase() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Gold Purchase</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Gold Rate (per gram)</label>
            <input className="w-full border rounded px-3 py-2" value="₹0" readOnly />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input className="w-full border rounded px-3 py-2" type="number" placeholder="Grams or ₹" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Delivery/Pickup</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Delivery</option>
              <option>Pickup</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Wallet</option>
              <option>Bank Transfer</option>
              <option>UPI</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 rounded font-semibold text-white mt-2"
              style={{ background: B2B_PRIMARY }}
            >
              Generate Invoice & Purchase
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Purchase History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Order ID</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Quantity</th>
                <th className="px-2 py-1">Total Price</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">Pending</td>
                <td className="px-2 py-1"><button className="text-xs underline">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
