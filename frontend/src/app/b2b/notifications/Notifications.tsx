import { B2B_PRIMARY } from "../theme";

export default function Notifications() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Notifications & Alerts</h3>
      <ul className="space-y-2">
        <li className="border-l-4 pl-3" style={{ borderColor: B2B_PRIMARY }}>
          Gold rate changed to ₹0/g
        </li>
        <li className="border-l-4 pl-3" style={{ borderColor: B2B_PRIMARY }}>
          New SIP scheme available!
        </li>
        <li className="border-l-4 pl-3" style={{ borderColor: B2B_PRIMARY }}>
          Commission payout processed.
        </li>
      </ul>
    </div>
  );
}
