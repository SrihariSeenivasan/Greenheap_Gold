
const plans = [
  { id: 1, name: "Chit Plan A", duration: "12 months", amount: "₹1,000/mo", status: "Active" },
  { id: 2, name: "Chit Plan B", duration: "24 months", amount: "₹2,000/mo", status: "Closed" },
];

const SavingPlan = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Chit Jewels Saving Plans</h1>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-yellow-700">Plan Name</th>
            <th className="px-4 py-2 text-yellow-700">Duration</th>
            <th className="px-4 py-2 text-yellow-700">Amount</th>
            <th className="px-4 py-2 text-yellow-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">{plan.name}</td>
              <td className="px-4 py-3">{plan.duration}</td>
              <td className="px-4 py-3">{plan.amount}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  plan.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                }`}>
                  {plan.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition">
        Add New Plan
      </button>
    </div>
  </div>
);

export default SavingPlan;
