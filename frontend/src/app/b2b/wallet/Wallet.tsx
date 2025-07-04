import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaCreditCard, FaGooglePay, FaHistory, FaPlus, FaQrcode, FaWallet } from "react-icons/fa";

const B2B_PRIMARY = "#7a1335";

const rechargeOptions = [
  { value: "UPI", label: "UPI", icon: <FaQrcode className="inline mr-2 text-purple-600" /> },
  { value: "GOOGLE PAY", label: "Google Pay", icon: <FaGooglePay className="inline mr-2 text-blue-600" /> },
  { value: "PAYTM", label: "Paytm", icon: <FaWallet className="inline mr-2 text-blue-500" /> },
];

const mockTransactions = [
  { id: 1, date: "2024-07-03", type: "Top-up", amount: "+₹5,000", status: "Completed", color: "text-green-600" },
  { id: 2, date: "2024-07-02", type: "Purchase", amount: "-₹1,250", status: "Completed", color: "text-red-600" },
  { id: 3, date: "2024-07-01", type: "Top-up", amount: "+₹2,500", status: "Completed", color: "text-green-600" },
  { id: 4, date: "2024-06-30", type: "Purchase", amount: "-₹850", status: "Completed", color: "text-red-600" },
];

export default function Wallet() {
  const [showTopup, setShowTopup] = useState(false);
  const [rechargeMethod, setRechargeMethod] = useState("UPI");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");

  const selectedOption = rechargeOptions.find(opt => opt.value === rechargeMethod);

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-1 sm:p-2 md:p-3 space-y-4 sm:space-y-5">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">My Wallet</h1>
          <p className="text-gray-600 text-xs">Manage your payments and transactions</p>
        </div>

        {/* Wallet Cards */}
        <div className="grid grid-cols-1 gap-3">
          {/* Main Wallet Card */}
          <div className="relative overflow-hidden">
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl shadow-lg p-4 text-white relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full -ml-6 -mb-6"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                      <FaWallet className="text-lg" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Wallet Balance</h3>
                      <p className="text-xs opacity-80">Available to spend</p>
                    </div>
                  </div>
                  
                  {/* Payment Method Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium hover:bg-opacity-30 transition-all duration-200"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {selectedOption?.icon}
                      <span className="mr-1">{selectedOption?.label}</span>
                      <svg className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-20 overflow-hidden">
                        {rechargeOptions.map(opt => (
                          <button
                            key={opt.value}
                            className={`flex items-center w-full px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                              rechargeMethod === opt.value ? "bg-purple-50 text-purple-700 font-semibold" : "text-gray-700"
                            }`}
                            onClick={() => {
                              setRechargeMethod(opt.value);
                              setDropdownOpen(false);
                            }}
                          >
                            {opt.icon}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold mb-1">₹0</div>
                  <div className="text-xs opacity-80">Last updated: Today</div>
                </div>

                <button
                  className="w-full bg-white text-purple-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow flex items-center justify-center text-sm"
                  onClick={() => setShowTopup(true)}
                >
                  <FaPlus className="mr-1" />
                  Top-up Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            {/* Credit Card */}
            <div className="bg-white rounded-xl shadow p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center mr-2">
                    <FaCreditCard className="text-white text-base" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Credit Limit</h3>
                    <p className="text-xs text-gray-600">Available credit</p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-lg font-bold text-gray-800">₹0 / ₹0</div>
                <div className="text-xs text-gray-600">Used / Available</div>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 px-3 rounded hover:from-orange-600 hover:to-red-700 transition-all duration-200 text-xs">
                Request Increase
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded p-2 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-600">₹0</div>
                    <div className="text-xs text-green-700">This Month</div>
                  </div>
                  <FaArrowUp className="text-green-600 text-base" />
                </div>
              </div>
              <div className="bg-red-50 rounded p-2 border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-red-600">₹0</div>
                    <div className="text-xs text-red-700">Spent</div>
                  </div>
                  <FaArrowDown className="text-red-600 text-base" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow border border-gray-100">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaHistory className="text-gray-600 mr-2 text-base" />
                <h3 className="text-base font-semibold text-gray-800">Transaction History</h3>
              </div>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-xs">
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTransactions.length > 0 ? (
                  mockTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        <div className="flex items-center">
                          {transaction.type === 'Top-up' ? (
                            <FaArrowUp className="text-green-500 mr-1" />
                          ) : (
                            <FaArrowDown className="text-red-500 mr-1" />
                          )}
                          {transaction.type}
                        </div>
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap text-xs font-semibold ${transaction.color}`}>
                        {transaction.amount}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-gray-500 text-xs">
                      <FaHistory className="mx-auto text-2xl mb-2 opacity-50" />
                      <p className="text-base">No transactions yet</p>
                      <p className="text-xs">Your transaction history will appear here</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top-up Modal */}
        {showTopup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              padding: 4,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "0.75rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                width: "100%",
                maxWidth: 270,
                padding: 12,
                position: "relative",
                margin: "0 auto",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#ede9fe",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px auto",
                  }}
                >
                  <FaPlus className="text-purple-600 text-base" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2d2d2d", marginBottom: 4 }}>
                  Top-up Wallet
                </h3>
                <p style={{ color: "#666", fontSize: 11 }}>Add money to your wallet</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Amount Input */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#444", marginBottom: 4 }}>
                    Enter Amount
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#888",
                        fontSize: 13,
                      }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        padding: "7px 7px 7px 22px",
                        border: "1px solid #d1d5db",
                        borderRadius: 5,
                        fontSize: 13,
                        outline: "none",
                        marginBottom: 0,
                      }}
                      placeholder="0"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#444", marginBottom: 4 }}>
                    Quick Select
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {quickAmounts.map(amount => (
                      <button
                        key={amount}
                        style={{
                          padding: "6px 0",
                          borderRadius: 5,
                          border: topupAmount === amount.toString() ? "2px solid #a78bfa" : "1px solid #d1d5db",
                          background: topupAmount === amount.toString() ? "#ede9fe" : "#fff",
                          color: topupAmount === amount.toString() ? "#7c3aed" : "#444",
                          fontWeight: 600,
                          fontSize: 12,
                          transition: "all 0.15s",
                          cursor: "pointer",
                        }}
                        onClick={() => setTopupAmount(amount.toString())}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#444", marginBottom: 4 }}>
                    Payment Method
                  </label>
                  <div
                    style={{
                      padding: 7,
                      border: "1px solid #d1d5db",
                      borderRadius: 5,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {selectedOption?.icon}
                    <span style={{ fontWeight: 500, fontSize: 12 }}>{selectedOption?.label}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 6, paddingTop: 4 }}>
                  <button
                    style={{
                      flex: 1,
                      background: "linear-gradient(to right, #7c3aed, #6366f1)",
                      color: "#fff",
                      fontWeight: 600,
                      padding: "7px 0",
                      borderRadius: 5,
                      border: "none",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onClick={() => setShowTopup(false)}
                  >
                    Confirm Top-up
                  </button>
                  <button
                    style={{
                      flex: 1,
                      background: "#e5e7eb",
                      color: "#374151",
                      fontWeight: 600,
                      padding: "7px 0",
                      borderRadius: 5,
                      border: "none",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onClick={() => setShowTopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}