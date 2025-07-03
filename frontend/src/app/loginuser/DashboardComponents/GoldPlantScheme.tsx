import {
  Award,
  ChevronRight,
  Shield,
  Sparkles,
  Star,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LGoldPlantScheme = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    { label: 'Active', count: 45, color: 'from-emerald-400 to-emerald-600', icon: TrendingUp },
    { label: 'Completed', count: 128, color: 'from-blue-400 to-blue-600', icon: Award },
    { label: 'Cancelled', count: 3, color: 'from-red-400 to-red-600', icon: Shield },
    { label: 'Suspended', count: 2, color: 'from-gray-400 to-gray-600', icon: Star }
  ];

  const features = [
    { title: 'Flexible Payment Plans', desc: 'Choose from multiple payment options that suit your budget' },
    { title: 'Premium Gold Quality', desc: 'Certified 24K gold with guaranteed purity and authenticity' },
    { title: 'Instant Liquidity', desc: 'Convert your gold savings to cash anytime with competitive rates' },
    { title: 'Secure Storage', desc: 'Bank-grade security with full insurance coverage for your investments' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-[#7a1335] to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7a1335] to-amber-500">
              Gold Plant Scheme
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Grow your wealth with our premium gold investment plans. Secure, flexible, and designed for your financial future.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-6 h-6" />
                  <div className={`w-2 h-2 rounded-full bg-white ${hoveredCard === index ? 'animate-pulse' : ''}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.count}</div>
                <div className="text-sm opacity-90 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Scheme Info */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[#7a1335] to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Gold Plant Scheme</h2>
              <p className="text-gray-600">Start your gold investment journey today</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                ['Minimum Investment', '₹1,000'],
                ['Plan Duration', '6-36 Months'],
                ['Expected Returns', '8-12% p.a.'],
                ['Gold Purity', '24K Certified']
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-600">{label}</span>
                  <span className={`font-semibold ${label === 'Expected Returns' ? 'text-green-600' : 'text-[#7a1335]'}`}>{value}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-[#7a1335] to-red-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2" onClick={() => navigate('/paymentpopup')}>
              Start Investment
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Our Gold Scheme?</h3>
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7a1335] to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#7a1335] to-red-700 rounded-3xl p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Gold Investment?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied investors who have secured their financial future with our gold schemes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-[#7a1335] px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/usersavingplan')}
              >
                Get Started Now
              </button>
              <button
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-[#7a1335] transition-all duration-300"
                onClick={() => navigate('/paymentpopup')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGoldPlantScheme;