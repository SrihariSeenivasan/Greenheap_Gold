import { Building, Calendar, Edit, Eye, Filter, Plus, Search, Trash2, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface GoldOrder {
  id: string;
  customerName: string;
  customerType: 'user' | 'b2b';
  orderDate: string;
  goldType: string;
  quantity: number;
  pricePerGram: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
}

const GoldOrders: React.FC = () => {
  const [orders, setOrders] = useState<GoldOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<GoldOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'user' | 'b2b'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<GoldOrder | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editOrder, setEditOrder] = useState<GoldOrder | null>(null);
  const ordersPerPage = 10;

  // Sample data - in real app, this would come from an API
  useEffect(() => {
    const sampleOrders: GoldOrder[] = [
      {
        id: '1',
        customerName: 'John Smith',
        customerType: 'user',
        orderDate: '2024-01-15',
        goldType: '24K Gold Bar',
        quantity: 10,
        pricePerGram: 65.50,
        totalAmount: 655.00,
        status: 'completed',
        paymentMethod: 'Credit Card'
      },
      {
        id: '2',
        customerName: 'ABC Jewelry Corp',
        customerType: 'b2b',
        orderDate: '2024-01-14',
        goldType: '22K Gold Coins',
        quantity: 100,
        pricePerGram: 62.30,
        totalAmount: 6230.00,
        status: 'processing',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: '3',
        customerName: 'Sarah Johnson',
        customerType: 'user',
        orderDate: '2024-01-13',
        goldType: '18K Gold Jewelry',
        quantity: 25,
        pricePerGram: 48.75,
        totalAmount: 1218.75,
        status: 'pending',
        paymentMethod: 'PayPal'
      },
      {
        id: '4',
        customerName: 'Golden Enterprise Ltd',
        customerType: 'b2b',
        orderDate: '2024-01-12',
        goldType: '24K Gold Bar',
        quantity: 250,
        pricePerGram: 65.50,
        totalAmount: 16375.00,
        status: 'completed',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: '5',
        customerName: 'Mike Davis',
        customerType: 'user',
        orderDate: '2024-01-11',
        goldType: '22K Gold Coins',
        quantity: 5,
        pricePerGram: 62.30,
        totalAmount: 311.50,
        status: 'cancelled',
        paymentMethod: 'Credit Card'
      }
    ];
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = orders;
    
    // Apply customer type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(order => order.customerType === filterType);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.goldType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [filterType, searchTerm, orders]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleViewOrder = (order: GoldOrder) => {
    setSelectedOrder(order);
    setIsCreateMode(false);
    setShowPopup(true);
  };

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsCreateMode(true);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOrder(null);
    setIsCreateMode(false);
    setIsEditMode(false);
    setEditOrder(null);
  };

  const handleEditOrder = (order: GoldOrder) => {
    setEditOrder(order);
    setIsEditMode(true);
    setShowPopup(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editOrder) return;
    const { name, value } = e.target;
    setEditOrder({ ...editOrder, [name]: name === "quantity" || name === "pricePerGram" ? Number(value) : value });
  };

  const handleEditSave = () => {
    if (!editOrder) return;
    setOrders(prev =>
      prev.map(o =>
        o.id === editOrder.id
          ? {
              ...editOrder,
              totalAmount: editOrder.quantity * editOrder.pricePerGram,
            }
          : o
      )
    );
    setShowPopup(false);
    setIsEditMode(false);
    setEditOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCustomerTypeIcon = (type: string) => {
    return type === 'b2b' ? <Building className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen" style={{  padding: "1.5rem" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "#7a1335" }}>Gold Orders Management</h1>
          <p className="text-[#7a1335]">Manage and track all gold orders from users and B2B clients</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#7a1335]" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#7a1335]" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'user' | 'b2b')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                >
                  <option value="all">All Customers</option>
                  <option value="user">Individual Users</option>
                  <option value="b2b">B2B Clients</option>
                </select>
              </div>
            </div>

            {/* Create Order Button */}
            <button
              onClick={handleCreateOrder}
              className="bg-[#7a1335] text-white px-6 py-2 rounded-lg  transition-all duration-300 flex items-center gap-2 font-medium"
            >
              <Plus className="h-4 w-4" />
              Create New Order
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: "#7a1335", color: "#fff" }}>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Gold Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Quantity (g)</th>
                  <th className="px-6 py-4 text-left font-semibold">Total Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium" style={{ color: "#7a1335" }}>#{order.id}</td>
                    <td className="px-6 py-4" style={{ color: "#7a1335" }}>{order.customerName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getCustomerTypeIcon(order.customerType)}
                        <span className="capitalize" style={{ color: "#7a1335" }}>{order.customerType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: "#7a1335" }}>{order.goldType}</td>
                    <td className="px-6 py-4" style={{ color: "#7a1335" }}>{order.quantity}g</td>
                    <td className="px-6 py-4 font-semibold" style={{ color: "#7a1335" }}>${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-[#7a1335] hover:bg-[#fbeaf0] rounded-lg transition-colors duration-200"
                          title="View Order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 text-[#7a1335] hover:bg-[#fbeaf0] rounded-lg transition-colors duration-200"
                          title="Edit Order"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm" style={{ color: "#7a1335" }}>
              Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: "#7a1335" }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm border rounded-lg ${
                    currentPage === page
                      ? 'bg-[#7a1335] text-white border-[#7a1335]'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                  style={currentPage === page ? {} : { color: "#7a1335" }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: "#7a1335" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#7a1335" }}>
                {isCreateMode ? 'Create New Order' : isEditMode ? 'Edit Order' : 'Order Details'}
              </h2>
              <button
                onClick={handleClosePopup}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {isEditMode && editOrder ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={editOrder.customerName}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Customer Type</label>
                  <select
                    name="customerType"
                    value={editOrder.customerType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  >
                    <option value="user">Individual User</option>
                    <option value="b2b">B2B Client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Gold Type</label>
                  <input
                    type="text"
                    name="goldType"
                    value={editOrder.goldType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Quantity (grams)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editOrder.quantity}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Price per Gram</label>
                  <input
                    type="number"
                    name="pricePerGram"
                    value={editOrder.pricePerGram}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#7a1335" }}>Payment Method</label>
                  <input
                    type="text"
                    name="paymentMethod"
                    value={editOrder.paymentMethod}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent outline-none text-[#7a1335]"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="flex-1 px-4 py-2 border border-gray-300 text-[#7a1335] rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEditSave}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#bf7e1a] to-[#7a1335] text-white rounded-lg hover:from-[#a31d4b] hover:to-[#7a1335] transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : isCreateMode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none">
                    <option value="user">Individual User</option>
                    <option value="b2b">B2B Client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gold Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none">
                    <option value="24K Gold Bar">24K Gold Bar</option>
                    <option value="22K Gold Coins">22K Gold Coins</option>
                    <option value="18K Gold Jewelry">18K Gold Jewelry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (grams)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                  >
                    Create Order
                  </button>
                </div>
              </div>
            ) : selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                    <p className="text-gray-900 font-semibold">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedOrder.orderDate}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    {getCustomerTypeIcon(selectedOrder.customerType)}
                    {selectedOrder.customerName} ({selectedOrder.customerType})
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gold Type</label>
                  <p className="text-gray-900">{selectedOrder.goldType}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <p className="text-gray-900">{selectedOrder.quantity}g</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Gram</label>
                    <p className="text-gray-900">${selectedOrder.pricePerGram}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                  <p className="text-2xl font-bold text-yellow-600">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldOrders;