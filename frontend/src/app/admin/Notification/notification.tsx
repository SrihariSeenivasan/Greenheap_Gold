import { useState } from "react";

const notifications = [
  { id: 1, message: "Gold price updated.", date: "2024-06-01" },
  { id: 2, message: "Commission payout processed.", date: "2024-05-30" },
];

const Notification = () => {
  const [msg, setMsg] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
        <form
          className="flex gap-2 mb-6"
          onSubmit={e => {
            e.preventDefault();
            // handle send notification
            setMsg("");
          }}
        >
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded bg-gray-100 text-gray-700"
            placeholder="Type notification message..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 rounded transition"
          >
            Send
          </button>
        </form>
        <ul className="divide-y">
          {notifications.map(n => (
            <li key={n.id} className="py-3 flex justify-between items-center">
              <span className="text-gray-700">{n.message}</span>
              <span className="text-xs text-gray-400">{n.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
