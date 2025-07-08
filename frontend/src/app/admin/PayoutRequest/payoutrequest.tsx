import { useState } from 'react';

const PayoutRequest = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      partner: 'S. Kumar',
      userType: 'User',
      amount: 5000,
      date: '2024-06-15',
      status: 'Pending',
      requestDate: '2024-06-10',
      withdrawType: 'UPI',
      upiId: 'skumar@paytm',
      bankDetails: null,
      walletPhone: null
    },
    {
      id: 2,
      partner: 'A. Singh',
      userType: 'B2B',
      amount: 3200,
      date: '2024-06-12',
      status: 'Pending',
      requestDate: '2024-06-08',
      withdrawType: 'Bank',
      upiId: null,
      bankDetails: {
        accountNumber: '****6789',
        bankName: 'HDFC Bank',
        ifsc: 'HDFC0001234'
      },
      walletPhone: null
    },
    {
      id: 3,
      partner: 'M. Patel',
      userType: 'Partner',
      amount: 4500,
      date: '2024-06-10',
      status: 'Approved',
      requestDate: '2024-06-05',
      withdrawType: 'Wallet',
      upiId: null,
      bankDetails: null,
      walletPhone: '+91-9876543210'
    },
    {
      id: 4,
      partner: 'R. Sharma',
      userType: 'User',
      amount: 2800,
      date: '2024-06-08',
      status: 'Rejected',
      requestDate: '2024-06-03',
      withdrawType: 'UPI',
      upiId: 'rsharma@gpay',
      bankDetails: null,
      walletPhone: null
    },
    {
      id: 5,
      partner: 'J. Gupta',
      userType: 'B2B',
      amount: 7500,
      date: '2024-06-14',
      status: 'Pending',
      requestDate: '2024-06-12',
      withdrawType: 'Bank',
      upiId: null,
      bankDetails: {
        accountNumber: '****2345',
        bankName: 'SBI',
        ifsc: 'SBIN0012345'
      },
      walletPhone: null
    }
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<number>(0);

  // Filter state
  const [userTypeFilter, setUserTypeFilter] = useState<string>("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtering logic
  const filteredRequests = userTypeFilter === "All"
    ? requests
    : requests.filter(r => r.userType.toLowerCase() === userTypeFilter.toLowerCase());

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'User':
        return 'bg-blue-100 text-blue-800';
      case 'B2B':
        return 'bg-purple-100 text-purple-800';
      case 'Partner':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWithdrawTypeColor = (withdrawType: string) => {
    switch (withdrawType) {
      case 'UPI':
        return 'bg-orange-100 text-orange-800';
      case 'Bank':
        return 'bg-cyan-100 text-cyan-800';
      case 'Wallet':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderWithdrawDetails = (request: any) => {
    switch (request.withdrawType) {
      case 'UPI':
        return (
          <div className="text-sm text-gray-600">
            <strong>UPI ID:</strong> {request.upiId}
          </div>
        );
      case 'Bank':
        return (
          <div className="text-sm text-gray-600">
            <strong>A/C:</strong> {request.bankDetails?.accountNumber}<br />
            <strong>Bank:</strong> {request.bankDetails?.bankName}<br />
            <strong>IFSC:</strong> {request.bankDetails?.ifsc}
          </div>
        );
      case 'Wallet':
        return (
          <div className="text-sm text-gray-600">
            <strong>Phone:</strong> {request.walletPhone}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Payout Request Management</h1>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label className="font-medium text-gray-700">Filter by User Type:</label>
          <select
            value={userTypeFilter}
            onChange={e => {
              setUserTypeFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on filter change
            }}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            style={{ minWidth: 120 }}
          >
            <option value="All">All</option>
            <option value="User">User</option>
            <option value="B2B">B2B</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Partner</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">User Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Request Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Withdraw Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Details</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{request.partner}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUserTypeColor(request.userType)}`}>
                      {request.userType}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {editId === request.id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={e => setEditAmount(Number(e.target.value))}
                        className="border px-2 py-1 rounded w-24"
                      />
                    ) : (
                      <span className="font-semibold">₹{request.amount.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{request.requestDate}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWithdrawTypeColor(request.withdrawType)}`}>
                      {request.withdrawType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {renderWithdrawDetails(request)}
                  </td>
                  <td className="py-4 px-6">
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
              {paginatedRequests.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No payout requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{requests.length}</div>
              <div className="text-sm text-blue-800">Total Requests</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{requests.filter(r => r.status === 'Pending').length}</div>
              <div className="text-sm text-yellow-800">Pending</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'Approved').length}</div>
              <div className="text-sm text-green-800">Approved</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{requests.filter(r => r.status === 'Rejected').length}</div>
              <div className="text-sm text-red-800">Rejected</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">By User Type</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User:</span>
                  <span className="font-medium">{requests.filter(r => r.userType === 'User').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>B2B:</span>
                  <span className="font-medium">{requests.filter(r => r.userType === 'B2B').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Partner:</span>
                  <span className="font-medium">{requests.filter(r => r.userType === 'Partner').length}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">By Withdraw Type</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>UPI:</span>
                  <span className="font-medium">{requests.filter(r => r.withdrawType === 'UPI').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bank:</span>
                  <span className="font-medium">{requests.filter(r => r.withdrawType === 'Bank').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wallet:</span>
                  <span className="font-medium">{requests.filter(r => r.withdrawType === 'Wallet').length}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Total Amount</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending:</span>
                  <span className="font-medium">₹{requests.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Approved:</span>
                  <span className="font-medium">₹{requests.filter(r => r.status === 'Approved').reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span className="font-medium">₹{requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutRequest;