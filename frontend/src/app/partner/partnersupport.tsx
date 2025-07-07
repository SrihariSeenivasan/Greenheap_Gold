import React, { useState } from "react";
import { faqs } from "../../../constants";
import { B2B_PRIMARY } from "../b2b/theme";

const PartnerSupport = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-2 sm:p-6">
      <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Support & Help</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Support & Relationship Manager</h3>
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
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8 mt-6">
        <h2 className="text-lg font-semibold mb-4">FAQs</h2>
        <ul className="space-y-4">
          {faqs.map((f, i) => (
            <li key={i}>
              <div className="font-semibold text-gray-800">{f.q}</div>
              <div className="text-gray-600">{f.a}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
        <div className="mb-2 text-gray-700">
          Email: <a href="mailto:partner-support@greenheap.com" className="text-[#7a1335] hover:underline">partner-support@greenheap.com</a>
        </div>
        <div className="mb-2 text-gray-700">
          Phone: <a href="tel:+919999999999" className="text-[#7a1335] hover:underline">+91 99999 99999</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerSupport;
