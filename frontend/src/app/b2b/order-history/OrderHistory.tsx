import { B2B_PRIMARY } from "../theme";

export default function OrderHistory() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Order History</h3>
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
              <td className="px-2 py-1">Delivered</td>
              <td className="px-2 py-1"><button className="text-xs underline">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
