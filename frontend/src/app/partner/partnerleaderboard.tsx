const leaderboard = [
  { rank: 1, name: "A. Singh", gold: "100g", sips: 20, commission: "₹10,000" },
  { rank: 2, name: "M. Patel", gold: "80g", sips: 15, commission: "₹8,000" },
  { rank: 3, name: "S. Kumar", gold: "60g", sips: 10, commission: "₹6,000" },
];

const PartnerLeaderboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-yellow-700 mb-6">Partner Leaderboard</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-yellow-700">Rank</th>
            <th className="px-4 py-2 text-yellow-700">Name</th>
            <th className="px-4 py-2 text-yellow-700">Gold Sold</th>
            <th className="px-4 py-2 text-yellow-700">SIPs Started</th>
            <th className="px-4 py-2 text-yellow-700">Commission</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((p, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-bold">{p.rank}</td>
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">{p.gold}</td>
              <td className="px-4 py-3">{p.sips}</td>
              <td className="px-4 py-3">{p.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 text-sm text-gray-500">
      Top partners win special rewards every month!
    </div>
  </div>
);

export default PartnerLeaderboard;
