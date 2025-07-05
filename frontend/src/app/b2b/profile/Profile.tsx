import { useState } from "react";
import { B2B_PRIMARY } from "../theme";

type ProfileForm = {
  companyName: string;
  gstin: string;
  pan: string;
  address: string;
  bankAccount: string;
  upi: string;
  teamEmail: string;
};

const initialForm: ProfileForm = {
  companyName: "",
  gstin: "",
  pan: "",
  address: "",
  bankAccount: "",
  upi: "",
  teamEmail: "",
};

export default function Profile() {
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

  const validate = (values: ProfileForm) => {
    const errs: Partial<ProfileForm> = {};
    if (!values.companyName) errs.companyName = "Company Name is required";
    if (!values.gstin) errs.gstin = "GSTIN is required";
    else if (!/^[0-9A-Z]{15}$/.test(values.gstin)) errs.gstin = "Invalid GSTIN";
    if (!values.pan) errs.pan = "PAN is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.pan)) errs.pan = "Invalid PAN";
    if (!values.address) errs.address = "Business Address is required";
    if (!values.bankAccount) errs.bankAccount = "Bank Account is required";
    if (!values.upi) errs.upi = "UPI ID is required";
    else if (!/^[\w.-]+@[\w.-]+$/.test(values.upi)) errs.upi = "Invalid UPI ID";
    if (!values.teamEmail) errs.teamEmail = "Team Member Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.teamEmail)) errs.teamEmail = "Invalid Email";
    return errs;
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Basic Company Details Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: B2B_PRIMARY }}>
          <span role="img" aria-label="company">🏢</span> Basic Company Details
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleProfileSubmit} autoComplete="off">
          <div>
            <input
              className={`border rounded px-3 py-2 w-full ${errors.companyName ? "border-red-500" : ""}`}
              placeholder="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={handleProfileChange}
            />
            {errors.companyName && <span className="text-xs text-red-500">{errors.companyName}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full uppercase ${errors.gstin ? "border-red-500" : ""}`}
              placeholder="GSTIN"
              name="gstin"
              value={form.gstin}
              onChange={handleProfileChange}
              maxLength={15}
            />
            {errors.gstin && <span className="text-xs text-red-500">{errors.gstin}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full uppercase ${errors.pan ? "border-red-500" : ""}`}
              placeholder="PAN"
              name="pan"
              value={form.pan}
              onChange={handleProfileChange}
              maxLength={10}
            />
            {errors.pan && <span className="text-xs text-red-500">{errors.pan}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full ${errors.address ? "border-red-500" : ""}`}
              placeholder="Business Address"
              name="address"
              value={form.address}
              onChange={handleProfileChange}
            />
            {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full ${errors.bankAccount ? "border-red-500" : ""}`}
              placeholder="Bank Account"
              name="bankAccount"
              value={form.bankAccount}
              onChange={handleProfileChange}
            />
            {errors.bankAccount && <span className="text-xs text-red-500">{errors.bankAccount}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full ${errors.upi ? "border-red-500" : ""}`}
              placeholder="UPI ID"
              name="upi"
              value={form.upi}
              onChange={handleProfileChange}
            />
            {errors.upi && <span className="text-xs text-red-500">{errors.upi}</span>}
          </div>
          <div>
            <input
              className={`border rounded px-3 py-2 w-full ${errors.teamEmail ? "border-red-500" : ""}`}
              placeholder="Add Team Member Email"
              name="teamEmail"
              value={form.teamEmail}
              onChange={handleProfileChange}
            />
            {errors.teamEmail && <span className="text-xs text-red-500">{errors.teamEmail}</span>}
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="w-full py-2 rounded font-semibold text-white transition-colors duration-200 shadow"
              style={{ background: B2B_PRIMARY }}
            >
              <span role="img" aria-label="save">💾</span> Save Profile
            </button>
          </div>
        </form>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
            <div className="bg-white rounded shadow-lg px-8 py-6 text-center animate-bounce">
              <div className="text-green-600 font-bold text-lg mb-2 flex items-center justify-center gap-2">
                <span role="img" aria-label="success">✅</span> Profile saved successfully
              </div>
            </div>
          </div>
        )}
      </div>
      {/* KYC Documents Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: B2B_PRIMARY }}>
            <span role="img" aria-label="kyc">📄</span> KYC Documents
          </h3>
          <span className="text-sm text-gray-500 mt-2 md:mt-0">Update KYC documents every year</span>
        </div>
        {/* Uploaded Documents List - with image/file preview style */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-gray-700">Uploaded Documents</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-gray-50 rounded p-3 border hover:shadow transition">
              <img src="/assets/kyc/gst_certificate.png" alt="GST Certificate" className="w-12 h-12 object-contain mb-2" />
              <span className="text-xs font-medium text-gray-700 mb-1">GST Certificate</span>
              <a href="#" className="text-xs text-blue-600 underline">gst_certificate.pdf</a>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded p-3 border hover:shadow transition">
              <img src="/assets/kyc/pan_card.png" alt="PAN Card" className="w-12 h-12 object-contain mb-2" />
              <span className="text-xs font-medium text-gray-700 mb-1">PAN Card</span>
              <a href="#" className="text-xs text-blue-600 underline">pan_card.pdf</a>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded p-3 border hover:shadow transition">
              <img src="/assets/kyc/address_proof.png" alt="Address Proof" className="w-12 h-12 object-contain mb-2" />
              <span className="text-xs font-medium text-gray-700 mb-1">Address Proof</span>
              <a href="#" className="text-xs text-blue-600 underline">address_proof.pdf</a>
            </div>
            <div className="flex flex-col items-center bg-gray-50 rounded p-3 border hover:shadow transition">
              <img src="/assets/kyc/bank_statement.png" alt="Bank Statement" className="w-12 h-12 object-contain mb-2" />
              <span className="text-xs font-medium text-gray-700 mb-1">Bank Statement</span>
              <a href="#" className="text-xs text-blue-600 underline">bank_statement.pdf</a>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">GST Certificate</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#7a1335]/90 file:text-white hover:file:bg-[#7a1335]" />
            </div>
            <div>
              <label className="block mb-1 font-medium">PAN Card</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#7a1335]/90 file:text-white hover:file:bg-[#7a1335]" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Company Address Proof</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#7a1335]/90 file:text-white hover:file:bg-[#7a1335]" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bank Statement</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#7a1335]/90 file:text-white hover:file:bg-[#7a1335]" />
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-6 rounded font-semibold text-white transition-colors duration-200 shadow"
            style={{ background: B2B_PRIMARY }}
          >
            <span role="img" aria-label="update">🔄</span> Update KYC Documents
          </button>
        </form>
        <div className="mt-4 text-xs text-gray-500">
          <span>Last KYC update: <span className="font-semibold text-gray-700">--/--/----</span></span>
          <span className="ml-4">Next update required: <span className="font-semibold text-gray-700">--/--/----</span></span>
        </div>
      </div>
    </div>
  );
}
