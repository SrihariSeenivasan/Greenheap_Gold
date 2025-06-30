
const commissions = [
  { id: 1, partner: "S. Kumar", amount: "₹5,000", date: "2024-06-01", status: "Paid" },
  { id: 2, partner: "A. Singh", amount: "₹3,200", date: "2024-05-28", status: "Pending" },
  { id: 3, partner: "M. Patel", amount: "₹4,500", date: "2024-05-25", status: "Paid" },
];

const Commission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Commission Summary</h1>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-yellow-700">Partner</th>
              <th className="px-4 py-2 text-left text-yellow-700">Amount</th>
              <th className="px-4 py-2 text-left text-yellow-700">Date</th>
              <th className="px-4 py-2 text-left text-yellow-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">{c.partner}</td>
                <td className="px-4 py-3">{c.amount}</td>
                <td className="px-4 py-3">{c.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Commission;
