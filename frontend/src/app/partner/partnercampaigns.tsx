const campaigns = [
  { name: "SIP Booster June", desc: "Refer 5 SIPs, get ₹500 extra", start: "2024-06-01", end: "2024-06-30", multiplier: "2x" },
  { name: "Gold Fest", desc: "Sell 50g gold, get ₹1,000 bonus", start: "2024-06-10", end: "2024-06-20", multiplier: "1.5x" },
];

const PartnerCampaigns = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-yellow-700 mb-6">Active Campaigns & Bonuses</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-yellow-700">Campaign</th>
            <th className="px-4 py-2 text-yellow-700">Description</th>
            <th className="px-4 py-2 text-yellow-700">Start</th>
            <th className="px-4 py-2 text-yellow-700">End</th>
            <th className="px-4 py-2 text-yellow-700">Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3">{c.name}</td>
              <td className="px-4 py-3">{c.desc}</td>
              <td className="px-4 py-3">{c.start}</td>
              <td className="px-4 py-3">{c.end}</td>
              <td className="px-4 py-3">{c.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PartnerCampaigns;
