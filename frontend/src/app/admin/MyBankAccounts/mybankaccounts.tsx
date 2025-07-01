import { useState } from "react";

const initialAccounts = [
  { id: 1, bank: "HDFC Bank", account: "XXXX1234", ifsc: "HDFC0001234", status: "Active", description: "Primary salary account." },
  { id: 2, bank: "SBI", account: "XXXX5678", ifsc: "SBIN0005678", status: "Inactive", description: "Savings account for investments." },
];

const emptyAccount = {
  id: 0,
  bank: "",
  account: "",
  ifsc: "",
  status: "Active",
  description: "",
};

const MyBankAccounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showAdd, setShowAdd] = useState(false);
  const [newAccount, setNewAccount] = useState(emptyAccount);
  const [showError, setShowError] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAccount = () => {
    if (!newAccount.bank || !newAccount.account || !newAccount.ifsc || !newAccount.description) {
      setShowError(true);
      return;
    }
    if (editIdx !== null) {
      setAccounts((prev) =>
        prev.map((acc, idx) => (idx === editIdx ? { ...newAccount, id: acc.id } : acc))
      );
      setEditIdx(null);
    } else {
      setAccounts((prev) => [
        ...prev,
        { ...newAccount, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    setShowAdd(false);
    setNewAccount(emptyAccount);
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setNewAccount(accounts[idx]);
    setShowAdd(true);
  };

  const handleStatusToggle = (id: number) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              status: acc.status === "Active" ? "Inactive" : "Active",
            }
          : acc
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-full sm:max-w-5xl">
        <h1 className="text-xl sm:text-2xl font-bold text-[#7a1335] mb-4 sm:mb-6">My Bank Accounts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-[#7a1335]">Bank</th>
                <th className="px-4 py-2 text-[#7a1335]">Account</th>
                <th className="px-4 py-2 text-[#7a1335]">IFSC</th>
                <th className="px-4 py-2 text-[#7a1335]">Status</th>
                <th className="px-4 py-2 text-[#7a1335]">Description</th>
                <th className="px-4 py-2 text-[#7a1335]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => (
                
                <tr key={acc.id} className="border-b last:border-b-0">
                  {/* Left: Bank, Account */}
                  <td className="px-4 py-3">{acc.bank}</td>
                  <td className="px-4 py-3">{acc.account}</td>
                  {/* Right: IFSC, Status */}
                  <td className="px-4 py-3">{acc.ifsc}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      acc.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{acc.description}</td>
                  <td className="px-4 py-3 space-x-2">
                    <div className="flex flex-row gap-3 mt-6">
                    <button
                      className={`px-3 py-1 rounded text-xs font-semibold transition ${
                        acc.status === "Active"
                          ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() => handleStatusToggle(acc.id)}
                    >
                      {acc.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                    </div>
                    {/* ...existing code for Remove if needed... */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
          <button
            className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition"
            onClick={() => setShowAdd(true)}
          >
            Add Bank Account
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 min-w-[90vw] sm:min-w-[320px] max-w-[98vw] sm:max-w-[90vw]">
              <h2 className="text-lg font-bold mb-4 text-[#7a1335]">{editIdx !== null ? "Edit Bank Account" : "Add Bank Account"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left: Bank, Account */}
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm mb-1">Bank</label>
                    <input
                      type="text"
                      name="bank"
                      value={newAccount.bank}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Account</label>
                    <input
                      type="text"
                      name="account"
                      value={newAccount.account}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Account Number"
                    />
                  </div>
                </div>
                {/* Right: IFSC, Description */}
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="block text-sm mb-1">IFSC</label>
                    <input
                      type="text"
                      name="ifsc"
                      value={newAccount.ifsc}
                      onChange={handleAddChange}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="IFSC Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newAccount.description}
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
                  className="px-4 py-1 rounded bg-[#7a1335] hover:bg-[#a31d4b] text-white"
                  onClick={handleAddAccount}
                >
                  {editIdx !== null ? "Save" : "Add"}
                </button>
                <button
                  className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                  onClick={() => {
                    setShowAdd(false);
                    setNewAccount(emptyAccount);
                    setEditIdx(null);
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
              <span className="material-icons text-5xl text-[#7a1335] mb-2 animate-bounce">warning_amber</span>
              <h2 className="text-xl font-bold text-[#7a1335] mb-2 text-center">Missing Fields</h2>
              <div className="mb-4 text-gray-700 text-center">Please fill all fields.</div>
              <button
                className="px-6 py-2 rounded bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold shadow transition"
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

export default MyBankAccounts;
