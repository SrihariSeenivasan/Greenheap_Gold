import { B2B_PRIMARY } from "../theme";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6" style={{ color: B2B_PRIMARY }}>B2B Login</h2>
        <form className="space-y-4">
          <input className="w-full border rounded px-3 py-2" type="email" placeholder="Business Email" required />
          <input className="w-full border rounded px-3 py-2" type="password" placeholder="Password" required />
          <button
            type="submit"
            className="w-full py-2 rounded font-semibold text-white"
            style={{ background: B2B_PRIMARY }}
          >
            Login
          </button>
          <div className="flex justify-between text-sm mt-2">
            <a href="#" className="text-gray-500 hover:underline">Forgot Password?</a>
            <a href="#" className="text-gray-500 hover:underline">Register Business</a>
          </div>
        </form>
      </div>
    </div>
  );
}
