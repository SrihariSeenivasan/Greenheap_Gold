
const spiPlans = [
  { id: 1, name: "SPI Plan 1", tenure: "6 months", monthly: "₹500", status: "Active" },
  { id: 2, name: "SPI Plan 2", tenure: "12 months", monthly: "₹1,000", status: "Active" },
];

const SIPPlan = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Digital Gold SPI Plans</h1>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-yellow-700">Plan Name</th>
            <th className="px-4 py-2 text-yellow-700">Tenure</th>
            <th className="px-4 py-2 text-yellow-700">Monthly Amount</th>
            <th className="px-4 py-2 text-yellow-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {spiPlans.map((plan) => (
            <tr key={plan.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">{plan.name}</td>
              <td className="px-4 py-3">{plan.tenure}</td>
              <td className="px-4 py-3">{plan.monthly}</td>
              <td className="px-4 py-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {plan.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition">
        Add New SPI Plan
      </button>
    </div>
  </div>
);

export default SIPPlan;
