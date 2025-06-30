
const schemes = [
  { id: 1, name: "Gold Plant 2024", duration: "18 months", minInvest: "₹5,000", status: "Active" },
];

const PlantScheme = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gold Plant Schemes</h1>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-yellow-700">Scheme Name</th>
            <th className="px-4 py-2 text-yellow-700">Duration</th>
            <th className="px-4 py-2 text-yellow-700">Min Investment</th>
            <th className="px-4 py-2 text-yellow-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">{scheme.name}</td>
              <td className="px-4 py-3">{scheme.duration}</td>
              <td className="px-4 py-3">{scheme.minInvest}</td>
              <td className="px-4 py-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {scheme.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition">
        Add New Scheme
      </button>
    </div>
  </div>
);

export default PlantScheme;
