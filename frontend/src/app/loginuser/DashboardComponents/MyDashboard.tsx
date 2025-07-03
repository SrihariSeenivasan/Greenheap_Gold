import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  Shield,
  Star,
  ArrowUpRight,
  PlusCircle,
  Eye,
  Calendar,
  DollarSign,
} from 'lucide-react';
import {JSX} from 'react';

type InvestmentPlan = {
  id: number;
  name: string;
  icon: JSX.Element;
  description: string;
  currentValue: string;
  monthlyContribution: string;
  duration: string;
  returns: string;
  gradient: string;
  bgPattern: string;
};

const LMyDashboard = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const investmentPlans: InvestmentPlan[] = [
    {
      id: 1,
      name: 'Chit Jewels Saving Plan',
      icon: <Star className="w-8 h-8" />,
      description: 'Traditional jewelry savings with guaranteed returns',
      currentValue: '₹45,280',
      monthlyContribution: '₹2,500',
      duration: '24 months',
      returns: '12.5% p.a.',
      gradient: 'from-yellow-400 to-yellow-600',
      bgPattern: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    },
    {
      id: 2,
      name: 'Digital Gold SIP Plan',
      icon: <Coins className="w-8 h-8" />,
      description: 'Systematic investment in pure digital gold',
      currentValue: '₹28,750',
      monthlyContribution: '₹1,500',
      duration: '36 months',
      returns: 'Market linked',
      gradient: 'from-orange-400 to-yellow-500',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-yellow-50',
    },
    {
      id: 3,
      name: 'Gold Plant Scheme',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Long-term gold accumulation strategy',
      currentValue: '₹67,890',
      monthlyContribution: '₹3,000',
      duration: '60 months',
      returns: '15.2% p.a.',
      gradient: 'from-amber-400 to-orange-500',
      bgPattern: 'bg-gradient-to-br from-amber-50 to-orange-50',
    },
  ];

  const totalPortfolioValue = '₹1,41,920';
  const totalMonthlyInvestment = '₹7,000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-[#7a1335] tracking-tight">My Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-3 shadow-lg border border-gray-100">
                <Shield className="w-6 h-6 text-[#7a1335]" />
              </div>
              <div className="bg-[#7a1335] text-white px-4 py-2 rounded-full text-sm font-medium">
                Premium Member
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Track and manage your gold investment portfolio
          </p>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7a1335]/10 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Total Portfolio Value</h3>
                <DollarSign className="w-6 h-6 text-[#7a1335]" />
              </div>
              <div className="text-3xl font-bold text-[#7a1335] mb-2">{totalPortfolioValue}</div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+8.4% this month</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Monthly Investment</h3>
                <Calendar className="w-6 h-6 text-[#7a1335]" />
              </div>
              <div className="text-3xl font-bold text-[#7a1335] mb-2">{totalMonthlyInvestment}</div>
              <div className="text-sm text-gray-600">Across 3 active plans</div>
            </div>
          </div>
        </div>

        {/* Investment Plans */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Investment Plans</h2>
            <button className="flex items-center bg-[#7a1335] text-white px-4 py-2 rounded-xl hover:bg-[#5a0f28] transition-colors duration-200">
              <PlusCircle className="w-5 h-5 mr-2" />
              Add New Plan
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {investmentPlans.map((plan) => (
              <div
                key={plan.id}
                className={`${plan.bgPattern} rounded-2xl p-6 shadow-xl border border-white/50 relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
              >
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${plan.gradient} p-3 rounded-xl text-white shadow-lg`}>
                      {plan.icon}
                    </div>
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Plan Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{plan.description}</p>

                  {/* Current Value */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <div className="text-2xl font-bold text-[#7a1335] mb-1">{plan.currentValue}</div>
                    <div className="text-sm text-gray-600">Current Value</div>
                  </div>

                  {/* Plan Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="font-semibold text-gray-800">{plan.monthlyContribution}</div>
                      <div className="text-gray-600">Monthly SIP</div>
                    </div>
                    <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="font-semibold text-gray-800">{plan.returns}</div>
                      <div className="text-gray-600">Returns</div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="mt-4 inline-flex items-center bg-[#7a1335] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {plan.duration} plan
                  </div>

                  {/* Expanded View */}
                  {selectedPlan === plan.id && (
                    <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Total Invested</div>
                          <div className="font-semibold">₹35,000</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Profit/Loss</div>
                          <div className="font-semibold text-green-600">+₹8,280</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Next SIP</div>
                          <div className="font-semibold">July 15, 2025</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Gold Weight</div>
                          <div className="font-semibold">12.5g</div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-[#7a1335] text-white py-2 rounded-lg hover:bg-[#5a0f28] transition-colors">
                        View Detailed Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center bg-gradient-to-r from-[#7a1335] to-[#5a0f28] text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <PlusCircle className="w-5 h-5 mr-2" />
              Increase SIP
            </button>
            <button className="flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <Coins className="w-5 h-5 mr-2" />
              Buy Gold Now
            </button>
            <button className="flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Reports
            </button>
            <button className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200">
              <Shield className="w-5 h-5 mr-2" />
              Insurance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMyDashboard;
