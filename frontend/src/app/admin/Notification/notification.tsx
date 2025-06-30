import { useState } from "react";

// Example notification data with type and user/partner info
const allNotifications = [
  { id: 1, message: "Gold price updated.", date: "2024-06-01", type: "all" },
  { id: 2, message: "Commission payout processed.", date: "2024-05-30", type: "partner" },
  { id: 3, message: "Welcome to GreenHeap!", date: "2024-05-29", type: "user" },
  { id: 4, message: "Partner payout released.", date: "2024-05-28", type: "partner" },
  { id: 5, message: "Your KYC is approved.", date: "2024-05-27", type: "user" },
  { id: 6, message: "System maintenance scheduled.", date: "2024-05-26", type: "all" },
  { id: 7, message: "New offer for partners.", date: "2024-05-25", type: "partner" },
  { id: 8, message: "Gold price dropped.", date: "2024-05-24", type: "all" },
  { id: 9, message: "User feedback received.", date: "2024-05-23", type: "user" },
  { id: 10, message: "Partner commission updated.", date: "2024-05-22", type: "partner" },
  { id: 11, message: "User profile updated.", date: "2024-05-21", type: "user" },
  { id: 12, message: "Gold price increased.", date: "2024-05-20", type: "all" },
  // ...more
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Partners", value: "partner" },
  { label: "Users", value: "user" },
];

const SORTS = [
  { label: "Date: Recent", value: "recent" },
  { label: "Date: Old", value: "old" },
];

const Notification = () => {
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  // Filter and sort notifications
  let filtered = allNotifications.filter(n =>
    filter === "all" ? true : n.type === filter
  );
  filtered = filtered.sort((a, b) => {
    if (sort === "recent") return b.date.localeCompare(a.date);
    if (sort === "old") return a.date.localeCompare(b.date);
    return 0;
  });

  // Pagination
  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="font-semibold text-gray-700">Filter:</span>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded transition text-xs font-semibold ${
                filter === f.value
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
              }`}
              onClick={() => {
                setFilter(f.value);
                setPage(1);
              }}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-4 font-semibold text-gray-700">Sort:</span>
          <select
            className="px-2 py-1 border rounded text-xs"
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        {/* Notification send form */}
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
        {/* Notification list */}
        <ul className="divide-y">
          {paged.map(n => (
            <li key={n.id} className="py-3 flex justify-between items-center">
              <span className="text-gray-700 flex items-center gap-2">
                {n.type === "partner" && (
                  <span className="material-icons text-yellow-600 text-base" title="Partner">groups</span>
                )}
                {n.type === "user" && (
                  <span className="material-icons text-blue-600 text-base" title="User">person</span>
                )}
                {n.type === "all" && (
                  <span className="material-icons text-green-600 text-base" title="All">notifications</span>
                )}
                {n.message}
              </span>
              <span className="text-xs text-gray-400">{n.date}</span>
            </li>
          ))}
          {paged.length === 0 && (
            <li className="py-6 text-center text-gray-400">No notifications found.</li>
          )}
        </ul>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="text-xs text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
