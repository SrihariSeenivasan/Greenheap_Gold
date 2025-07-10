import { Building2, Calendar, ChevronLeft, ChevronRight, Eye, Filter, Search, User, X } from 'lucide-react';
import { useMemo, useState } from 'react';

// Define Order type
type Order = {
  id: string;
  customerName: string;
  customerType: 'user' | 'b2b';
  goldType: string;
  quantity: number;
  weight: string;
  price: number;
  date: string;
  status: string;
  paymentMethod: string;
  address: string;
};

const AOrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'user' | 'b2b'>('all');
  const [productFilter, setProductFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const itemsPerPage = 10;

  // Product categories for different customer types
  const userProducts = ['gold coin', 'biscuit', 'jewel', 'ornaments'];
  const b2bProducts = ['gold bar', 'gold bullion', 'gold ingots', 'gold sheets', 'gold chains'];

  // Enhanced sample order data with proper categorization
  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      customerName: 'John Smith',
      customerType: 'user',
      goldType: 'Gold Coin',
      quantity: 2,
      weight: '20g',
      price: 1250.00,
      date: '2024-12-15',
      status: 'completed',
      paymentMethod: 'Credit Card',
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'ABC Jewelry Corp',
      customerType: 'b2b',
      goldType: 'Gold Bar',
      quantity: 50,
      weight: '500g',
      price: 28750.00,
      date: '2024-12-14',
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      address: '456 Business Ave, Los Angeles, CA 90210'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Sarah Johnson',
      customerType: 'user',
      goldType: 'Jewel',
      quantity: 1,
      weight: '15g',
      price: 850.00,
      date: '2024-12-13',
      status: 'completed',
      paymentMethod: 'PayPal',
      address: '789 Oak Drive, Chicago, IL 60601'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'Gold Traders LLC',
      customerType: 'b2b',
      goldType: 'Gold Bullion',
      quantity: 10,
      weight: '1kg',
      price: 62500.00,
      date: '2024-12-12',
      status: 'shipped',
      paymentMethod: 'Wire Transfer',
      address: '321 Trade Center, Miami, FL 33101'
    },
    {
      id: 'ORD-2024-005',
      customerName: 'Mike Chen',
      customerType: 'user',
      goldType: 'Ornaments',
      quantity: 3,
      weight: '12g',
      price: 720.00,
      date: '2024-12-11',
      status: 'completed',
      paymentMethod: 'Credit Card',
      address: '654 Pine St, Seattle, WA 98101'
    },
    {
      id: 'ORD-2024-006',
      customerName: 'Premium Metals Inc',
      customerType: 'b2b',
      goldType: 'Gold Ingots',
      quantity: 25,
      weight: '2.5kg',
      price: 156250.00,
      date: '2024-12-10',
      status: 'processing',
      paymentMethod: 'Bank Transfer',
      address: '987 Industrial Blvd, Houston, TX 77001'
    },
    {
      id: 'ORD-2024-007',
      customerName: 'Emma Davis',
      customerType: 'user',
      goldType: 'Biscuit',
      quantity: 2,
      weight: '8g',
      price: 480.00,
      date: '2024-12-09',
      status: 'completed',
      paymentMethod: 'Debit Card',
      address: '147 Elm Street, Boston, MA 02101'
    },
    {
      id: 'ORD-2024-008',
      customerName: 'Luxury Goods Co',
      customerType: 'b2b',
      goldType: 'Gold Chains',
      quantity: 15,
      weight: '300g',
      price: 17250.00,
      date: '2024-12-08',
      status: 'shipped',
      paymentMethod: 'Wire Transfer',
      address: '258 Commerce Way, Denver, CO 80201'
    },
    {
      id: 'ORD-2024-009',
      customerName: 'Robert Wilson',
      customerType: 'user',
      goldType: 'Gold Coin',
      quantity: 5,
      weight: '50g',
      price: 3125.00,
      date: '2024-12-07',
      status: 'completed',
      paymentMethod: 'Credit Card',
      address: '369 Maple Ave, Phoenix, AZ 85001'
    },
    {
      id: 'ORD-2024-010',
      customerName: 'Elite Jewelry House',
      customerType: 'b2b',
      goldType: 'Gold Sheets',
      quantity: 20,
      weight: '400g',
      price: 21600.00,
      date: '2024-12-06',
      status: 'processing',
      paymentMethod: 'Bank Transfer',
      address: "741 Jeweler's Row, Philadelphia, PA 19101"
    },
    {
      id: 'ORD-2024-011',
      customerName: 'Lisa Anderson',
      customerType: 'user',
      goldType: 'Jewel',
      quantity: 1,
      weight: '25g',
      price: 1437.50,
      date: '2024-12-05',
      status: 'completed',
      paymentMethod: 'PayPal',
      address: '852 Cedar Lane, Portland, OR 97201'
    },
    {
      id: 'ORD-2024-012',
      customerName: 'Global Gold Partners',
      customerType: 'b2b',
      goldType: 'Gold Bar',
      quantity: 8,
      weight: '800g',
      price: 50000.00,
      date: '2024-12-04',
      status: 'shipped',
      paymentMethod: 'Wire Transfer',
      address: '963 Financial District, San Francisco, CA 94101'
    },
    {
      id: 'ORD-2024-013',
      customerName: 'David Kim',
      customerType: 'user',
      goldType: 'Ornaments',
      quantity: 4,
      weight: '18g',
      price: 1080.00,
      date: '2024-12-03',
      status: 'completed',
      paymentMethod: 'Credit Card',
      address: '456 Park Ave, Austin, TX 78701'
    },
    {
      id: 'ORD-2024-014',
      customerName: 'Precious Metals Corp',
      customerType: 'b2b',
      goldType: 'Gold Bullion',
      quantity: 12,
      weight: '1.2kg',
      price: 75000.00,
      date: '2024-12-02',
      status: 'pending',
      paymentMethod: 'Wire Transfer',
      address: '789 Commerce St, Atlanta, GA 30301'
    },
    {
      id: 'ORD-2024-015',
      customerName: 'Maria Garcia',
      customerType: 'user',
      goldType: 'Biscuit',
      quantity: 6,
      weight: '30g',
      price: 1800.00,
      date: '2024-12-01',
      status: 'shipped',
      paymentMethod: 'PayPal',
      address: '321 Main St, Las Vegas, NV 89101'
    }
  ];

  // Get available products based on selected customer type
  const getAvailableProducts = () => {
    if (filterType === 'user') return userProducts;
    if (filterType === 'b2b') return b2bProducts;
    return [...userProducts, ...b2bProducts];
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesCustomerType = filterType === 'all' || order.customerType === filterType;
      const matchesProduct = productFilter === 'all' || 
        order.goldType.toLowerCase().includes(productFilter.toLowerCase());
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.goldType.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCustomerType && matchesProduct && matchesSearch;
    });
  }, [filterType, productFilter, searchTerm]);

  // Reset product filter when customer type changes
  const handleCustomerTypeChange = (newType: 'all' | 'user' | 'b2b') => {
    setFilterType(newType);
    setProductFilter('all');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // Statistics
  const userOrders = orders.filter(order => order.customerType === 'user');
  const b2bOrders = orders.filter(order => order.customerType === 'b2b');
  const totalUserValue = userOrders.reduce((sum, order) => sum + order.price, 0);
  const totalB2BValue = b2bOrders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Manage and track all gold selling orders</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">User Orders</p>
                <p className="text-2xl font-bold text-gray-900">{userOrders.length}</p>
                <p className="text-sm text-gray-500">${totalUserValue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">B2B Orders</p>
                <p className="text-2xl font-bold text-gray-900">{b2bOrders.length}</p>
                <p className="text-sm text-gray-500">${totalB2BValue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 h-4 w-4" />
                <select
                  value={filterType}
                  onChange={(e) => handleCustomerTypeChange(e.target.value as 'all' | 'user' | 'b2b')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="all">All Customers</option>
                  <option value="user">Individual Users</option>
                  <option value="b2b">B2B Customers</option>
                </select>
              </div>

              {filterType !== 'all' && (
                <div className="flex items-center gap-2">
                  <select
                    value={productFilter}
                    onChange={(e) => {
                      setProductFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="all">All Products</option>
                    {getAvailableProducts().map((product) => (
                      <option key={product} value={product}>
                        {product.charAt(0).toUpperCase() + product.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </div>
          </div>
        </div>

        {/* Current Filter Display */}
        {(filterType !== 'all' || productFilter !== 'all') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Filter className="h-4 w-4" />
              <span>Active filters:</span>
              {filterType !== 'all' && (
                <span className="bg-blue-100 px-2 py-1 rounded-full">
                  {filterType === 'user' ? 'Individual Users' : 'B2B Customers'}
                </span>
              )}
              {productFilter !== 'all' && (
                <span className="bg-blue-100 px-2 py-1 rounded-full">
                  {productFilter.charAt(0).toUpperCase() + productFilter.slice(1)}
                </span>
              )}
              <button
                onClick={() => {
                  setFilterType('all');
                  setProductFilter('all');
                  setCurrentPage(1);
                }}
                className="text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {order.customerType === 'b2b' ? (
                          <Building2 className="h-4 w-4 text-blue-500" />
                        ) : (
                          <User className="h-4 w-4 text-green-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500 capitalize">{order.customerType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.goldType}</div>
                      <div className="text-sm text-gray-500">{order.quantity} units • {order.weight}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="text-yellow-600 hover:text-yellow-900 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No orders found matching your criteria.</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'bg-yellow-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
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
          onClick={closeOrderDetails}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={closeOrderDetails}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Order ID:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Date:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedOrder.date}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Payment Method:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type:</span>
                    <span className="ml-2 text-sm text-gray-900 capitalize flex items-center gap-1">
                      {selectedOrder.customerType === 'b2b' ? (
                        <Building2 className="h-4 w-4 text-blue-500" />
                      ) : (
                        <User className="h-4 w-4 text-green-500" />
                      )}
                      {selectedOrder.customerType}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <span className="ml-2 text-sm text-gray-900">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Product:</span>
                      <div className="text-sm text-gray-900">{selectedOrder.goldType}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Quantity:</span>
                      <div className="text-sm text-gray-900">{selectedOrder.quantity} units</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Weight:</span>
                      <div className="text-sm text-gray-900">{selectedOrder.weight}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-lg font-bold text-yellow-600">${selectedOrder.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeOrderDetails}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AOrderHistory;