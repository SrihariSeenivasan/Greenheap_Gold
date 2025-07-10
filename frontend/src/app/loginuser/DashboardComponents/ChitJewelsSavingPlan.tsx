import React, { useState } from 'react';
import { Gem, TrendingUp, Calendar, Target, Star, Plus, Eye, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const LChitJewelsSavingPlan = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const stats = [
    { label: 'Active', count: 3, color: 'from-[#7a1335] to-pink-600', icon: TrendingUp },
    { label: 'Completed', count: 12, color: 'from-blue-400 to-indigo-500', icon: Target },
    { label: 'Cancelled', count: 1, color: 'from-rose-400 to-pink-500', icon: 'x' },
    { label: 'Suspended', count: 0, color: 'from-gray-400 to-slate-500', icon: 'pause' }
  ];

  const activePlans = [
    {
      id: 1,
      name: "Gold Necklace Plan",
      target: "₹2,50,000",
      saved: "₹1,25,000",
      progress: 50,
      duration: "24 months",
      monthly: "₹10,416",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      name: "Diamond Ring Plan",
      target: "₹1,00,000",
      saved: "₹75,000",
      progress: 75,
      duration: "12 months",
      monthly: "₹8,333",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 3,
      name: "Wedding Jewelry Set",
      target: "₹5,00,000",
      saved: "₹1,00,000",
      progress: 20,
      duration: "36 months",
      monthly: "₹13,888",
      color: "from-rose-400 to-red-500"
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#7a1335] to-pink-600 rounded-xl flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#7a1335]">Chit Jewels</h1>
                <p className="text-sm text-gray-600">Saving Plan Dashboard</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                selectedTab === stat.label.toLowerCase() ? 'ring-2 ring-[#7a1335] ring-offset-2' : ''
              }`}
              onClick={() => setSelectedTab(stat.label.toLowerCase())}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    {stat.icon === 'x' ? (
                      <div className="w-5 h-5 text-white font-bold">✕</div>
                    ) : stat.icon === 'pause' ? (
                      <div className="w-5 h-5 text-white font-bold">⏸</div>
                    ) : (
                      <stat.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Plans Section */}
        {selectedTab === 'active' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#7a1335]">Active Saving Plans</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Updated today</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#7a1335] transition-colors">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-600">{plan.duration} plan</p>
                      </div>
                      <div className={`w-10 h-10 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center shadow-md`}>
                        <Gem className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Target Amount</span>
                        <span className="font-bold text-gray-900">{plan.target}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Saved Amount</span>
                        <span className="font-bold text-green-600">{plan.saved}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Progress</span>
                          <span className="text-sm font-bold text-gray-900">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${plan.color} rounded-full`}
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Monthly Payment</span>
                          <span className="font-bold text-[#7a1335]">{plan.monthly}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-[#7a1335] text-white py-2 px-4 rounded-lg hover:bg-[#5a0f28] transition-all duration-300 text-sm font-medium" onClick={() => navigate('/paymentpopup')}>
                        Make Payment
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#7a1335] hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {selectedTab !== 'active' && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-[#7a1335] mb-2">
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Plans
            </h3>
            <p className="text-gray-600">
              {selectedTab === 'completed' && 'View your successfully completed saving plans'}
              {selectedTab === 'cancelled' && 'Review your cancelled saving plans'}
              {selectedTab === 'suspended' && 'Manage your temporarily suspended plans'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LChitJewelsSavingPlan;
