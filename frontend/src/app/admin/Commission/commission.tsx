import { Eye } from 'lucide-react';
import { useState } from 'react';

const Commission = () => {
  const [partners, setPartners] = useState([
    { id: 1, name: "S. Kumar", amount: "₹5,000", date: "2024-06-01", status: "Paid" },
    { id: 2, name: "A. Singh", amount: "₹3,200", date: "2024-05-28", status: "Pending" },
    { id: 3, name: "M. Patel", amount: "₹4,500", date: "2024-05-25", status: "Paid" }
  ]);

  const handleStatusChange = (partnerId: number, newStatus: string) => {
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const handleView = (partnerName: string) => {
    alert(`Viewing details for ${partnerName}`);
  };

  const handleDelete = (partnerId: number) => {
    setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Commission Summary</h1>
          
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
                {partners.map((partner) => (
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
                            : "bg-red-100 text-red-700"
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
                          onClick={() => handleView(partner.name)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
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
              </tbody>
            </table>
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