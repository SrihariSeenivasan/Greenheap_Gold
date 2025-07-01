import { B2B_PRIMARY } from "../theme";

export default function Commission() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Commission / Incentive</h3>
      <div className="mb-4">
        <div className="font-semibold">Current Slab: <span className="text-gray-700">-</span></div>
        <div className="font-semibold">Monthly Earnings: <span className="text-gray-700">₹0</span></div>
        <div className="font-semibold">Payout Eligible: <span className="text-gray-700">No</span></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1">Month</th>
              <th className="px-2 py-1">Commission</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">-</td>
              <td className="px-2 py-1">-</td>
              <td className="px-2 py-1">-</td>
              <td className="px-2 py-1"><button className="text-xs underline">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
