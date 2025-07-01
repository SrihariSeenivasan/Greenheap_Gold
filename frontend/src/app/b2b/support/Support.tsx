import { B2B_PRIMARY } from "../theme";

export default function Support() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Support & Relationship Manager</h3>
        <form className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="Subject" />
          <textarea className="w-full border rounded px-3 py-2" placeholder="Describe your issue..." rows={4} />
          <button
            type="submit"
            className="py-2 px-4 rounded text-white font-semibold"
            style={{ background: B2B_PRIMARY }}
          >
            Raise Ticket
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Account Manager Contact</div>
        <div>Name: -</div>
        <div>Email: -</div>
        <div>Phone: -</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="font-bold mb-2" style={{ color: B2B_PRIMARY }}>Help Center / FAQs</div>
        <ul className="list-disc ml-6 text-gray-700">
          <li>How to track delivery?</li>
          <li>How to resolve disputes?</li>
        </ul>
      </div>
    </div>
  );
}
