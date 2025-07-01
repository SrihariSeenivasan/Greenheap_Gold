const faqs = [
  { q: "How do I earn commission?", a: "Share your referral link. When someone buys gold or starts a SIP, you earn commission." },
  { q: "How does referral tracking work?", a: "We use cookies and user accounts to track referrals for up to 30 days." },
  { q: "What are the commission slabs?", a: "Commission rates vary by product and are shown in your dashboard." },
];

const PartnerSupport = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Support & Help</h1>
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
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
      {/* <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition">
        Raise Support Ticket
      </button> */}
    </div>
  </div>
);

export default PartnerSupport;
