import { B2B_PRIMARY } from "../theme";

const summary = [
  { label: "Total Gold Purchased", value: "₹0 / 0g", highlight: true },
  { label: "SIP Accounts Created", value: "0" },
  { label: "Monthly Purchase Volume", value: "0g" },
  { label: "Pending Orders", value: "0" },
  { label: "Wallet Balance", value: "₹0" },
];

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {summary.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg shadow p-6 flex flex-col items-center ${
              item.highlight ? "text-white" : "bg-white"
            }`}
            style={item.highlight ? { background: B2B_PRIMARY } : {}}
          >
            <div className="font-semibold">{item.label}</div>
            <div className="text-2xl font-bold mt-2">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px] flex items-center justify-center">
          <span className="text-gray-400">[Monthly Purchase Trends Graph]</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px] flex items-center justify-center">
          <span className="text-gray-400">[SIP Growth Graph]</span>
        </div>
      </div>
    </div>
  );
}
