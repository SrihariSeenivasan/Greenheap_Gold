import { Activity, Award, ChevronLeft, ChevronRight, Clock, DollarSign, Filter, Handshake, TrendingUp, User, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
	{ label: "Total Users", value: "1,240", color: "from-blue-500 to-blue-600", icon: Users, trend: "+12%" },
	{ label: "Gold Sold", value: "3.2kg", color: "from-yellow-500 to-yellow-600", icon: Award, trend: "+8%" },
	{ label: "Commission Earned", value: "₹1,20,000", color: "from-green-500 to-green-600", icon: DollarSign, trend: "+15%" },
	{ label: "Partners", value: "42", color: "from-purple-500 to-purple-600", icon: Handshake, trend: "+3%" },
];

const activityData = [
	{ time: "10:30 AM", desc: "User John Doe purchased 10g gold.", type: "user", icon: User },
	{ time: "09:15 AM", desc: "Partner request approved for S. Kumar.", type: "partner", icon: UserCheck },
	{ time: "Yesterday", desc: "Commission payout processed.", type: "partner", icon: DollarSign },
	{ time: "Yesterday", desc: "User Priya Sharma updated profile.", type: "user", icon: User },
	{ time: "2 days ago", desc: "Gold price updated.", type: "all", icon: TrendingUp },
	{ time: "2 days ago", desc: "Partner payout released.", type: "partner", icon: DollarSign },
	{ time: "3 days ago", desc: "User feedback received.", type: "user", icon: User },
	{ time: "3 days ago", desc: "New offer for partners.", type: "partner", icon: UserCheck },
	{ time: "4 days ago", desc: "System maintenance scheduled.", type: "all", icon: Activity },
	{ time: "4 days ago", desc: "User KYC approved.", type: "user", icon: User },
	{ time: "5 days ago", desc: "Partner commission updated.", type: "partner", icon: UserCheck },
	{ time: "5 days ago", desc: "User profile updated.", type: "user", icon: User },
];

const FILTERS = [
	{ label: "All", value: "all", icon: Activity },
	{ label: "Users", value: "user", icon: User },
	{ label: "Partners", value: "partner", icon: UserCheck },
	{ label: "Recent", value: "time", icon: Clock },
];

