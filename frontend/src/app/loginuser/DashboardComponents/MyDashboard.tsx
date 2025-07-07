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
  X,
  EyeOff,
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
  const [showAddPlanForm, setShowAddPlanForm] = useState(false);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([
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
  ]);

  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    currentValue: '',
    monthlyContribution: '',
    duration: '',
    returns: '',
    planType: 'gold'
  });

  const totalPortfolioValue = '₹1,41,920';
  const totalMonthlyInvestment = '₹7,000';

  const formatAmount = (amount: string) => {
    return hideAmounts ? '₹****' : amount;
  };

  const handleAddPlan = () => {
    if (!newPlan.name || !newPlan.description || !newPlan.currentValue || !newPlan.monthlyContribution || !newPlan.duration || !newPlan.returns) {
      alert('Please fill in all fields');
      return;
    }
    
    const planTypeConfigs = {
      gold: {
        icon: <Coins className="w-8 h-8" />,
        gradient: 'from-amber-400 to-orange-500',
        bgPattern: 'bg-gradient-to-br from-amber-50 to-orange-50',
      },
      jewelry: {
        icon: <Star className="w-8 h-8" />,
        gradient: 'from-yellow-400 to-yellow-600',
        bgPattern: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      },
      sip: {
        icon: <TrendingUp className="w-8 h-8" />,
        gradient: 'from-green-400 to-emerald-500',
        bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
      }
    };

    const config = planTypeConfigs[newPlan.planType as keyof typeof planTypeConfigs];
    
    const newInvestmentPlan: InvestmentPlan = {
      id: Date.now(),
      name: newPlan.name,
      icon: config.icon,
      description: newPlan.description,
      currentValue: `₹${newPlan.currentValue}`,
      monthlyContribution: `₹${newPlan.monthlyContribution}`,
      duration: `${newPlan.duration} months`,
      returns: `${newPlan.returns}% p.a.`,
      gradient: config.gradient,
      bgPattern: config.bgPattern,
    };

    setInvestmentPlans([...investmentPlans, newInvestmentPlan]);
    setNewPlan({
      name: '',
      description: '',
      currentValue: '',
      monthlyContribution: '',
      duration: '',
      returns: '',
      planType: 'gold'
    });
    setShowAddPlanForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-[#7a1335] tracking-tight">My Dashboard</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setHideAmounts(!hideAmounts)}
                className={`rounded-full p-3 shadow-lg border border-gray-100 transition-all duration-200 ${
                  hideAmounts 
                    ? 'bg-[#7a1335] text-white' 
                    : 'bg-white text-[#7a1335] hover:bg-gray-50'
                }`}
              >
                {hideAmounts ? <EyeOff className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
              </button>
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
              <div className="text-3xl font-bold text-[#7a1335] mb-2">{formatAmount(totalPortfolioValue)}</div>
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
              <div className="text-3xl font-bold text-[#7a1335] mb-2">{formatAmount(totalMonthlyInvestment)}</div>
              <div className="text-sm text-gray-600">Across {investmentPlans.length} active plans</div>
            </div>
          </div>
        </div>

        {/* Investment Plans */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Investment Plans</h2>
            <button 
              onClick={() => setShowAddPlanForm(true)}
              className="flex items-center bg-[#7a1335] text-white px-4 py-2 rounded-xl hover:bg-[#5a0f28] transition-colors duration-200"
            >
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
                    <div className="text-2xl font-bold text-[#7a1335] mb-1">{formatAmount(plan.currentValue)}</div>
                    <div className="text-sm text-gray-600">Current Value</div>
                  </div>

                  {/* Plan Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="font-semibold text-gray-800">{formatAmount(plan.monthlyContribution)}</div>
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
                          <div className="font-semibold">{formatAmount('₹35,000')}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Profit/Loss</div>
                          <div className="font-semibold text-green-600">{formatAmount('+₹8,280')}</div>
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

      {/* Add New Plan Modal */}
      {showAddPlanForm && (
       <div  style={{
    position: 'fixed',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    padding: '16px',
  }}>
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Investment Plan</h2>
              <button 
                onClick={() => setShowAddPlanForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                  placeholder="Enter plan name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                  placeholder="Enter plan description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                <select
                  value={newPlan.planType}
                  onChange={(e) => setNewPlan({...newPlan, planType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                >
                  <option value="gold">Gold Investment</option>
                  <option value="jewelry">Jewelry Saving</option>
                  <option value="sip">SIP Plan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                  <input
                    type="number"
                    value={newPlan.currentValue}
                    onChange={(e) => setNewPlan({...newPlan, currentValue: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP</label>
                  <input
                    type="number"
                    value={newPlan.monthlyContribution}
                    onChange={(e) => setNewPlan({...newPlan, monthlyContribution: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
                  <input
                    type="number"
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                    placeholder="12"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Returns (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPlan.returns}
                    onChange={(e) => setNewPlan({...newPlan, returns: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
                    placeholder="10.5"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddPlanForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddPlan}
                  className="flex-1 px-4 py-2 bg-[#7a1335] text-white rounded-lg hover:bg-[#5a0f28] transition-colors"
                >
                  Add Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LMyDashboard;