import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight, FaArrowUp, FaBox, FaChartLine, FaCoins, FaCreditCard, FaGem, FaHourglassHalf, FaPiggyBank, FaShoppingCart, FaStar, FaStore, FaTrophy, FaUsers, FaWallet } from "react-icons/fa";

const summary = [
  { label: "Total Gold Purchased", value: "₹0", subValue: "0g", icon: <FaCoins className="w-6 h-6" />, highlight: true },
  { label: "SIP Accounts", value: "0", subValue: "Active", icon: <FaUsers className="w-6 h-6" /> },
  { label: "Monthly Volume", value: "0g", subValue: "This month", icon: <FaChartLine className="w-6 h-6" /> },
  { label: "Pending Orders", value: "0", subValue: "In queue", icon: <FaHourglassHalf className="w-6 h-6" /> },
  { label: "Wallet Balance", value: "₹0", subValue: "Available", icon: <FaWallet className="w-6 h-6" /> },
];

export default function Dashboard() {
  // --- Add state for unit selection and inventory editing ---
  const [stockUnit, setStockUnit] = useState<"kg" | "g">("kg");
  const [editInventory, setEditInventory] = useState(false);
  const [editStockValues, setEditStockValues] = useState({
    total: "2,450",
    instore: "1,850",
    gold: "125",
    diamond: "2.5",
    silver: "2,322",
  });

  // --- Gold/Silver API price state ---
  const [goldApiRate, setGoldApiRate] = useState<string | null>(null);
  const [silverApiRate, setSilverApiRate] = useState<string | null>(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);

  // --- Stock values for display ---
  const [stockValues, setStockValues] = useState({
    total: "2,450",
    instore: "1,850",
    gold: "125",
    diamond: "2.5",
    silver: "2,322",
  });

  // --- Helper for unit conversion ---
  const convertStockValue = (value: string, from: "kg" | "g", to: "kg" | "g") => {
    const num = Number(value.replace(/,/g, ""));
    if (isNaN(num)) return value;
    if (from === to) return value;
    if (from === "kg" && to === "g") return (num * 1000).toLocaleString();
    if (from === "g" && to === "kg") return (num / 1000).toLocaleString();
    return value;
  };

  // --- Handle unit change ---
  const handleUnitChange = (unit: "kg" | "g") => {
    setStockValues(prev => ({
      total: convertStockValue(prev.total, stockUnit, unit),
      instore: convertStockValue(prev.instore, stockUnit, unit),
      gold: convertStockValue(prev.gold, stockUnit, unit),
      diamond: convertStockValue(prev.diamond, stockUnit, unit),
      silver: convertStockValue(prev.silver, stockUnit, unit),
    }));
    setStockUnit(unit);
  };

  // --- Save edited inventory ---
  const saveInventory = () => {
    setStockValues(editStockValues);
    setEditInventory(false);
  };

  // --- Fetch gold/silver price from API ---
  useEffect(() => {
    setRateLoading(true);
    setRateError(null);

    const fetchRates = async () => {
      try {
        // Gold
        const goldRes = await fetch("https://www.goldapi.io/api/XAU/USD", {
          method: "GET",
          headers: {
            "x-access-token": "goldapi-64pu19mcvsg193-io",
            "Content-Type": "application/json"
          }
        });
        if (!goldRes.ok) throw new Error("Gold API error");
        const goldData = await goldRes.json();
        const usdToInr = 83;
        if (goldData.price_gram_24k_usd) {
          const goldInrPerGram = (goldData.price_gram_24k_usd * usdToInr).toFixed(2);
          setGoldApiRate(goldInrPerGram);
        } else {
          setGoldApiRate(null);
        }

        // Silver
        const silverRes = await fetch("https://www.goldapi.io/api/XAG/USD", {
          method: "GET",
          headers: {
            "x-access-token": "goldapi-64pu19mcvsg193-io",
            "Content-Type": "application/json"
          }
        });
        if (!silverRes.ok) throw new Error("Silver API error");
        const silverData = await silverRes.json();
        if (silverData.price_gram_usd) {
          const silverInrPerGram = (silverData.price_gram_usd * usdToInr).toFixed(2);
          setSilverApiRate(silverInrPerGram);
        } else {
          setSilverApiRate(null);
        }

        setRateLoading(false);
      } catch (err) {
        setRateError("Failed to fetch rates");
        setGoldApiRate(null);
        setSilverApiRate(null);
        setRateLoading(false);
      }
    };

    fetchRates();
  }, []);

  const priceCards = [
    { 
      label: "Gold Price", 
      value: goldApiRate ? `₹${goldApiRate}` : "—", 
      subValue: "/gram (API)", 
      change: "+2.5%",
      isPositive: true,
      icon: <FaCoins className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600"
    },
    { 
      label: "Silver Price", 
      value: silverApiRate ? `₹${silverApiRate}` : "—", 
      subValue: "/gram (API)", 
      change: "-1.2%",
      isPositive: false,
      icon: <FaGem className="w-5 h-5" />,
      color: "from-gray-400 to-gray-500"
    },
  ];

  const stockCards = [
    { 
      label: "Total Stock", 
      value: `${stockValues.total} ${stockUnit}`, 
      subValue: "All metals", 
      icon: <FaBox className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      key: "total"
    },
    { 
      label: "In Store Stock", 
      value: `${stockValues.instore} ${stockUnit}`, 
      subValue: "Available", 
      icon: <FaStore className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      key: "instore"
    },
    { 
      label: "Gold Stock", 
      value: `${stockValues.gold} ${stockUnit}`, 
      subValue: "22K", // changed from "24K & 22K" to "22K"
      icon: <FaCoins className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600",
      key: "gold"
    },
    { 
      label: "Diamond Stock", 
      value: `${stockValues.diamond} ${stockUnit}`, 
      subValue: "Certified", 
      icon: <FaGem className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      key: "diamond"
    },
    { 
      label: "Silver Stock", 
      value: `${stockValues.silver} ${stockUnit}`, 
      subValue: "999 purity", 
      icon: <FaGem className="w-5 h-5" />,
      color: "from-gray-500 to-gray-600",
      key: "silver"
    },
  ];

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use router navigation
    alert(`Would navigate to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#7a1335] to-[#5a0f26] rounded-xl shadow-lg">
              <FaGem className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-[#7a1335] tracking-wide">B2B Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Premium Gold Trading Platform</p>
            </div>
          </div>
        </div>

        {/* Price Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Market Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priceCards.map((item, idx) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} shadow`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
                      <p className="text-gray-500 text-sm">{item.subValue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {rateLoading ? <span className="text-gray-400 text-base">Loading...</span> : item.value}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      item.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.isPositive ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                      <span>{item.change}</span>
                    </div>
                    {rateError && (
                      <div className="text-xs text-red-500 mt-1">Failed to fetch rates</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Overview Editable Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Inventory Overview</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Unit:</span>
              <select
                value={stockUnit}
                onChange={e => handleUnitChange(e.target.value as "kg" | "g")}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
              {!editInventory ? (
                <button
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium"
                  onClick={() => {
                    setEditStockValues(stockValues);
                    setEditInventory(true);
                  }}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded text-sm font-medium"
                    onClick={saveInventory}
                  >
                    Save
                  </button>
                  <button
                    className="ml-2 px-3 py-1 bg-gray-400 text-white rounded text-sm font-medium"
                    onClick={() => setEditInventory(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stockCards.map((item, idx) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} shadow mb-3`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {item.label}
                  </p>
                  {editInventory ? (
                    <input
                      type="text"
                      value={editStockValues[item.key as keyof typeof editStockValues]}
                      onChange={e =>
                        setEditStockValues(vals => ({
                          ...vals,
                          [item.key]: e.target.value
                        }))
                      }
                      className="text-lg font-bold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  )}
                  <div className="text-xs text-gray-400">{item.subValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {summary.map((item, idx) => (
              <div
                key={item.label}
                className={`relative rounded-xl p-4 border transition-all ${
                  item.highlight
                    ? "bg-gradient-to-br from-[#7a1335] via-[#8d1a3d] to-[#a01b42] text-white shadow-lg border-[#7a1335]/20"
                    : "bg-white shadow-lg border-gray-200/50 hover:shadow-xl"
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${
                  item.highlight 
                    ? "bg-white/20 text-white" 
                    : "bg-gradient-to-br from-[#7a1335]/10 to-[#7a1335]/5 text-[#7a1335]"
                }`}>
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <p className={`text-xs font-medium uppercase tracking-wide ${
                    item.highlight ? "text-white/70" : "text-gray-500"
                  }`}>
                    {item.label}
                  </p>
                  <div className={`text-lg font-bold ${
                    item.highlight ? "text-white" : "text-gray-900"
                  }`}>
                    {item.value}
                  </div>
                  <div className={`text-xs ${
                    item.highlight ? "text-white/60" : "text-gray-400"
                  }`}>
                    {item.subValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Section */}
        <div className="relative bg-gradient-to-r from-[#7a1335] via-[#8d1a3d] to-[#a01b42] rounded-2xl p-8 shadow-xl overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }} />
          </div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FaTrophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Welcome to Premium Gold Trading</h2>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FaStar className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-white/90 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Experience luxury investment with our comprehensive gold trading platform. Real-time pricing, secure transactions, and premium service.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { 
              icon: FaShoppingCart, 
              title: "Gold Purchase", 
              desc: "Buy gold at live market rates with instant execution", 
              buttonText: "Start Trading",
              accent: "from-[#7a1335] to-[#a01b42]",
              onClick: () => handleNavigation("/bgoldpurchase")
            },
            { 
              icon: FaPiggyBank, 
              title: "SIP Portfolio", 
              desc: "Create systematic investment plans for regular gold accumulation", 
              buttonText: "Create SIP",
              accent: "from-purple-600 to-purple-800",
              onClick: () => handleNavigation("/bsipmanagement")
            },
            { 
              icon: FaCreditCard, 
              title: "Wallet Suite", 
              desc: "Manage funds, view transactions, and track your portfolio", 
              buttonText: "View Wallet",
              accent: "from-emerald-600 to-emerald-800",
              onClick: () => handleNavigation("/bwallet")
            }
          ].map((action, idx) => (
            <div 
              key={idx}
              className="group relative bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${action.accent} shadow-lg group-hover:scale-105 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{action.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{action.desc}</p>
                </div>
                <button
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${action.accent} text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  onClick={action.onClick}
                >
                  <span>{action.buttonText}</span>
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaGem className="w-6 h-6 text-[#7a1335]" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Status */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-white/95 backdrop-blur-sm rounded-xl px-8 py-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow animate-pulse"></div>
              <span className="font-medium text-gray-700">Premium Service Active</span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="w-5 h-5 text-[#7a1335]" />
              <span className="font-medium text-gray-700">Bank-Grade Security</span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <FaClock className="w-5 h-5 text-[#7a1335]" />
              <span className="font-medium text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom SVG icons
const FaShieldAlt = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const FaClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);