
const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src="/admin-avatar.png"
            alt="Admin Avatar"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Rahul Sharma</h2>
          <p className="text-yellow-600 font-semibold mb-4">Administrator</p>
          <div className="w-full">
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                value="rahul.admin@greenheap.com"
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                value="+91 98765 43210"
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-600 text-sm mb-1">Role</label>
              <input
                type="text"
                value="Super Admin"
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700"
              />
            </div>
            <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
