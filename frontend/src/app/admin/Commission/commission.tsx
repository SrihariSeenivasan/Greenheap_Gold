import { useState } from 'react';

const initialData = [
  { id: 1, name: "S. Kumar", amount: "₹5,000", date: "2024-06-01", status: "Paid", type: "partner" },
  { id: 2, name: "A. Singh", amount: "₹3,200", date: "2024-05-28", status: "Pending", type: "b2b" },
  { id: 3, name: "M. Patel", amount: "₹4,500", date: "2024-05-25", status: "Paid", type: "partner" },
  { id: 4, name: "B2B User", amount: "₹2,000", date: "2024-05-20", status: "Paid", type: "b2b" },
  { id: 5, name: "Partner User", amount: "₹1,800", date: "2024-05-18", status: "Pending", type: "partner" },
  { id: 6, name: "Another B2B", amount: "₹3,700", date: "2024-05-15", status: "Paid", type: "b2b" },
  { id: 7, name: "Partner X", amount: "₹2,900", date: "2024-05-10", status: "Rejected", type: "partner" },
];

const Commission = () => {
  const [partners, setPartners] = useState(initialData);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPartners = filter === 'all' ? partners : partners.filter(p => p.type === filter);
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const paginatedPartners = filteredPartners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStatusChange = (partnerId: number, newStatus: string) => {
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const handleDelete = (partnerId: number) => {
    setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Commission Summary</h1>
          {/* Filter */}
          <div className="mb-4 flex gap-3">
            <label className="font-semibold text-[#7a1335]">Filter:</label>
            <select
              value={filter}
              onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border rounded bg-white text-gray-700"
            >
              <option value="all">All</option>
              <option value="b2b">B2B</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-[#7a1335] font-semibold">Partner</th>
                  <th className="text-left py-3 px-4 text-[#7a1335] font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-[#7a1335] font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-[#7a1335] font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-[#7a1335] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPartners.map((partner) => (
                  <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800">{partner.name}</td>
                    <td className="py-4 px-4 text-gray-800">{partner.amount}</td>
                    <td className="py-4 px-4 text-gray-800">{partner.date}</td>
                    <td className="py-4 px-4">
                      <select 
                        value={partner.status}
                        onChange={(e) => handleStatusChange(partner.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-none outline-none cursor-pointer ${
                          partner.status === "Paid" 
                            ? "bg-green-100 text-green-700" 
                            : partner.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDelete(partner.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedPartners.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No commissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-4 mb-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="mt-6">
            <button className="bg-[#7a1335] hover:bg-[#5a0e28] text-white font-semibold py-3 px-6 rounded transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;