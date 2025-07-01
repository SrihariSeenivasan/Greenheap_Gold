import { useState } from "react";
import { FaGooglePay, FaQrcode, FaWallet } from "react-icons/fa";
import { B2B_PRIMARY } from "../theme";

const rechargeOptions = [
  { value: "UPI", label: "UPI", icon: <FaQrcode className="inline mr-1 text-[#7a1335]" /> },
  { value: "GOOGLE PAY", label: "Google Pay", icon: <FaGooglePay className="inline mr-1 text-[#7a1335]" /> },
  { value: "PAYTM", label: "Paytm", icon: <FaWallet className="inline mr-1 text-[#7a1335]" /> },
];

export default function Wallet() {
  const [showTopup, setShowTopup] = useState(false);
  const [rechargeMethod, setRechargeMethod] = useState("UPI");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedOption = rechargeOptions.find(opt => opt.value === rechargeMethod);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Wallet Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 relative">
              <span className="font-bold text-lg" style={{ color: B2B_PRIMARY }}>Wallet Balance</span>
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center border rounded px-3 py-1 text-sm bg-white shadow-sm hover:ring-2 hover:ring-[#7a1335] transition"
                  onClick={() => setDropdownOpen(v => !v)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                >
                  {selectedOption?.icon}
                  <span className="mr-1">{selectedOption?.label}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                    {rechargeOptions.map(opt => (
                      <button
                        key={opt.value}
                        className={`flex items-center w-full px-3 py-2 text-sm hover:bg-[#fbeaf0] ${
                          rechargeMethod === opt.value ? "bg-[#fbeaf0] font-bold" : ""
                        }`}
                        onClick={() => {
                          setRechargeMethod(opt.value);
                          setDropdownOpen(false);
                        }}
                        type="button"
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-3xl font-extrabold mb-6 text-[#7a1335]">₹0</div>
          </div>
          <button
            className="py-3 px-6 rounded-lg font-semibold text-white text-lg shadow transition hover:scale-105"
            style={{ background: B2B_PRIMARY }}
            onClick={() => setShowTopup(true)}
          >
            Top-up Wallet
          </button>
        </div>
        {/* Credit Card (optional, uncomment if needed)
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <div className="font-bold text-lg mb-2" style={{ color: B2B_PRIMARY }}>Credit Used / Available</div>
            <div className="text-xl mb-4">Used: ₹0 / Available: ₹0</div>
          </div>
          <button className="py-3 px-6 rounded-lg font-semibold text-white text-lg shadow transition hover:scale-105" style={{ background: B2B_PRIMARY }}>
            Request Credit Limit Increase
          </button>
        </div>
        */}
      </div>
      {/* Transaction History Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-bold mb-4 text-lg" style={{ color: B2B_PRIMARY }}>Wallet Transaction History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm rounded">
            <thead>
              <tr className="bg-[#fbeaf0] text-[#7a1335]">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#fbeaf0]/50 transition">
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Top-up Popup */}
      {showTopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xs text-center border-2 border-[#7a1335]">
            <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Top-up Wallet</h3>
            <p className="mb-4 text-gray-700">
              Confirm to use your registered bank account for wallet top-up?<br />
              <span className="block mt-2 text-sm">
                <span className="font-semibold">Recharge Method:</span> {rechargeMethod}
              </span>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded font-semibold text-white"
                style={{ background: B2B_PRIMARY }}
                onClick={() => setShowTopup(false)}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 rounded font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowTopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
