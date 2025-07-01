import { B2B_PRIMARY } from "../theme";

export default function Profile() {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>Business Profile</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border rounded px-3 py-2" placeholder="Company Name" />
        <input className="border rounded px-3 py-2" placeholder="GSTIN" />
        <input className="border rounded px-3 py-2" placeholder="PAN" />
        <input className="border rounded px-3 py-2" placeholder="Business Address" />
        <input className="border rounded px-3 py-2" placeholder="Bank Account" />
        <input className="border rounded px-3 py-2" placeholder="UPI ID" />
        <input className="border rounded px-3 py-2" placeholder="Add Team Member Email" />
        <button
          type="submit"
          className="md:col-span-2 py-2 rounded font-semibold text-white"
          style={{ background: B2B_PRIMARY }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
