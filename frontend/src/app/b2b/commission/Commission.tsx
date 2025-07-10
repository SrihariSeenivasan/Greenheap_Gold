import { useEffect, useState } from "react";
import { B2B_PRIMARY } from "../theme";

// Example: Replace with real API or props
interface Purchase {
  month: string;
  type: "jewel" | "gold";
  amount: number;
  commission: number;
  status: "Paid" | "Pending";
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  downloadUrl?: string;
}

export default function BCommission() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    // Simulate fetching user purchases (replace with real API)
    setPurchases([
      {
        month: "April 2024",
        type: "jewel",
        amount: 50000,
        commission: 500,
        status: "Paid",
        customerName: "Rahul Sharma",
        customerMobile: "9876543210",
        customerEmail: "rahul@example.com",
        downloadUrl: "#"
      },
      {
        month: "March 2024",
        type: "gold",
        amount: 20000,
        commission: 200,
        status: "Pending",
        customerName: "Priya Singh",
        customerMobile: "9123456780",
        customerEmail: "priya@example.com",
        downloadUrl: "#"
      }
    ]);
  }, []);

  const totalCommission = purchases.reduce((sum, p) => sum + p.commission, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Commission / Incentive</h3>
      <div className="mb-4">
        <div className="font-semibold">Current Slab: <span className="text-gray-700">{purchases.length > 0 ? "Active" : "-"}</span></div>
        <div className="font-semibold">Monthly Earnings: <span className="text-gray-700">₹{totalCommission}</span></div>
        <div className="font-semibold">Payout Eligible: <span className="text-gray-700">{totalCommission > 0 ? "Yes" : "No"}</span></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1">Month</th>
              <th className="px-2 py-1">Type</th>
              <th className="px-2 py-1">Purchase Amount</th>
              <th className="px-2 py-1">Commission</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Customer Name</th>
              <th className="px-2 py-1">Mobile</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Download</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td className="px-2 py-1" colSpan={9} align="center">No purchases yet</td>
              </tr>
            ) : (
              purchases.map((p, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1">{p.month}</td>
                  <td className="px-2 py-1 capitalize">{p.type === "jewel" ? "Jewel" : "Gold Coin"}</td>
                  <td className="px-2 py-1">₹{p.amount}</td>
                  <td className="px-2 py-1">₹{p.commission}</td>
                  <td className="px-2 py-1">{p.status}</td>
                  <td className="px-2 py-1">{p.customerName}</td>
                  <td className="px-2 py-1">{p.customerMobile}</td>
                  <td className="px-2 py-1">{p.customerEmail}</td>
                  <td className="px-2 py-1">
                    {p.downloadUrl ? (
                      <a href={p.downloadUrl} className="text-xs underline" target="_blank" rel="noopener noreferrer">Download</a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
