import {
  Award,
  Calendar,
  Coins,
  Eye,
  Settings,
  Shield,
  Star,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
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

  // Simulate purchased SIPs (replace with real data as needed)
  const purchasedSIPs = [
    {
      id: 'monthly',
      name: 'Monthly SIP',
      amount: '₹1,000',
      duration: '12 months',
      returns: '8-12%',
      features: ['Low minimum investment', 'Flexible tenure', 'Digital gold storage'],
    }
    // Add more purchased SIPs as needed
  ];

  const [showPayment, setShowPayment] = useState(false);
  const [payPlan, setPayPlan] = useState<any>(null);

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
                <h2 className="text-2xl font-bold text-[#7a1335]">Your Purchased SIP Plans</h2>
                <div className="flex items-center space-x-2 text-sm text-[#7a1335]">
                  <Star className="w-4 h-4" />
                  <span>Premium Plans</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {purchasedSIPs.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col h-full bg-white rounded-2xl shadow-md p-6"
                    style={{
                      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)'
                    }}
                  >
                    <div className="text-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-yellow-600 mb-1">{plan.amount}</div>
                      <div className="text-gray-600 mb-1">Duration: {plan.duration}</div>
                      <div className="text-green-600 font-semibold mb-2">Returns: {plan.returns}</div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2">Features:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {plan.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto">
                      <button
                        style={{
                          width: '100%',
                          background: '#7a1335',
                          color: '#fff',
                          fontWeight: 700,
                          padding: '12px 0',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          marginTop: 'auto'
                        }}
                        onClick={() => {
                          setPayPlan(plan);
                          setShowPayment(true);
                        }}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Payment Popup */}
              {showPayment && payPlan && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999 // Increased z-index to ensure popup is always on top
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      padding: 32,
                      minWidth: 320,
                      maxWidth: 400,
                      width: '90%',
                      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 16,
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        color: '#888',
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowPayment(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h3 style={{ fontWeight: 700, fontSize: 22, color: '#7a1335', marginBottom: 16 }}>
                      Pay for {payPlan.name}
                    </h3>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 500, color: '#333', marginBottom: 4 }}>Amount</div>
                      <div style={{ fontWeight: 700, fontSize: 20, color: '#7a1335' }}>{payPlan.amount}</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 500, color: '#333', marginBottom: 4 }}>Duration</div>
                      <div>{payPlan.duration}</div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontWeight: 500, color: '#333', marginBottom: 4 }}>Returns</div>
                      <div>{payPlan.returns}</div>
                    </div>
                    <button
                      style={{
                        width: '100%',
                        background: '#7a1335',
                        color: '#fff',
                        fontWeight: 700,
                        padding: '12px 0',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      onClick={() => {
                        setShowPayment(false);
                        // Add payment logic here
                      }}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              )}
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

