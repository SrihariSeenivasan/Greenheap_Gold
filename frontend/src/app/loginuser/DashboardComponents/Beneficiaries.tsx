import React, { useState } from "react";

interface Beneficiary {
  name: string;
  relation: string;
  dob: string;
  gender: string;
}

const genderOptions = ["Male", "Female", "Other"];

const LBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [form, setForm] = useState<Beneficiary>({
    name: "",
    relation: "",
    dob: "",
    gender: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleGenderSelect = (gender: string) => {
    setForm({ ...form, gender });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.relation || !form.dob || !form.gender) {
      setError("All fields are required.");
      return;
    }
    setBeneficiaries([...beneficiaries, form]);
    setForm({ name: "", relation: "", dob: "", gender: "" });
    setShowForm(false);
    setError(null);
  };

  const deleteBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Beneficiaries Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and organize your beneficiaries with ease. Add new beneficiaries 
            and keep track of their information in one secure place.
          </p>
        </div>

        {/* Add Beneficiary Button */}
        <div className="flex justify-center mb-8">
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-[#7a1335] to-[#a01b42] text-white rounded-2xl hover:from-[#5a0f28] hover:to-[#7a1335] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="text-2xl">{showForm ? "✕" : "+"}</span>
            {showForm ? "Cancel" : "Add New Beneficiary"}
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-[#7a1335] to-[#a01b42] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Add New Beneficiary</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#7a1335] focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Relation Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="relation"
                      type="text"
                      value={form.relation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#7a1335] focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-400"
                      placeholder="e.g., Spouse, Child, Parent"
                      required
                    />
                  </div>

                  {/* Date of Birth Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="dob"
                      type="date"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#7a1335] focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800"
                      required
                    />
                  </div>

                  {/* Gender Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {genderOptions.map((g) => (
                        <button
                          type="button"
                          key={g}
                          className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                            form.gender === g
                              ? "bg-[#7a1335] text-white border-[#7a1335] shadow-lg"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#7a1335] hover:text-[#7a1335]"
                          }`}
                          onClick={() => handleGenderSelect(g)}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-[#7a1335] to-[#a01b42] text-white rounded-xl hover:from-[#5a0f28] hover:to-[#7a1335] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Add Beneficiary
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beneficiaries List Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-[#7a1335] to-[#a01b42] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Your Beneficiaries</h2>
            {beneficiaries.length > 0 && (
              <span className="ml-auto bg-[#7a1335] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {beneficiaries.length} {beneficiaries.length === 1 ? 'Beneficiary' : 'Beneficiaries'}
              </span>
            )}
          </div>

          {beneficiaries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No beneficiaries yet</h3>
              <p className="text-gray-500">Click "Add New Beneficiary" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {beneficiaries.map((beneficiary, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Name</p>
                        <p className="text-lg font-bold text-gray-800">{beneficiary.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Relation</p>
                        <p className="text-lg font-semibold text-gray-700">{beneficiary.relation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Date of Birth</p>
                        <p className="text-lg font-semibold text-gray-700">{beneficiary.dob}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gender</p>
                        <p className="text-lg font-semibold text-gray-700">{beneficiary.gender}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteBeneficiary(index)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete beneficiary"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LBeneficiaries;