const AdminDashboard = () => {
	const [activityPage, setActivityPage] = useState(1);
	const [activityFilter, setActivityFilter] = useState("all");
	const [goldPrice, setGoldPrice] = useState("6500");
	const [silverPrice, setSilverPrice] = useState("75");
	const [editPrice, setEditPrice] = useState<false | "gold" | "silver">(false);
	const [tempGold, setTempGold] = useState(goldPrice);
	const [tempSilver, setTempSilver] = useState(silverPrice);

	// Stock states
	const [totalStock, setTotalStock] = useState("5000");
	const [inStoreStock, setInStoreStock] = useState("3000");
	const [editStock, setEditStock] = useState<false | "total" | "instore">(false);
	const [tempTotalStock, setTempTotalStock] = useState(totalStock);
	const [tempInStoreStock, setTempInStoreStock] = useState(inStoreStock);

	// Individual item stocks
	const [goldStock, setGoldStock] = useState("2000");
	const [diamondStock, setDiamondStock] = useState("1000");
	const [silverStock, setSilverStock] = useState("2000");
	const [editItemStock, setEditItemStock] = useState<false | "gold" | "diamond" | "silver">(false);
	const [tempGoldStock, setTempGoldStock] = useState(goldStock);
	const [tempDiamondStock, setTempDiamondStock] = useState(diamondStock);
	const [tempSilverStock, setTempSilverStock] = useState(silverStock);

	// Add loading and error state for rates
	const [goldApiRate, setGoldApiRate] = useState<string | null>(null);
	const [silverApiRate, setSilverApiRate] = useState<string | null>(null);
	const [rateLoading, setRateLoading] = useState(false);
	const [rateError, setRateError] = useState<string | null>(null);

	const [stockUnit, setStockUnit] = useState<"kg" | "g">("kg");

	const pageSize = 6;

	// Filtering logic
	let filteredActivities = activityData;
	if (activityFilter === "user") {
		filteredActivities = activityData.filter(a => a.type === "user");
	} else if (activityFilter === "partner") {
		filteredActivities = activityData.filter(a => a.type === "partner");
	} else if (activityFilter === "time") {
		filteredActivities = [...activityData].sort((a, b) => a.time.localeCompare(b.time));
	}

	const totalPages = Math.ceil(filteredActivities.length / pageSize);
	const pagedActivities = filteredActivities.slice((activityPage - 1) * pageSize, activityPage * pageSize);

	const getActivityTypeColor = (type: string) => {
		switch (type) {
			case "user": return "bg-blue-50 border-blue-200 text-blue-700";
			case "partner": return "bg-purple-50 border-purple-200 text-purple-700";
			default: return "bg-gray-50 border-gray-200 text-gray-700";
		}
	};

	// Simulate a sale (decrement stock)
	const handleSell = (type: "total" | "instore" | "gold" | "diamond" | "silver", amount: number) => {
		if (type === "total") setTotalStock((prev) => `${Math.max(0, Number(prev) - amount)}`);
		if (type === "instore") setInStoreStock((prev) => `${Math.max(0, Number(prev) - amount)}`);
		if (type === "gold") setGoldStock((prev) => `${Math.max(0, Number(prev) - amount)}`);
		if (type === "diamond") setDiamondStock((prev) => `${Math.max(0, Number(prev) - amount)}`);
		if (type === "silver") setSilverStock((prev) => `${Math.max(0, Number(prev) - amount)}`);
	};

	// Fetch gold/silver rates from GoldAPI with API key
	useEffect(() => {
		setRateLoading(true);
		setRateError(null);

		const fetchRates = async () => {
			try {
				// Gold
				const goldRes = await fetch("https://www.goldapi.io/api/XAU/USD", {
					method: "GET",
					headers: {
						"x-access-token": "goldapi-64pu19mcvsg193-io",
						"Content-Type": "application/json"
					}
				});
				if (!goldRes.ok) throw new Error("Gold API error");
				const goldData = await goldRes.json();
				// goldData.price_gram_24k_usd is price per gram in USD
				const usdToInr = 83;
				if (goldData.price_gram_24k_usd) {
					const goldInrPerGram = (goldData.price_gram_24k_usd * usdToInr).toFixed(2);
					setGoldApiRate(goldInrPerGram);
				} else {
					setGoldApiRate(null);
				}

				// Silver
				const silverRes = await fetch("https://www.goldapi.io/api/XAG/USD", {
					method: "GET",
					headers: {
						"x-access-token": "goldapi-64pu19mcvsg193-io",
						"Content-Type": "application/json"
					}
				});
				if (!silverRes.ok) throw new Error("Silver API error");
				const silverData = await silverRes.json();
				// silverData.price_gram_usd is price per gram in USD
				if (silverData.price_gram_usd) {
					const silverInrPerGram = (silverData.price_gram_usd * usdToInr).toFixed(2);
					setSilverApiRate(silverInrPerGram);
				} else {
					setSilverApiRate(null);
				}

				setRateLoading(false);
			} catch (err) {
				setRateError("Failed to fetch rates");
				setGoldApiRate(null);
				setSilverApiRate(null);
				setRateLoading(false);
			}
		};

		fetchRates();
	}, []);

	// --- Helper for unit conversion ---
	const convertStockValue = (value: string, from: "kg" | "g", to: "kg" | "g") => {
		const num = Number(value.replace(/,/g, ""));
		if (isNaN(num)) return value;
		if (from === to) return value;
		if (from === "kg" && to === "g") return (num * 1000).toLocaleString();
		if (from === "g" && to === "kg") return (num / 1000).toLocaleString();
		return value;
	};

	// --- Handle unit change for all stock values ---
	const handleUnitChange = (unit: "kg" | "g") => {
		setTotalStock(prev => convertStockValue(prev, stockUnit, unit));
		setInStoreStock(prev => convertStockValue(prev, stockUnit, unit));
		setGoldStock(prev => convertStockValue(prev, stockUnit, unit));
		setDiamondStock(prev => convertStockValue(prev, stockUnit, unit));
		setSilverStock(prev => convertStockValue(prev, stockUnit, unit));
		setStockUnit(unit);
	};

	// --- Inventory Overview edit state ---
	const [editInventory, setEditInventory] = useState(false);
	const [editStockValues, setEditStockValues] = useState({
		total: totalStock,
		instore: inStoreStock,
		gold: goldStock,
		diamond: diamondStock,
		silver: silverStock,
	});

	// --- Save edited inventory values ---
	const saveInventory = () => {
		setTotalStock(editStockValues.total);
		setInStoreStock(editStockValues.instore);
		setGoldStock(editStockValues.gold);
		setDiamondStock(editStockValues.diamond);
		setSilverStock(editStockValues.silver);
		setEditInventory(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-8">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
						<p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
					</div>
					<div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border">
						<Activity className="w-4 h-4 text-green-500" />
						<span className="text-sm font-medium text-gray-700">Live</span>
					</div>
				</div>
			</div>

			{/* --- Live Market Prices --- */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Live Market Prices</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{/* Gold Price Card */}
					<div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 overflow-hidden flex flex-col justify-between">
						<div className="flex items-center justify-between mb-4">
							<div className="p-3 rounded-xl bg-[#7a1335] shadow-lg">
								<Award className="w-6 h-6 text-white" />
							</div>
							{!editPrice && (
								<button
									className="text-[#7a1335] hover:underline text-xs font-medium"
									onClick={() => {
										setTempGold(goldPrice);
										setEditPrice("gold");
									}}
								>
									Edit
								</button>
							)}
						</div>
						<div className="space-y-2">
							<h3 className="text-lg font-bold text-[#7a1335]">Gold Price</h3>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs text-gray-500">Today:</span>
								{rateLoading ? (
									<span className="text-xs text-gray-400">Loading...</span>
								) : rateError ? (
									<>
										<span className="text-xs text-red-500">Failed to fetch rates</span>
									</>
								) : goldApiRate ? (
									<span className="text-xs text-green-700 font-semibold">₹{goldApiRate} /g</span>
								) : (
									<span className="text-xs text-red-500">Failed to fetch rates</span>
								)}
							</div>
							{editPrice === "gold" ? (
								<form
									className="space-y-2"
									onSubmit={e => {
										e.preventDefault();
										setGoldPrice(tempGold);
										setEditPrice(false);
									}}
								>
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-700 w-24">Gold (₹/g):</label>
										<input
											type="number"
											value={tempGold}
											onChange={e => setTempGold(e.target.value)}
											className="border border-gray-300 rounded px-2 py-1 w-24 focus:ring-2 focus:ring-[#7a1335] outline-none"
										/>
									</div>
									<div className="flex gap-2 pt-2">
										<button
											type="submit"
											className="bg-[#7a1335] text-white px-3 py-1 rounded font-medium text-sm hover:bg-[#a31d4b] transition"
										>
											Save
										</button>
										<button
											type="button"
											className="bg-gray-200 text-gray-700 px-3 py-1 rounded font-medium text-sm"
											onClick={() => setEditPrice(false)}
										>
											Cancel
										</button>
									</div>
								</form>
							) : (
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-700 w-24">Gold (₹/g):</span>
										<span className="font-bold text-lg text-[#7a1335]">{goldPrice}</span>
									</div>
								</div>
							)}
						</div>
					</div>
					{/* Silver Price Card */}
					<div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 overflow-hidden flex flex-col justify-between">
						<div className="flex items-center justify-between mb-4">
							<div className="p-3 rounded-xl bg-[#7a1335] shadow-lg">
								<Award className="w-6 h-6 text-white" />
							</div>
							{!editPrice && (
								<button
									className="text-[#7a1335] hover:underline text-xs font-medium"
									onClick={() => {
										setTempSilver(silverPrice);
										setEditPrice("silver");
									}}
								>
									Edit
								</button>
							)}
						</div>
						<div className="space-y-2">
							<h3 className="text-lg font-bold text-[#7a1335]">Silver Price</h3>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs text-gray-500">Today:</span>
								{rateLoading ? (
									<span className="text-xs text-gray-400">Loading...</span>
								) : rateError ? (
									<>
										<span className="text-xs text-red-500">Failed to fetch rates</span>
									</>
								) : silverApiRate ? (
									<span className="text-xs text-green-700 font-semibold">₹{silverApiRate} /g</span>
								) : (
									<span className="text-xs text-red-500">Failed to fetch rates</span>
								)}
							</div>
							{editPrice === "silver" ? (
								<form
									className="space-y-2"
									onSubmit={e => {
										e.preventDefault();
										setSilverPrice(tempSilver);
										setEditPrice(false);
									}}
								>
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-700 w-24">Silver (₹/g):</label>
										<input
											type="number"
											value={tempSilver}
											onChange={e => setTempSilver(e.target.value)}
											className="border border-gray-300 rounded px-2 py-1 w-24 focus:ring-2 focus:ring-[#7a1335] outline-none"
										/>
									</div>
									<div className="flex gap-2 pt-2">
										<button
											type="submit"
											className="bg-[#7a1335] text-white px-3 py-1 rounded font-medium text-sm hover:bg-[#a31d4b] transition"
										>
											Save
										</button>
										<button
											type="button"
											className="bg-gray-200 text-gray-700 px-3 py-1 rounded font-medium text-sm"
											onClick={() => setEditPrice(false)}
										>
											Cancel
										</button>
									</div>
								</form>
							) : (
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-700 w-24">Silver (₹/g):</span>
										<span className="font-bold text-lg text-[#7a1335]">{silverPrice}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* --- Inventory Overview --- */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Overview</h2>
				<div className="flex items-center gap-2 mb-4">
					<span className="text-sm text-gray-600">Unit:</span>
					<select
						value={stockUnit}
						onChange={e => handleUnitChange(e.target.value as "kg" | "g")}
						className="border border-gray-300 rounded px-2 py-1 text-sm"
					>
						<option value="kg">kg</option>
						<option value="g">g</option>
					</select>
					{!editInventory ? (
						<button
							className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium"
							onClick={() => {
								setEditStockValues({
									total: totalStock,
									instore: inStoreStock,
									gold: goldStock,
									diamond: diamondStock,
									silver: silverStock,
								});
								setEditInventory(true);
							}}
						>
							Edit
						</button>
					) : (
						<>
							<button
								className="ml-2 px-3 py-1 bg-green-600 text-white rounded text-sm font-medium"
								onClick={saveInventory}
							>
								Save
							</button>
							<button
								className="ml-2 px-3 py-1 bg-gray-400 text-white rounded text-sm font-medium"
								onClick={() => setEditInventory(false)}
							>
								Cancel
							</button>
						</>
					)}
				</div>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{[
						{ key: "total", label: "Total Stock", color: "from-blue-500 to-blue-600" },
						{ key: "instore", label: "In Store Stock", color: "from-green-500 to-green-600" },
						{ key: "gold", label: "Gold Stock", color: "from-yellow-500 to-yellow-600" },
						{ key: "diamond", label: "Diamond Stock", color: "from-purple-500 to-purple-600" },
						{ key: "silver", label: "Silver Stock", color: "from-gray-500 to-gray-600" },
					].map((item) => (
						<div
							key={item.key}
							className="bg-white rounded-xl p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow"
						>
							<div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} shadow mb-3`}>
								{/* Icon can be added here if needed */}
							</div>
							<div className="space-y-1">
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
									{item.label}
								</p>
								{editInventory ? (
									<input
										type="text"
										value={editStockValues[item.key as keyof typeof editStockValues]}
										onChange={e =>
											setEditStockValues(vals => ({
												...vals,
												[item.key]: e.target.value
											}))
										}
										className="text-lg font-bold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
									/>
								) : (
									<div className="text-lg font-bold text-gray-900">
										{(() => {
											const val = {
												total: totalStock,
												instore: inStoreStock,
												gold: goldStock,
												diamond: diamondStock,
												silver: silverStock,
											}[item.key as keyof typeof editStockValues];
											return `${val} ${stockUnit}`;
										})()}
									</div>
								)}
								<div className="text-xs text-gray-400">
									{item.key === "total" && "All metals"}
									{item.key === "instore" && "Available"}
									{item.key === "gold" && "22K"}
									{item.key === "diamond" && "Certified"}
									{item.key === "silver" && "999 purity"}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* --- Account Summary --- */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Account Summary</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
					{stats.map((stat, idx) => (
						<div
							key={idx}
							className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 overflow-hidden"
						>
							<div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
										<stat.icon className="w-6 h-6 text-white" />
									</div>
									<div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
										<TrendingUp className="w-3 h-3" />
										<span>{stat.trend}</span>
									</div>
								</div>
								<div className="space-y-1">
									<h3 className="text-2xl lg:text-3xl font-bold text-gray-800">{stat.value}</h3>
									<p className="text-gray-600 text-sm font-medium">{stat.label}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Activity Section */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				{/* Activity Header */}
				<div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
					<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-indigo-100 rounded-lg">
								<Activity className="w-5 h-5 text-indigo-600" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
								<p className="text-sm text-gray-600">Track all platform activities in real-time</p>
							</div>
						</div>
						
						{/* Filter Buttons */}
						<div className="flex items-center space-x-2">
							<Filter className="w-4 h-4 text-gray-500" />
							<div className="flex rounded-lg bg-gray-100 p-1">
								{FILTERS.map(f => (
									<button
										key={f.value}
										className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
											activityFilter === f.value
												? "bg-white text-indigo-600 shadow-sm"
												: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
										}`}
										onClick={() => {
											setActivityFilter(f.value);
											setActivityPage(1);
										}}
									>
										<f.icon className="w-4 h-4" />
										<span className="hidden sm:inline">{f.label}</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Activity List */}
				<div className="p-6">
					<div className="space-y-4">
						{pagedActivities.map((activity, idx) => (
							<div
								key={idx}
								className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getActivityTypeColor(activity.type)}`}
							>
								<div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
									<activity.icon className="w-4 h-4" />
								</div>
								
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-800 mb-1">
										{activity.desc}
									</p>
									<div className="flex items-center space-x-2">
										<Clock className="w-3 h-3 text-gray-400" />
										<span className="text-xs text-gray-500 font-medium">{activity.time}</span>
										<span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
											activity.type === "user" ? "bg-blue-100 text-blue-700" :
											activity.type === "partner" ? "bg-purple-100 text-purple-700" :
											"bg-gray-100 text-gray-700"
										}`}>
											{activity.type}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
							<p className="text-sm text-gray-600">
								Showing {((activityPage - 1) * pageSize) + 1} to {Math.min(activityPage * pageSize, filteredActivities.length)} of {filteredActivities.length} activities
							</p>
							
							<div className="flex items-center space-x-2">
								<button
									className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={activityPage === 1}
									onClick={() => setActivityPage(activityPage - 1)}
								>
									<ChevronLeft className="w-4 h-4" />
									<span>Previous</span>
								</button>
								
								<div className="flex items-center space-x-1">
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
										<button
											key={page}
											className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
												page === activityPage
													? "bg-indigo-600 text-white"
													: "bg-gray-100 hover:bg-gray-200 text-gray-700"
											}`}
											onClick={() => setActivityPage(page)}
										>
											{page}
										</button>
									))}
								</div>
								
								<button
									className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={activityPage === totalPages}
									onClick={() => setActivityPage(activityPage + 1)}
								>
									<span>Next</span>
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;