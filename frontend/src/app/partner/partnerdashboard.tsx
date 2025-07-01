const kpis = [
  { label: "Total Clicks", value: 120 },
  { label: "Referred Users", value: 35 },
  { label: "Gold Purchased", value: "₹2,50,000" },
  { label: "SIP Plans Started", value: 12 },
  { label: "Commission Earned", value: "₹15,000" },
  { label: "Pending Payout", value: "₹2,000" },
];

const PartnerDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Partner Dashboard</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-8">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-gray-800">{kpi.value}</div>
          <div className="text-gray-600">{kpi.label}</div>
        </div>
      ))}
    </div>
    {/* <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Clicks & Sales Over Time</h2>
      <div className="h-32 sm:h-40 flex items-center justify-center text-gray-400">[Graph Placeholder]</div>
    </div> */}
  </div>
);

export default PartnerDashboard;
