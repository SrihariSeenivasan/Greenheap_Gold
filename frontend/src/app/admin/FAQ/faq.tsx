import { ChevronLeft, ChevronRight, Edit, Plus, Save, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  type?: 'home' | 'chit' | 'sip' | 'scheme';
}

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [faqType, setFaqType] = useState<'home' | 'chit' | 'sip' | 'scheme' | ''>('');
  const [filterType, setFilterType] = useState<'home' | 'chit' | 'sip' | 'scheme' | 'all'>('all');
  
  // Form states
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  // Initialize with sample data
  useEffect(() => {
    const sampleFaqs: FAQ[] = [
      {
        id: 1,
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
        type: 'home'
      },
      {
        id: 2,
        question: "What are the system requirements?",
        answer: "Our system works on all modern web browsers including Chrome, Firefox, Safari, and Edge. You need an internet connection and JavaScript enabled.",
        createdAt: "2024-01-16",
        updatedAt: "2024-01-16",
        type: 'chit'
      },
      {
        id: 3,
        question: "How do I contact support?",
        answer: "You can contact our support team through the help desk, email at support@example.com, or by calling our toll-free number 1-800-HELP.",
        createdAt: "2024-01-17",
        updatedAt: "2024-01-17",
        type: 'sip'
      }
    ];
    setFaqs(sampleFaqs);
  }, []);

  // Filter FAQs based on search term and type
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || faq.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const handleSubmit = () => {
    if (!formData.question.trim() || !formData.answer.trim() || !faqType) {
      alert('Please fill in all required fields and select a type');
      return;
    }
    
    if (editingFaq) {
      // Update existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === editingFaq.id 
          ? { ...faq, ...formData, type: faqType, updatedAt: new Date().toISOString().split('T')[0] }
          : faq
      ));
    } else {
      // Add new FAQ
      const newFaq: FAQ = {
        id: Date.now(),
        ...formData,
        type: faqType,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      } as any;
      setFaqs([...faqs, newFaq]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ question: '', answer: '' });
    setEditingFaq(null);
    setShowModal(false);
    setFaqType('');
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setFaqType(faq.type || '');
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div
          className="p-6 rounded-t-lg"
          style={{ background: "#7a1335", color: "#fff" }}
        >
          <h1 className="text-3xl font-bold">FAQ Management System</h1>
          <p className="mt-2" style={{ color: "#ffe6ef" }}>Manage frequently asked questions for your users</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {/* Removed "View User Dashboard" button */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#7a1335", boxShadow: "none" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Filter Dropdown */}
              <select
                className="ml-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "#7a1335", boxShadow: "none" }}
                value={filterType}
                onChange={e => setFilterType(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="home">Home</option>
                <option value="chit">Chit</option>
                <option value="sip">SIP</option>
                <option value="scheme">Scheme</option>
              </select>
            </div>
            <button
              onClick={() => { setShowModal(true); setFaqType(''); }}
              className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              style={{
                background: "#7a1335",
                color: "#fff"
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Question</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Answer</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Type</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Last Updated</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 max-w-xs">
                      <div className="font-medium text-gray-900 truncate">{faq.question}</div>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 max-w-md">
                      <div className="text-gray-600 truncate">{faq.answer}</div>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                      {faq.type ? faq.type.charAt(0).toUpperCase() + faq.type.slice(1) : ''}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-500">
                      {faq.updatedAt}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboard />
      
      {/* Modal for Add/Edit FAQ */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)"
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              maxWidth: 600,
              width: "100%",
              margin: "0 1rem",
              overflow: "hidden"
            }}
          >
            <div
              className="p-6 rounded-t-lg"
              style={{ background: "#7a1335", color: "#fff" }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#7a1335", boxShadow: "none" }}
                  placeholder="Enter your question here..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type *
                </label>
                <select
                  value={faqType}
                  onChange={e => setFaqType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#7a1335", boxShadow: "none" }}
                >
                  <option value="">Select type</option>
                  <option value="home">Home</option>
                  <option value="chit">Chit</option>
                  <option value="sip">SIP</option>
                  <option value="scheme">Scheme</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Answer *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#7a1335", boxShadow: "none" }}
                  rows={4}
                  placeholder="Enter your answer here..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  style={{
                    background: "#7a1335",
                    color: "#fff"
                  }}
                >
                  <Save className="w-4 h-4" />
                  <span>{editingFaq ? 'Update' : 'Create'} FAQ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;