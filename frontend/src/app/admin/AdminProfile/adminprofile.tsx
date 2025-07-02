import { ChangeEvent, useState } from "react";

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
];

const initialProfile = {
  name: "Rahul Sharma",
  email: "rahul.admin@greenheap.com",
  countryCode: "+91",
  phone: "9876543210",
  role: "Super Admin",
  avatar: "/admin-avatar.png",
};

const AdminProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setProfile((prev) => ({
        ...prev,
        avatar: url,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (!profile.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(profile.email))
      newErrors.email = "Invalid email address";
    if (!profile.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(profile.phone))
      newErrors.phone = "Enter a valid phone number (7-15 digits)";
    if (!profile.role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    if (!validate()) return;
    setEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setAvatarPreview(initialProfile.avatar);
    setEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-100 p-8 max-w-lg w-full relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 p-1 shadow-lg">
                <img
                  src={avatarPreview}
                  alt="Admin Avatar"
                  className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format`;
                  }}
                />
              </div>
              {editing && (
                <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl p-3 cursor-pointer shadow-lg transition-all duration-200 hover:scale-105">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </label>
              )}
            </div>
            
            {editing ? (
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-800 text-center w-full bg-transparent border-b-2 border-pink-200 focus:border-pink-400 outline-none transition-colors duration-200 pb-1"
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    className="text-pink-600 font-medium text-center w-full bg-transparent border-b-2 border-pink-200 focus:border-pink-400 outline-none transition-colors duration-200 pb-1"
                    placeholder="Role"
                  />
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                <p className="text-pink-600 font-semibold text-lg bg-pink-50 px-4 py-2 rounded-full inline-block">
                  {profile.role}
                </p>
              </>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              {editing ? (
                <div>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl focus:border-pink-400 focus:bg-white outline-none transition-all duration-200 text-gray-700"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-700">
                  {profile.email}
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number
              </label>
              {editing ? (
                <div>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={profile.countryCode}
                      onChange={handleChange}
                      className="px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl focus:border-pink-400 focus:bg-white outline-none transition-all duration-200 text-gray-700 min-w-24"
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
                      className="flex-1 px-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl focus:border-pink-400 focus:bg-white outline-none transition-all duration-200 text-gray-700"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>}
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-gray-700">
                  {profile.countryCode} {profile.phone}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8">
            {editing ? (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-[#7a1335] to-rose-500 hover:from-[#7a1335] hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="w-full bg-gradient-to-r from-[#7a1335] to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;