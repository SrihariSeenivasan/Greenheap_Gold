import { Check, Download, Eye, X } from 'lucide-react';
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

  const handleApprove = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{request.partner}</td>
                    <td className="py-4 px-4 text-gray-700">₹{request.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">{request.requestDate}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => console.log('View details for', request.partner)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        
                        {request.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total Requests: {requests.length} | 
              Pending: {requests.filter(r => r.status === 'Pending').length} | 
              Approved: {requests.filter(r => r.status === 'Approved').length} | 
              Rejected: {requests.filter(r => r.status === 'Rejected').length}
            </div>
            
            <button className="inline-flex items-center px-4 py-2 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-800 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutRequest;