import { useState } from "react";

const initialSPIPlans = [
  { id: 1, name: "SPI Plan 1", tenure: "6 months", monthly: "₹500", status: "Active", description: "A 6-month digital gold saving plan." },
  { id: 2, name: "SPI Plan 2", tenure: "12 months", monthly: "₹1,000", status: "Active", description: "A 12-month digital gold saving plan." },
];

const emptyPlan = {
  id: 0,
  name: "",
  tenure: "",
  monthly: "",
  status: "Active",
  description: "",
};

const SIPPlan = () => {
  const [spiPlans, setSPIPlans] = useState(initialSPIPlans);
  const [showAdd, setShowAdd] = useState(false);
  const [newPlan, setNewPlan] = useState(emptyPlan);
  const [showError, setShowError] = useState(false);

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = () => {
    if (!newPlan.name || !newPlan.tenure || !newPlan.monthly || !newPlan.status || !newPlan.description) {
      setShowError(true);
      return;
    }
    setSPIPlans((prev) => [
      ...prev,
      { ...newPlan, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
    setShowAdd(false);
    setNewPlan(emptyPlan);
  };

  const handleStatusToggle = (id: number) => {
    setSPIPlans((prev) =>
      prev.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status: plan.status === "Active" ? "Closed" : "Active",
            }
          : plan
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Digital Gold SPI Plans</h1>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 text-yellow-700">Plan Name</th>
              <th className="px-4 py-2 text-yellow-700">Tenure</th>
              <th className="px-4 py-2 text-yellow-700">Monthly Amount</th>
              <th className="px-4 py-2 text-yellow-700">Description</th>
              <th className="px-4 py-2 text-yellow-700">Status</th>
              <th className="px-4 py-2 text-yellow-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spiPlans.map((plan) => (
              <tr key={plan.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">{plan.name}</td>
                <td className="px-4 py-3">{plan.tenure}</td>
                <td className="px-4 py-3">{plan.monthly}</td>
                <td className="px-4 py-3 text-gray-600">{plan.description}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                      plan.status === "Active"
                        ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() => handleStatusToggle(plan.id)}
                  >
                    {plan.status === "Active" ? "Close" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition"
          onClick={() => setShowAdd(true)}
        >
          Add New SPI Plan
        </button>
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 min-w-[320px] max-w-[90vw]">
              <h2 className="text-lg font-bold mb-4 text-yellow-700">Add New SPI Plan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left column: Plan Name, Tenure */}
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm mb-1">Plan Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newPlan.name}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Plan Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Tenure</label>
                    <input
                      type="text"
                      name="tenure"
                      value={newPlan.tenure}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="e.g. 12 months"
                    />
                  </div>
                </div>
                {/* Right column: Monthly Amount, Status, Description */}
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm mb-1">Monthly Amount</label>
                    <input
                      type="text"
                      name="monthly"
                      value={newPlan.monthly}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="e.g. ₹1,000"
                    />
                  </div>
                 
                  <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newPlan.description}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  className="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={handleAddPlan}
                >
                  Add
                </button>
                <button
                  className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                  onClick={() => {
                    setShowAdd(false);
                    setNewPlan(emptyPlan);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Creative Centered Error Popup */}
        {showError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
           
              <div className="mb-4 text-gray-700 text-center">Please fill all fields.</div>
              <button
                className="px-6 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow transition"
                onClick={() => setShowError(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPPlan;
