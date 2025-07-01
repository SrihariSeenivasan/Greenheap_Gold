import { B2B_PRIMARY } from "../theme";

export default function MarketingResources() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Marketing Resources</h3>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-blue-600 underline">Download Co-branded Flyers</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 underline">SIP Brochures</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 underline">Branding Kit</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 underline">Social Post Templates</a>
        </li>
      </ul>
    </div>
  );
}
