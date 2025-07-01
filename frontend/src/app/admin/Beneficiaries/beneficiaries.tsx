const beneficiaries = [
  { id: 1, name: "Amit Kumar", relation: "Son", account: "XXXX1234", status: "Active" },
  { id: 2, name: "Priya Sharma", relation: "Wife", account: "XXXX5678", status: "Pending" },
];

const Beneficiaries = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center p-6">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Beneficiaries</h1>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-[#7a1335]">Name</th>
            <th className="px-4 py-2 text-[#7a1335]">Relation</th>
            <th className="px-4 py-2 text-[#7a1335]">Account</th>
            <th className="px-4 py-2 text-[#7a1335]">Status</th>
            <th className="px-4 py-2 text-[#7a1335]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((b) => (
            <tr key={b.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">{b.name}</td>
              <td className="px-4 py-3">{b.relation}</td>
              <td className="px-4 py-3">{b.account}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  b.status === "Active" ? "bg-green-100 text-green-700" : "bg-[#fbeaf0] text-[#7a1335]"
                }`}>
                  {b.status}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2">
                <button className="bg-[#7a1335] hover:bg-[#a31d4b] text-white px-3 py-1 rounded text-xs">Edit</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition">
        Add Beneficiary
      </button>
    </div>
  </div>
);

export default Beneficiaries;

