import { useState } from "react";
import { FaBell, FaEnvelope, FaReply, FaUser, FaUsers } from "react-icons/fa";

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
  const [sendTo, setSendTo] = useState("all");
  const [notifications, setNotifications] = useState(allNotifications);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyMsg, setReplyMsg] = useState("");
  const [replies, setReplies] = useState<{ [id: number]: string[] }>({});
  const [replyEmail, setReplyEmail] = useState("");

  // Filter and sort notifications
  let filtered = notifications.filter(n =>
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

  // Helper for today's date in yyyy-mm-dd
  const today = new Date().toISOString().slice(0, 10);

  // Dummy email for demonstration (in real app, fetch user/partner email)
  const getEmailForNotification = (n: any) => {
    if (n.type === "user") return "user@email.com";
    if (n.type === "partner") return "partner@email.com";
    return "all@email.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[#7a1335] mb-6">Notifications</h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="font-semibold text-[#7a1335]">Filter:</span>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded transition text-xs font-semibold ${
                filter === f.value
                  ? "bg-[#7a1335] text-white"
                  : "bg-[#fbeaf0] text-[#7a1335] hover:bg-[#fbeaf0]"
              }`}
              onClick={() => {
                setFilter(f.value);
                setPage(1);
              }}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-4 font-semibold text-[#7a1335]">Sort:</span>
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
          className="flex flex-col sm:flex-row gap-2 mb-6"
          onSubmit={e => {
            e.preventDefault();
            if (!msg.trim()) return;
            setNotifications(prev => [
              {
                id: prev.length ? prev[0].id + 1 : 1,
                message: msg,
                date: today,
                type: sendTo,
              },
              ...prev,
            ]);
            setMsg("");
          }}
        >
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded bg-[#fbeaf0] text-[#7a1335]"
            placeholder="Type notification message..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
          <select
            className="px-2 py-2 border rounded text-xs"
            value={sendTo}
            onChange={e => setSendTo(e.target.value)}
          >
            <option value="all">All</option>
            <option value="partner">Partner</option>
            <option value="user">User</option>
          </select>
          <button
            type="submit"
            className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold px-6 rounded transition"
          >
            Send
          </button>
        </form>
        {/* Notification list */}
        <ul className="divide-y">
          {paged.map(n => (
            <li key={n.id} className="py-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[#7a1335] flex items-center gap-2">
                  {n.type === "partner" && (
                    <FaUsers className="text-[#7a1335] text-base" title="Partner" />
                  )}
                  {n.type === "user" && (
                    <FaUser className="text-blue-600 text-base" title="User" />
                  )}
                  {n.type === "all" && (
                    <FaBell className="text-green-600 text-base" title="All" />
                  )}
                  {n.message}
                </span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
              {/* Replies */}
              {replies[n.id] && replies[n.id].length > 0 && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {replies[n.id].map((reply, idx) => (
                    <div key={idx} className="bg-[#fbeaf0] border-l-4 border-[#7a1335] px-3 py-1 rounded text-sm text-[#7a1335]">
                      <span className="font-semibold text-[#7a1335] mr-2"><FaReply className="inline mr-1" />Reply:</span>
                      {reply}
                    </div>
                  ))}
                </div>
              )}
              {/* Reply button and input */}
              <div className="flex items-center gap-2 ml-6 mt-1">
                {replyingId === n.id ? (
                  <>
                    <input
                      type="text"
                      className="flex-1 px-2 py-1 border rounded text-xs"
                      placeholder="Type your reply..."
                      value={replyMsg}
                      onChange={e => setReplyMsg(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="bg-[#7a1335] hover:bg-[#a31d4b] text-white text-xs px-3 py-1 rounded transition"
                      onClick={() => {
                        if (replyMsg.trim()) {
                          setReplies(prev => ({
                            ...prev,
                            [n.id]: [...(prev[n.id] || []), replyMsg],
                          }));
                          setReplyMsg("");
                          setReplyingId(null);
                        }
                      }}
                    >
                      Send
                    </button>
                    <a
                      href={`mailto:${getEmailForNotification(n)}?subject=Reply to Notification&body=${encodeURIComponent(replyMsg)}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Reply via Email"
                      onClick={() => {
                        setReplyingId(null);
                        setReplyMsg("");
                      }}
                    >
                      <FaEnvelope /> Email
                    </a>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs px-2 py-1 rounded transition"
                      onClick={() => {
                        setReplyingId(null);
                        setReplyMsg("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center gap-1 text-[#7a1335] hover:text-[#a31d4b] text-xs font-semibold"
                    onClick={() => {
                      setReplyingId(n.id);
                      setReplyMsg("");
                    }}
                  >
                    <FaReply className="inline" /> Reply
                  </button>
                )}
              </div>
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
