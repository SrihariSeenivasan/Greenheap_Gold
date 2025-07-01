import { useState } from "react";
import { FaChartLine, FaCoins, FaGem, FaHourglassHalf, FaStar, FaTrophy, FaUsers, FaWallet } from "react-icons/fa";


const summary = [
  { label: "Total Gold Purchased", value: "₹0 / 0g", icon: <FaCoins className="w-8 h-8" />, highlight: true },
  { label: "SIP Accounts Created", value: "0", icon: <FaUsers className="w-8 h-8 text-[#7a1335]" /> },
  { label: "Monthly Purchase Volume", value: "0g", icon: <FaChartLine className="w-8 h-8 text-[#7a1335]" /> },
  { label: "Pending Orders", value: "0", icon: <FaHourglassHalf className="w-8 h-8 text-[#7a1335]" /> },
  { label: "Wallet Balance", value: "₹0", icon: <FaWallet className="w-8 h-8 text-[#7a1335]" /> },
];

const FloatingParticle = ({ delay, size, color }: { delay: number; size: string; color: string }) => (
  <div 
    className={`absolute ${size} ${color} rounded-full opacity-20 animate-bounce`}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }}
  />
);

const GoldSparkle = ({ delay }: { delay: number }) => (
  <div 
    className="absolute animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random()}s`
    }}
  >
    <FaStar className="w-3 h-3 text-yellow-400 opacity-60" />
  </div>
);

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative overflow-hidden">
      {/* Animated Header */}
      <div className="text-center mb-12 relative">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#7a1335] to-[#a31d4b] text-white px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
          <FaTrophy className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
          <h1 className="text-3xl font-bold">Gold Trading Dashboard</h1>
          <FaGem className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {summary.map((item, idx) => (
          <div
            key={item.label}
            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer relative overflow-hidden ${
              item.highlight
                ? "bg-gradient-to-br from-[#7a1335] via-[#a31d4b] to-[#d4426e] text-white transform hover:scale-110 hover:rotate-1"
                : "bg-white hover:bg-gradient-to-br hover:from-white hover:to-yellow-50 transform hover:scale-105 hover:-rotate-1"
            } ${hoveredCard === idx ? 'shadow-2xl z-10' : ''}`}
            style={item.highlight ? { boxShadow: "0 8px 32px 0 #7a133560, 0 0 0 1px #ffd70020" } : {}}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Floating Icons */}
            <div className={`mb-2 transform transition-all duration-300 ${hoveredCard === idx ? 'scale-125 rotate-12' : ''}`}>
              {item.icon}
            </div>
            <div className="font-semibold text-center text-base mb-2 transition-all duration-300">
              {item.label}
            </div>
            <div className={`text-2xl font-extrabold transition-all duration-300 ${
              hoveredCard === idx ? 'text-3xl' : ''
            }`}>
              {item.value}
            </div>
            {/* Decorative corner elements */}
            {item.highlight && (
              <>
                <div className="absolute top-2 right-2">
                  <FaStar className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className="absolute bottom-2 left-2">
                  <FaGem className="w-3 h-3 text-yellow-200 animate-bounce" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Achievement/Status Section */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10 text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <FaTrophy className="w-8 h-8 text-white animate-bounce" />
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Gold Journey!</h2>
            <FaTrophy className="w-8 h-8 text-white animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-white/90 text-lg font-medium">Begin investing in gold today and watch your portfolio shine</p>
        </div>
        {/* Animated background waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1200 120">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="white" fillOpacity="0.1">
              <animate attributeName="d" 
                values="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z;
                        M0,80 C200,40 400,80 600,40 C800,80 1000,40 1200,80 L1200,120 L0,120 Z;
                        M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" 
                dur="4s" 
                repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: FaCoins, title: "Buy Gold", desc: "Start your investment", buttonText: "Go to Gold Purchase", gradient: "from-[#7a1335] to-[#7a1335]" },
          { icon: FaUsers, title: "Add SIP Customer", desc: "Systematic investment", buttonText: "Go to SIP Management", gradient: "from-purple-500 to-purple-700" },
          { icon: FaWallet, title: "Wallet Top-up", desc: "Fund your account", buttonText: "Go to Wallet", gradient: "from-green-500 to-green-700" }
        ].map((action, idx) => (
          <div 
            key={idx}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-[#7a1335] transition-colors duration-300">
                {action.title}
              </h3>
              <p className="text-gray-600 group-hover:text-[#7a1335] mb-6 transition-colors duration-300">
                {action.desc}
              </p>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                {action.buttonText}
              </button>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
              <FaStar className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}