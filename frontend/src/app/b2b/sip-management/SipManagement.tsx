import { B2B_PRIMARY } from "../theme";

export default function SipManagement() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>SIP Customer Management</h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input className="border rounded px-3 py-2" placeholder="Customer Name" />
          <input className="border rounded px-3 py-2" type="date" placeholder="Start Date" />
          <input className="border rounded px-3 py-2" type="number" placeholder="SIP Amount" />
          <input className="border rounded px-3 py-2" type="number" placeholder="Duration (months)" />
          <button
            type="submit"
            className="md:col-span-3 py-2 rounded font-semibold text-white"
            style={{ background: B2B_PRIMARY }}
          >
            Add SIP
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Start Date</th>
                <th className="px-2 py-1">Amount</th>
                <th className="px-2 py-1">Duration</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Commission</th>
                <th className="px-2 py-1">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1">Active</td>
                <td className="px-2 py-1">-</td>
                <td className="px-2 py-1"><button className="text-xs underline">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
