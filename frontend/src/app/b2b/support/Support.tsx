import { useState } from "react";
import { B2B_PRIMARY } from "../theme";

export default function Support() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2200);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Support & Relationship Manager</h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
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
        {showPopup && (
          <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2">
            <div className="bg-white border border-[#7a1335] rounded shadow-lg px-8 py-4 text-center">
              <div className="text-[#7a1335] font-bold text-base">
                User ticket had sended successfully,<br />
                our team will contact you soon
              </div>
            </div>
          </div>
        )}
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
