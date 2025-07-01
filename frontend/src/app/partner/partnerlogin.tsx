import { useState } from "react";

const PartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add state for error, loading, etc.

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-2">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-sm">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">Partner Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <a href="/partner/forgot-password" className="text-yellow-600 hover:underline">Forgot password?</a>
          <a href="/partner/register" className="text-gray-500 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
