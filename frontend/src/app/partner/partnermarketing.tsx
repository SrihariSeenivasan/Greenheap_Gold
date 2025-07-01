const banners = [
  { url: "/banners/gold1.jpg", label: "Gold Banner 1" },
  { url: "/banners/sip1.jpg", label: "SIP Banner 1" },
];

const captions = [
  "Invest in gold today! Secure your future. #GoldSIP",
  "Start your SIP journey with us and earn rewards!",
];

const PartnerMarketing = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 sm:p-6">
    <h1 className="text-2xl font-bold text-yellow-700 mb-6">Marketing Tools</h1>
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Banners</h2>
      <div className="flex flex-wrap gap-4">
        {banners.map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={b.url} alt={b.label} className="w-40 h-24 object-cover rounded shadow" />
            <a href={b.url} download className="text-xs text-yellow-600 mt-2 hover:underline">Download</a>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Captions & Messages</h2>
      <ul className="list-disc ml-6 text-gray-700">
        {captions.map((c, i) => (
          <li key={i} className="mb-1">{c}</li>
        ))}
      </ul>
    </div>
    <div>
      <h2 className="text-lg font-semibold mb-2">PDF Flyers</h2>
      <a href="/flyers/gold-flyer.pdf" download className="text-yellow-600 hover:underline">Download Gold Flyer</a>
    </div>
  </div>
);

export default PartnerMarketing;
