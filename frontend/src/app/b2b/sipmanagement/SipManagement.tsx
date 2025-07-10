import { useState } from "react";
import { B2B_PRIMARY } from "../theme";

const SIP_PLANS = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Yearly", value: "yearly" },
];

const initialSips = [
  {
    name: "Rahul Sharma",
    startDate: "2024-06-01",
    amount: 5000,
    duration: 12,
    plan: "monthly",
    planName: "Gold Saver",
    status: "Active",
    commission: "₹500",
    mobile: "9876543210",
    email: "rahul@example.com",
  },
];

export default function SipManagement() {
  const [sips, setSips] = useState(initialSips);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    amount: "",
    duration: "",
    plan: "monthly",
    customPlan: "",
    planName: "",
    mobile: "",
    email: "",
  });
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx !== null) {
      setSips(sips.map((sip, idx) =>
        idx === editIdx
          ? {
              ...sip,
              ...form,
              amount: Number(form.amount),
              duration: Number(form.duration),
              plan: form.plan === "custom" && form.customPlan ? form.customPlan : form.plan,
              planName: form.planName,
              mobile: form.mobile,
              email: form.email,
            }
          : sip
      ));
      setEditIdx(null);
    } else {
      setSips([
        ...sips,
        {
          ...form,
          amount: Number(form.amount),
          duration: Number(form.duration),
          commission: "₹0",
          status: "Active",
          plan: form.plan === "custom" && form.customPlan ? form.customPlan : form.plan,
          planName: form.planName,
          mobile: form.mobile,
          email: form.email,
        },
      ]);
    }
    setForm({
      name: "",
      startDate: "",
      amount: "",
      duration: "",
      plan: "monthly",
      customPlan: "",
      planName: "",
      mobile: "",
      email: "",
    });
  };

  const handleEdit = (idx: number) => {
    const sip = sips[idx];
    setEditIdx(idx);
    setForm({
      name: sip.name,
      startDate: sip.startDate,
      amount: String(sip.amount),
      duration: String(sip.duration),
      plan: SIP_PLANS.some(p => p.value === sip.plan) ? sip.plan : "custom",
      customPlan: SIP_PLANS.some(p => p.value === sip.plan) ? "" : sip.plan,
      planName: sip.planName || "",
      mobile: sip.mobile || "",
      email: sip.email || "",
    });
  };

  const handleStatusChange = (idx: number, newStatus: string) => {
    setSips(sips.map((sip, i) => i === idx ? { ...sip, status: newStatus } : sip));
  };

  const filteredSips = sips.filter(sip =>
    sip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sip.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sip.mobile.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: B2B_PRIMARY }}>SIP Customer Management</h3>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search by name, email or mobile..."
          className="border rounded px-4 py-2 mb-4 w-full md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4" onSubmit={handleAddOrUpdate}>
          <input className="border rounded px-3 py-2" placeholder="Customer Name" name="name" value={form.name} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" type="date" placeholder="Start Date" name="startDate" value={form.startDate} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" type="number" placeholder="SIP Amount" name="amount" value={form.amount} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" type="number" placeholder="Duration (months)" name="duration" value={form.duration} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" type="tel" placeholder="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} required />
          <input className="border rounded px-3 py-2" type="email" placeholder="Email ID" name="email" value={form.email} onChange={handleChange} required />
          <select className="border rounded px-3 py-2" name="plan" value={form.plan} onChange={handleChange} required>
            {SIP_PLANS.map(plan => <option key={plan.value} value={plan.value}>{plan.label}</option>)}
            <option value="custom">Custom</option>
          </select>
          {form.plan === "custom" && (
            <input className="border rounded px-3 py-2" placeholder="Enter SIP Plan" name="customPlan" value={form.customPlan} onChange={handleChange} required />
          )}
          <input className="border rounded px-3 py-2" placeholder="SIP Plan Name" name="planName" value={form.planName} onChange={handleChange} required />
          <button type="submit" className="md:col-span-8 py-2 rounded font-semibold text-white" style={{ background: B2B_PRIMARY }}>
            {editIdx !== null ? "Update SIP" : "Add SIP"}
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Start Date</th>
                <th className="px-2 py-1">Amount</th>
                <th className="px-2 py-1">Duration</th>
                <th className="px-2 py-1">Mobile</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Plan</th>
                <th className="px-2 py-1">Plan Name</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Commission</th>
                <th className="px-2 py-1">Download</th>
                <th className="px-2 py-1">Edit</th>
                <th className="px-2 py-1">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSips.map((sip, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1">{sip.name}</td>
                  <td className="px-2 py-1">{sip.startDate}</td>
                  <td className="px-2 py-1">{sip.amount}</td>
                  <td className="px-2 py-1">{sip.duration}</td>
                  <td className="px-2 py-1">{sip.mobile}</td>
                  <td className="px-2 py-1">{sip.email}</td>
                  <td className="px-2 py-1 capitalize">{sip.plan}</td>
                  <td className="px-2 py-1">{sip.planName}</td>
                  <td className="px-2 py-1">{sip.status}</td>
                  <td className="px-2 py-1">{sip.commission}</td>
                  <td className="px-2 py-1"><button className="text-xs underline">Download</button></td>
                  <td className="px-2 py-1">
                    <button className="text-xs text-blue-600 underline" onClick={() => handleEdit(idx)} type="button">Edit</button>
                  </td>
                  <td className="px-2 py-1">
                    <select className="border rounded px-2 py-1 text-xs" value={sip.status} onChange={e => handleStatusChange(idx, e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredSips.length === 0 && (
                <tr>
                  <td colSpan={13} className="text-center text-gray-400 py-4">No matching SIPs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
