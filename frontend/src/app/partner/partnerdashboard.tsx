import { useNavigate } from "react-router-dom";
import { kpis, quickStats } from '../../../constants';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
              Partner Dashboard
            </h1>
            <p className="text-gray-600 text-lg font-light">Performance overview and insights</p>
          </div>
          <div className="flex items-center mt-4 lg:mt-0 space-x-4">
            <div className="bg-white rounded-full p-3 shadow-sm border border-[#7a1335]/10">
              <i className="fas fa-bell text-[#7a1335] text-lg"></i>
            </div>
            <div className="bg-[#7a1335] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#7a1335]/90 transition-colors cursor-pointer">
              Export Data
            </div>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
                <div className="w-10 h-10 bg-[#7a1335]/10 rounded-xl flex items-center justify-center">
                  <i className={`${stat.icon} text-[#7a1335] text-sm`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <div 
            key={i} 
            className="group bg-white rounded-3xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kpi.color} ${kpi.borderColor} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${kpi.icon} text-[#7a1335] text-lg`}></i>
              </div>
              <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                kpi.trend.startsWith('+') 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {kpi.trend}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 tracking-tight">
                {kpi.value}
              </div>
              <div className="text-gray-600 font-medium">{kpi.label}</div>
            </div>
            
            {/* Subtle hover indicator */}
            <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${kpi.color.replace('/20', '/50')} w-0 group-hover:w-full transition-all duration-500`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Payout Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => navigate("/ppayout")}
        >
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-[#7a1335]/10 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-[#7a1335]/20 transition-colors">
              <i className="fas fa-wallet text-[#7a1335] text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Request Payout</h3>
              <p className="text-gray-600">Withdraw your available earnings</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">₹13,000</div>
              <div className="text-sm text-gray-500">Available balance</div>
            </div>
            <i className="fas fa-arrow-right text-[#7a1335] group-hover:translate-x-1 transition-transform" onClick={e => { e.stopPropagation(); navigate('/ppayout'); }} style={{ cursor: 'pointer' }}></i>
          </div>
        </div>

        {/* Referral Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => navigate("/preferral")}
        >
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
              <i className="fas fa-share-alt text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Share & Earn</h3>
              <p className="text-gray-600">Generate your referral link</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">Generate</div>
              <div className="text-sm text-gray-500">Referral link</div>
            </div>
            <i className="fas fa-arrow-right text-blue-600 group-hover:translate-x-1 transition-transform" onClick={e => { e.stopPropagation(); navigate('/preferral'); }} style={{ cursor: 'pointer' }}></i>
          </div>
        </div>
      </div>

      {/* Achievement Showcase */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-sm">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-3">
            <i className="fas fa-trophy text-yellow-600 text-lg"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Achievements</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200/50">
            <div className="flex items-center mb-3">
              <i className="fas fa-trophy text-yellow-600 text-lg mr-2"></i>
              <span className="font-semibold text-gray-900">First Sale</span>
              <i className="fas fa-check-circle text-green-500 ml-auto"></i>
            </div>
            <p className="text-sm text-gray-600">Made your first successful referral</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200/50">
            <div className="flex items-center mb-3">
              <i className="fas fa-star text-yellow-600 text-lg mr-2"></i>
              <span className="font-semibold text-gray-900">Rising Star</span>
              <i className="fas fa-check-circle text-green-500 ml-auto"></i>
            </div>
            <p className="text-sm text-gray-600">Earned ₹10,000+ in commissions</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/50">
            <div className="flex items-center mb-3">
              <i className="fas fa-bullseye text-gray-400 text-lg mr-2"></i>
              <span className="font-semibold text-gray-500">Gold Master</span>
              <div className="ml-auto w-4 h-4 border-2 border-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500">₹1,00,000+ gold purchases</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;