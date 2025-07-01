import { ChangeEvent, useState } from "react";

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
  // Add more as needed
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
    // Here you would typically send updated profile to backend
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setAvatarPreview(initialProfile.avatar);
    setEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-full sm:max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={avatarPreview}
              alt="Admin Avatar"
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[#7a1335] shadow object-cover"
            />
            {editing && (
              <label className="absolute bottom-2 right-2 bg-[#7a1335] hover:bg-[#a31d4b] text-white rounded-full p-2 cursor-pointer shadow transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <span className="material-icons text-base">edit</span>
              </label>
            )}
          </div>
          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-xl font-bold text-[#7a1335] mb-1 text-center border-b border-[#fbeaf0] focus:outline-none focus:border-[#7a1335] bg-[#fbeaf0] px-2"
                placeholder="Name"
              />
              {errors.name && <div className="text-xs text-red-500 mb-1">{errors.name}</div>}
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="text-[#7a1335] font-semibold mb-4 text-center border-b border-[#fbeaf0] focus:outline-none focus:border-[#7a1335] bg-[#fbeaf0] px-2"
                placeholder="Role"
              />
              {errors.role && <div className="text-xs text-red-500 mb-1">{errors.role}</div>}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#7a1335] mb-1">{profile.name}</h2>
              <p className="text-[#7a1335] font-semibold mb-4">{profile.role}</p>
            </>
          )}
          <div className="w-full">
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              {editing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded bg-[#fbeaf0] text-gray-700 focus:outline-none focus:border-[#7a1335]"
                    placeholder="Email"
                  />
                  {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
                </>
              ) : (
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
                />
              )}
            </div>
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              {editing ? (
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={profile.countryCode}
                    onChange={handleChange}
                    className="px-2 py-2 border rounded bg-[#fbeaf0] text-gray-700 focus:outline-none focus:border-[#7a1335]"
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
                    className="flex-1 px-3 py-2 border rounded bg-[#fbeaf0] text-gray-700 focus:outline-none focus:border-[#7a1335]"
                    placeholder="Phone number"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={`${profile.countryCode} ${profile.phone}`}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
                />
              )}
              {editing && errors.phone && <div className="text-xs text-red-500">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Role</label>
              {editing ? (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-[#fbeaf0] text-gray-700 focus:outline-none focus:border-[#7a1335]"
                  placeholder="Role"
                />
              ) : (
                <input
                  type="text"
                  value={profile.role}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
                />
              )}
            </div>
            {editing ? (
              <div className="flex gap-3 mt-4">
                <button
                  className="w-full bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 rounded transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-4 w-full bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 rounded transition"
                onClick={handleEdit}
              >
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
