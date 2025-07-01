import { B2B_PRIMARY } from "../theme";

export default function Wallet() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Wallet Balance</div>
          <div className="text-2xl font-bold mb-4">₹0</div>
          <button className="py-2 px-4 rounded text-white font-semibold" style={{ background: B2B_PRIMARY }}>
            Top-up Wallet
          </button>
        </div>
        <div className="flex-1">
          <div className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Credit Used / Available</div>
          <div className="mb-4">Used: ₹0 / Available: ₹0</div>
          <button className="py-2 px-4 rounded text-white font-semibold" style={{ background: B2B_PRIMARY }}>
            Request Credit Limit Increase
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Wallet Transaction History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Type</th>
                <th className="px-2 py-1">Amount</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
