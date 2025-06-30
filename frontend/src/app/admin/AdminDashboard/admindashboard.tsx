
const stats = [
  { label: "Total Users", value: 1240, color: "bg-yellow-100", icon: "👥" },
  { label: "Gold Sold (g)", value: 3200, color: "bg-yellow-200", icon: "🥇" },
  { label: "Commission Earned", value: "₹1,20,000", color: "bg-yellow-300", icon: "💰" },
  { label: "Partners", value: 42, color: "bg-yellow-100", icon: "🤝" },
];

const activities = [
  { time: "10:30 AM", desc: "User John Doe purchased 10g gold." },
  { time: "09:15 AM", desc: "Partner request approved for S. Kumar." },
  { time: "Yesterday", desc: "Commission payout processed." },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow p-6 flex flex-col items-center ${stat.color}`}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          {activities.map((activity, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-yellow-500 font-bold mr-3">{activity.time}</span>
              <span className="text-gray-700">{activity.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
