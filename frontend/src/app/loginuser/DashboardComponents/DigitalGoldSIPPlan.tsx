import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Wallet,
  Shield,
  Plus,
  Eye,
  Settings,
  Star,
  Award,
  Coins,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LDigitalGoldSIPPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const primaryColor = '#7a1335';

  const stats = [
    {
      title: 'Active',
      count: 0,
      color: 'from-[#7a1335] to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      icon: TrendingUp,
      iconColor: 'text-[#7a1335]',
    },
    {
      title: 'Completed',
      count: 0,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      icon: Award,
      iconColor: 'text-blue-600',
    },
    {
      title: 'Cancelled',
      count: 0,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      icon: Shield,
      iconColor: 'text-red-600',
    },
    {
      title: 'Suspended',
      count: 0,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      icon: Calendar,
      iconColor: 'text-gray-600',
    },
  ];

  const sipPlans = [
    {
      id: 'monthly',
      name: 'Monthly SIP',
      amount: '₹1,000',
      duration: '12 months',
      returns: '8-12%',
      popular: false,
    },
    {
      id: 'quarterly',
      name: 'Quarterly SIP',
      amount: '₹3,000',
      duration: '12 months',
      returns: '10-14%',
      popular: true,
    },
    {
      id: 'yearly',
      name: 'Yearly SIP',
      amount: '₹12,000',
      duration: '12 months',
      returns: '12-16%',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-[#7a1335] rounded-2xl flex items-center justify-center shadow-lg">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#7a1335]">Digital Gold SIP Plan</h1>
                <p className="text-gray-600 mt-1">
                  Invest smartly in digital gold with automated SIP plans
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={`${stat.bgColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/50 backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/80 ${stat.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800">{stat.count}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{stat.title}</span>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SIP Plans */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#7a1335]">Choose Your SIP Plan</h2>
                <div className="flex items-center space-x-2 text-sm text-[#7a1335]">
                  <Star className="w-4 h-4" />
                  <span>Premium Plans</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {sipPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedPlan === plan.id
                        ? 'border-[#7a1335] bg-gradient-to-br from-rose-50 to-pink-100 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-[#7a1335]/40 hover:shadow-md'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#7a1335] text-white text-xs font-bold px-3 py-1 rounded-full">
                          POPULAR
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-bold text-gray-800 mb-2">{plan.name}</h3>
                      <div className="text-2xl font-bold text-[#7a1335] mb-2">{plan.amount}</div>
                      <div className="text-sm text-gray-600 mb-2">Duration: {plan.duration}</div>
                      <div className="text-sm font-medium text-green-600">
                        Returns: {plan.returns}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#7a1335] hover:bg-[#5f0e2a] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" onClick={() => navigate('/paymentpopup')}>
                  <Plus className="w-5 h-5" />
                  <span>Start New SIP</span>

                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-[#7a1335] font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#7a1335]/20 flex items-center justify-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>View Portfolio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Portfolio */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Portfolio Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-bold text-gray-800">₹0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Value</span>
                  <span className="font-bold text-green-600">₹0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Returns</span>
                  <span className="font-bold text-green-600">+₹0 (0%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-0"></div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="font-bold text-gray-800 mb-4">Why Choose Digital Gold SIP?</h3>
              <div className="space-y-3">
                {[
                  '99.5% Pure Digital Gold',
                  'Zero Storage Charges',
                  'Instant Buy/Sell',
                  'Secure & Insured',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#7a1335] rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LDigitalGoldSIPPlan;
