import { useState } from "react";

const referralLink = "https://yourdomain.com/?ref=PARTNER123";

const PartnerReferral = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-lg">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4">Your Referral Link</h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(referralLink)}`} alt="QR" />
          <span className="text-xs text-gray-500">Scan or share this QR to refer.</span>
        </div>
        <div className="text-gray-600 text-sm">
          Share this link or QR code. Anyone who signs up or buys gold/SIP via your link will be tracked for your commission.
        </div>
      </div>
    </div>
  );
};

export default PartnerReferral;
