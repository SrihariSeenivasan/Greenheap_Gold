const commissions = [
  { date: "2024-06-01", user: "A. Singh", type: "SIP", qty: "₹2,000", commission: "₹200", status: "Approved" },
  { date: "2024-06-02", user: "M. Patel", type: "Gold", qty: "5g", commission: "₹150", status: "Pending" },
];

const PartnerCommission = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Commission & Earnings</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-[#7a1335]">Date</th>
            <th className="px-4 py-2 text-[#7a1335]">User</th>
            <th className="px-4 py-2 text-[#7a1335]">Type</th>
            <th className="px-4 py-2 text-[#7a1335]">Qty/Amount</th>
            <th className="px-4 py-2 text-[#7a1335]">Commission</th>
            <th className="px-4 py-2 text-[#7a1335]">Status</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((c, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3">{c.date}</td>
              <td className="px-4 py-3">{c.user}</td>
              <td className="px-4 py-3">{c.type}</td>
              <td className="px-4 py-3">{c.qty}</td>
              <td className="px-4 py-3">{c.commission}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  c.status === "Approved" ? "bg-green-100 text-green-700" : "bg-[#fbeaf0] text-[#7a1335]"
                }`}>
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="mt-6 bg-[#7a1335] hover:bg-[#5a0e28] text-white font-semibold py-2 px-6 rounded transition">
      Download CSV
    </button>
  </div>
);

export default PartnerCommission;
