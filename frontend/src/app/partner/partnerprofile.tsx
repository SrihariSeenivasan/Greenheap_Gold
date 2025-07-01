import { useState } from "react";

const initialProfile = {
  name: "Partner Name",
  email: "partner@email.com",
  countryCode: "+91",
  phone: "9876543210",
  aadhaar: "",
  pan: "",
  upi: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
};

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
  // ...add more as needed
];

const PartnerProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string>("");
  const [panFile, setPanFile] = useState<File | null>(null);
  const [panPreview, setPanPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAadhaarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarFile(e.target.files[0]);
      setAadhaarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPanFile(e.target.files[0]);
      setPanPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    // TODO: Save profile logic, upload files if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-[#f7dbe3] flex items-center justify-center p-2 sm:p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#7a1335] mb-2">Basic Details & KYC</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mobile Number</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={profile.countryCode}
                onChange={handleChange}
                className="px-2 py-2 border rounded bg-yellow-50 text-gray-700 focus:outline-none focus:border-yellow-400"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Phone"
              />
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-semibold mb-1">Aadhaar Card</label>
            <div className="flex flex-col gap-2">
              {aadhaarPreview && (
                <div className="flex flex-col items-start gap-1">
                  {aadhaarFile?.type.startsWith("image") ? (
                    <img
                      src={aadhaarPreview}
                      alt="Aadhaar Preview"
                      className="w-32 h-20 object-cover rounded border mb-1"
                    />
                  ) : (
                    <a
                      href={aadhaarPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline mb-1"
                    >
                      View Aadhaar PDF
                    </a>
                  )}
                  <span className="text-xs text-gray-500">{aadhaarFile?.name}</span>
                </div>
              )}
              <label className="flex flex-col items-center cursor-pointer bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-3 hover:bg-yellow-100 transition">
                <span className="text-yellow-700 font-semibold text-xs mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  Upload Aadhaar
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleAadhaarUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div> */}
          {/* <div>
            <label className="block text-sm font-semibold mb-1">PAN Card</label>
            <div className="flex flex-col gap-2">
              {panPreview && (
                <div className="flex flex-col items-start gap-1">
                  {panFile?.type.startsWith("image") ? (
                    <img
                      src={panPreview}
                      alt="PAN Preview"
                      className="w-32 h-20 object-cover rounded border mb-1"
                    />
                  ) : (
                    <a
                      href={panPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline mb-1"
                    >
                      View PAN PDF
                    </a>
                  )}
                  <span className="text-xs text-gray-500">{panFile?.name}</span>
                </div>
              )}
              <label className="flex flex-col items-center cursor-pointer bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-3 hover:bg-yellow-100 transition">
                <span className="text-yellow-700 font-semibold text-xs mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  Upload PAN
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handlePanUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div> */}
        </div>
        {/* Bank Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#7a1335] mb-2">Bank Details</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={profile.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Bank Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={profile.accountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Account Number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">IFSC Code</label>
            <input
              type="text"
              name="ifsc"
              value={profile.ifsc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="IFSC Code"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">UPI ID</label>
            <input
              type="text"
              name="upi"
              value={profile.upi}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="UPI ID"
            />
          </div>
        </div>
        {/* Save Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            className="bg-[#7a1335] hover:bg-[#5a0e28] text-white font-semibold py-2 px-8 rounded transition"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
