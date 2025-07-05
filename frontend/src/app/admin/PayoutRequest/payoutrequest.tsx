import { Check, Eye, PenIcon, X } from 'lucide-react';
import { useState } from 'react';

const PayoutRequest = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      partner: 'S. Kumar',
      amount: 5000,
      date: '2024-06-15',
      status: 'Pending',
      requestDate: '2024-06-10'
    },
    {
      id: 2,
      partner: 'A. Singh',
      amount: 3200,
      date: '2024-06-12',
      status: 'Pending',
      requestDate: '2024-06-08'
    },
    {
      id: 3,
      partner: 'M. Patel',
      amount: 4500,
      date: '2024-06-10',
      status: 'Approved',
      requestDate: '2024-06-05'
    },
    {
      id: 4,
      partner: 'R. Sharma',
      amount: 2800,
      date: '2024-06-08',
      status: 'Rejected',
      requestDate: '2024-06-03'
    }
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<number>(0);

  const handleEdit = (id: number, amount: number) => {
    setEditId(id);
    setEditAmount(amount);
  };

  const handleEditSave = (id: number) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, amount: editAmount } : request
    ));
    setEditId(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Payout Request</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Partner</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Request Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{request.partner}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {editId === request.id ? (
                        <input
                          type="number"
                          value={editAmount}
                          onChange={e => setEditAmount(Number(e.target.value))}
                          className="border px-2 py-1 rounded w-24"
                        />
                      ) : (
                        <>₹{request.amount.toLocaleString()}</>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-700">{request.requestDate}</td>
                    <td className="py-4 px-4">
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-purple-500 ${getStatusColor(request.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-600">
              Total Requests: {requests.length} | 
              Pending: {requests.filter(r => r.status === 'Pending').length} | 
              Approved: {requests.filter(r => r.status === 'Approved').length} | 
              Rejected: {requests.filter(r => r.status === 'Rejected').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutRequest;