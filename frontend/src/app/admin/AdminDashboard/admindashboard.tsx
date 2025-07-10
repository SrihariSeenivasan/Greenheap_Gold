import { Activity, Award, ChevronLeft, ChevronRight, Clock, DollarSign, Download, Eye, Filter, Handshake, TrendingUp, User, UserCheck, Users, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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

	// Add dummy B2B vendors and invoice data
	const b2bVendors = [
		{ id: "VEND-001", name: "ABC Gold Traders" },
		{ id: "VEND-002", name: "Global Bullion Ltd" },
		{ id: "VEND-003", name: "Elite Metals" },
		{ id: "VEND-004", name: "Sunrise Jewels" },
		{ id: "VEND-005", name: "Royal Gold Exports" }
	];
	const b2bVendorCount = b2bVendors.length;

	const b2bInvoices = [
		{
			id: "B2B-INV-001",
			customerName: "ABC Gold Traders",
			customerType: "b2b",
			goldType: "Gold Bar",
			quantity: 10,
			weight: "1kg",
			price: 6500000,
			date: "2024-06-01",
			status: "completed",
			paymentMethod: "Bank Transfer",
			address: "123 Market St, Mumbai"
		},
		{
			id: "B2B-INV-002",
			customerName: "Global Bullion Ltd",
			customerType: "b2b",
			goldType: "Gold Bullion",
			quantity: 5,
			weight: "500g",
			price: 3250000,
			date: "2024-06-03",
			status: "pending",
			paymentMethod: "Wire Transfer",
			address: "456 Gold Ave, Delhi"
		}
	];

	const partnerInvoices = [
		{
			id: "PART-INV-001",
			customerName: "Sunrise Jewels",
			customerType: "partner",
			goldType: "Gold Coin",
			quantity: 50,
			weight: "500g",
			price: 3250000,
			date: "2024-06-02",
			status: "completed",
			paymentMethod: "UPI",
			address: "789 Partner Rd, Chennai"
		},
		{
			id: "PART-INV-001",
			customerName: "Sunrise Jewels",
			customerType: "partner",
			goldType: "Gold Coin",
			quantity: 50,
			weight: "500g",
			price: 3250000,
			date: "2024-06-02",
			status: "completed",
			paymentMethod: "UPI",
			address: "789 Partner Rd, Chennai"
		},
		{
			id: "PART-INV-001",
			customerName: "Sunrise Jewels",
			customerType: "partner",
			goldType: "Gold Coin",
			quantity: 50,
			weight: "500g",
			price: 3250000,
			date: "2024-06-02",
			status: "completed",
			paymentMethod: "UPI",
			address: "789 Partner Rd, Chennai"
		},
		{
			id: "PART-INV-001",
			customerName: "Sunrise Jewels",
			customerType: "partner",
			goldType: "Gold Coin",
			quantity: 50,
			weight: "500g",
			price: 3250000,
			date: "2024-06-02",
			status: "completed",
			paymentMethod: "UPI",
			address: "789 Partner Rd, Chennai"
		},
		{
			id: "PART-INV-001",
			customerName: "Sunrise Jewels",
			customerType: "partner",
			goldType: "Gold Coin",
			quantity: 50,
			weight: "500g",
			price: 3250000,
			date: "2024-06-02",
			status: "completed",
			paymentMethod: "UPI",
			address: "789 Partner Rd, Chennai"
		},
		{
			id: "PART-INV-002",
			customerName: "Royal Gold Exports",
			customerType: "partner",
			goldType: "Gold Sheet",
			quantity: 20,
			weight: "200g",
			price: 1300000,
			date: "2024-06-04",
			status: "processing",
			paymentMethod: "Bank Transfer",
			address: "101 Partner Lane, Kolkata"
		}
	];

	// Group B2B and Partner invoices by customer
	const groupByCustomer = (invoices: any[], type: 'b2b' | 'partner') => {
		const map: Record<string, { name: string; count: number; invoices: any[] }> = {};
		invoices.forEach(inv => {
			if (type === 'b2b' && inv.customerType !== 'b2b') return;
			if (type === 'partner' && inv.customerType !== 'partner') return;
			if (!map[inv.customerName]) {
				map[inv.customerName] = { name: inv.customerName, count: 0, invoices: [] };
			}
			map[inv.customerName].count += 1;
			map[inv.customerName].invoices.push(inv);
		});
		return Object.values(map);
	};

	const b2bUsers = groupByCustomer(b2bInvoices, 'b2b');
	const partnerUsers = groupByCustomer(partnerInvoices, 'partner');

	// Pagination for B2B and Partner user lists
	const [b2bUserPage, setB2bUserPage] = useState(1);
	const [partnerUserPage, setPartnerUserPage] = useState(1);
	const userPageSize = 5;

	const b2bUserTotalPages = Math.ceil(b2bUsers.length / userPageSize);
	const partnerUserTotalPages = Math.ceil(partnerUsers.length / userPageSize);

	const pagedB2bUsers = b2bUsers.slice((b2bUserPage - 1) * userPageSize, b2bUserPage * userPageSize);
	const pagedPartnerUsers = partnerUsers.slice((partnerUserPage - 1) * userPageSize, partnerUserPage * userPageSize);

	// Invoice popup state
	const [showInvoicePopup, setShowInvoicePopup] = useState(false);
	const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

	const handleViewInvoice = (invoice: any) => {
		setSelectedInvoice(invoice);
		setShowInvoicePopup(true);
	};

	const handleClosePopup = () => {
		setShowInvoicePopup(false);
		setSelectedInvoice(null);
	};

	const handleDownloadInvoice = () => {
		if (!selectedInvoice) return;
		const content = `
Order ID: ${selectedInvoice.id}
Customer: ${selectedInvoice.customerName}
Type: ${selectedInvoice.customerType}
Product: ${selectedInvoice.goldType}
Quantity: ${selectedInvoice.quantity}
Weight: ${selectedInvoice.weight}
Amount: ₹${selectedInvoice.price.toLocaleString()}
Date: ${selectedInvoice.date}
Status: ${selectedInvoice.status}
Payment Method: ${selectedInvoice.paymentMethod}
Address: ${selectedInvoice.address}
		`;
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${selectedInvoice.id}-invoice.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const [activityPageSize, setActivityPageSize] = useState(6);

	// Pagination for B2B and Partner Invoices
	const [b2bPage, setB2bPage] = useState(1);
	const [partnerPage, setPartnerPage] = useState(1);
	const invoicePageSize = 5;

	const b2bTotalPages = Math.ceil(b2bInvoices.length / invoicePageSize);
	const partnerTotalPages = Math.ceil(partnerInvoices.length / invoicePageSize);

	const pagedB2bInvoices = b2bInvoices.slice((b2bPage - 1) * invoicePageSize, b2bPage * invoicePageSize);
	const pagedPartnerInvoices = partnerInvoices.slice((partnerPage - 1) * invoicePageSize, partnerPage * invoicePageSize);

	// Dropdown state for showing invoices per user
	const [b2bDropdownUser, setB2bDropdownUser] = useState<string | null>(null);
	const [partnerDropdownUser, setPartnerDropdownUser] = useState<string | null>(null);

	// For closing dropdown on outside click
	const b2bDropdownRef = useRef<HTMLDivElement | null>(null);
	const partnerDropdownRef = useRef<HTMLDivElement | null>(null);

	// Close dropdowns on outside click
	React.useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				b2bDropdownRef.current &&
				!b2bDropdownRef.current.contains(e.target as Node)
			) {
				setB2bDropdownUser(null);
			}
			if (
				partnerDropdownRef.current &&
				!partnerDropdownRef.current.contains(e.target as Node)
			) {
				setPartnerDropdownUser(null);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	// Popup state for user invoice list (centered popup)
	const [showUserInvoicePopup, setShowUserInvoicePopup] = useState(false);
	const [userInvoiceList, setUserInvoiceList] = useState<{ name: string; invoices: any[] } | null>(null);

	// Show all invoices for a user in a popup
	const handleShowUserInvoices = (user: { name: string; invoices: any[] }) => {
		setUserInvoiceList(user);
		setShowUserInvoicePopup(true);
		setB2bDropdownUser(null);
		setPartnerDropdownUser(null);
	};

	const handleCloseUserInvoicePopup = () => {
		setShowUserInvoicePopup(false);
		setUserInvoiceList(null);
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
				<div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
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
					{/* B2B Vendors Card */}
					<div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-4">
								<div className="p-3 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 shadow-lg">
									<Handshake className="w-6 h-6 text-white" />
								</div>
								<div className="flex items-center space-x-1 text-pink-600 text-sm font-medium">
									<TrendingUp className="w-3 h-3" />
									<span>+5%</span>
								</div>
							</div>
							<div className="space-y-1">
								<h3 className="text-2xl lg:text-3xl font-bold text-gray-800">{b2bVendorCount}</h3>
								<p className="text-gray-600 text-sm font-medium">B2B Vendors</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* --- B2B & Partner Invoice Section --- */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">B2B & Partner Invoices</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* B2B Users Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-lg font-bold text-blue-800 mb-4">B2B Users</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="bg-blue-50">
										<th className="px-3 py-2 text-left font-semibold">Customer</th>
										<th className="px-3 py-2 text-left font-semibold">Total Sells</th>
										<th className="px-3 py-2 text-left font-semibold">Actions</th>
									</tr>
								</thead>
								<tbody>
									{pagedB2bUsers.map(user => (
										<tr key={user.name} className="border-b last:border-b-0 hover:bg-blue-50">
											<td className="px-3 py-2">{user.name}</td>
											<td className="px-3 py-2">{user.count}</td>
											<td className="px-3 py-2" style={{ position: "relative" }}>
												<button
													title="View Invoices"
													onClick={() => handleShowUserInvoices(user)}
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: "0 4px",
														display: "inline-flex",
														alignItems: "center"
													}}
												>
													<Eye size={18} color="#7a1335" />
												</button>
											</td>
										</tr>
									))}
									{pagedB2bUsers.length === 0 && (
										<tr>
											<td colSpan={3} className="text-center text-gray-400 py-4">No B2B users found.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{/* Pagination for B2B Users */}
						{b2bUserTotalPages > 1 && (
							<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginTop: 16 }}>
								<button
									onClick={() => setB2bUserPage(p => Math.max(1, p - 1))}
									disabled={b2bUserPage === 1}
									style={{
										padding: "4px 10px",
										borderRadius: 6,
										border: "1px solid #eee",
										background: "#f7f7fa",
										color: "#555",
										cursor: b2bUserPage === 1 ? "not-allowed" : "pointer",
										opacity: b2bUserPage === 1 ? 0.5 : 1
									}}
								>
									<ChevronLeft size={16} />
								</button>
								{Array.from({ length: b2bUserTotalPages }, (_, i) => i + 1).map(page => (
									<button
										key={page}
										onClick={() => setB2bUserPage(page)}
										style={{
											padding: "4px 12px",
											borderRadius: 6,
											border: "1px solid #eee",
											background: b2bUserPage === page ? "#7a1335" : "#fff",
											color: b2bUserPage === page ? "#fff" : "#7a1335",
											fontWeight: b2bUserPage === page ? 700 : 500,
											cursor: "pointer"
										}}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => setB2bUserPage(p => Math.min(b2bUserTotalPages, p + 1))}
									disabled={b2bUserPage === b2bUserTotalPages}
									style={{
										padding: "4px 10px",
										borderRadius: 6,
										border: "1px solid #eee",
										background: "#f7f7fa",
										color: "#555",
										cursor: b2bUserPage === b2bUserTotalPages ? "not-allowed" : "pointer",
										opacity: b2bUserPage === b2bUserTotalPages ? 0.5 : 1
									}}
								>
									<ChevronRight size={16} />
								</button>
							</div>
						)}
					</div>
					{/* Partner Users Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-lg font-bold text-purple-800 mb-4">Partner Users</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="bg-purple-50">
										<th className="px-3 py-2 text-left font-semibold">Customer</th>
										<th className="px-3 py-2 text-left font-semibold">Total Sells</th>
										<th className="px-3 py-2 text-left font-semibold">Actions</th>
									</tr>
								</thead>
								<tbody>
									{pagedPartnerUsers.map(user => (
										<tr key={user.name} className="border-b last:border-b-0 hover:bg-purple-50">
											<td className="px-3 py-2">{user.name}</td>
											<td className="px-3 py-2">{user.count}</td>
											<td className="px-3 py-2" style={{ position: "relative" }}>
												<button
													title="View Invoices"
													onClick={() => handleShowUserInvoices(user)}
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
														padding: "0 4px",
														display: "inline-flex",
														alignItems: "center"
													}}
												>
													<Eye size={18} color="#7a1335" />
												</button>
											</td>
										</tr>
									))}
									{pagedPartnerUsers.length === 0 && (
										<tr>
											<td colSpan={3} className="text-center text-gray-400 py-4">No partner users found.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{/* Pagination for Partner Users */}
						{partnerUserTotalPages > 1 && (
							<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginTop: 16 }}>
								<button
									onClick={() => setPartnerUserPage(p => Math.max(1, p - 1))}
									disabled={partnerUserPage === 1}
									style={{
										padding: "4px 10px",
										borderRadius: 6,
										border: "1px solid #eee",
										background: "#f7f7fa",
										color: "#555",
										cursor: partnerUserPage === 1 ? "not-allowed" : "pointer",
										opacity: partnerUserPage === 1 ? 0.5 : 1
									}}
								>
									<ChevronLeft size={16} />
								</button>
								{Array.from({ length: partnerUserTotalPages }, (_, i) => i + 1).map(page => (
									<button
										key={page}
										onClick={() => setPartnerUserPage(page)}
										style={{
											padding: "4px 12px",
											borderRadius: 6,
											border: "1px solid #eee",
											background: partnerUserPage === page ? "#7a1335" : "#fff",
											color: partnerUserPage === page ? "#fff" : "#7a1335",
											fontWeight: partnerUserPage === page ? 700 : 500,
											cursor: "pointer"
										}}
									>
										{page}
									</button>
								))}
								<button
									onClick={() => setPartnerUserPage(p => Math.min(partnerUserTotalPages, p + 1))}
									disabled={partnerUserPage === partnerUserTotalPages}
									style={{
										padding: "4px 10px",
										borderRadius: 6,
										border: "1px solid #eee",
										background: "#f7f7fa",
										color: "#555",
										cursor: partnerUserPage === partnerUserTotalPages ? "not-allowed" : "pointer",
										opacity: partnerUserPage === partnerUserTotalPages ? 0.5 : 1
									}}
								>
									<ChevronRight size={16} />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* User Invoice List Popup (centered) */}
			{showUserInvoicePopup && userInvoiceList && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(0,0,0,0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 2000
					}}
					onClick={handleCloseUserInvoicePopup}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: 16,
							padding: 32,
							width: "95%",
							maxWidth: 520,
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							position: "relative"
						}}
						onClick={e => e.stopPropagation()}
					>
						<button
							onClick={handleCloseUserInvoicePopup}
							style={{
								position: "absolute",
								top: 16,
								right: 16,
								background: "none",
								border: "none",
								cursor: "pointer"
							}}
							title="Close"
						>
							<X size={22} color="#888" />
						</button>
						<h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: "#7a1335" }}>
							{userInvoiceList.name} - Invoices
						</h2>
						<div style={{ marginBottom: 18, maxHeight: 320, overflowY: "auto" }}>
							{userInvoiceList.invoices.map((inv: any, idx: number) => (
								<div
									key={inv.id + idx}
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										padding: "10px 0",
										borderBottom: idx !== userInvoiceList.invoices.length - 1 ? "1px solid #f0f0f0" : "none"
									}}
								>
									<div>
										<div style={{ fontWeight: 600, fontSize: 15 }}>{inv.id}</div>
										<div style={{ fontSize: 12, color: "#888" }}>{inv.goldType} • {inv.date}</div>
									</div>
									<button
										onClick={() => {
											handleViewInvoice(inv);
											setShowUserInvoicePopup(false);
										}}
										style={{
											background: "#7a1335",
											color: "#fff",
											border: "none",
											borderRadius: 6,
											padding: "6px 16px",
											fontSize: 14,
											cursor: "pointer",
											fontWeight: 600
										}}
									>
										View
									</button>
								</div>
							))}
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<button
								onClick={handleCloseUserInvoicePopup}
								style={{
									background: "#eee",
									color: "#333",
									border: "none",
									borderRadius: 8,
									padding: "10px 24px",
									fontWeight: 600,
									cursor: "pointer"
								}}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Invoice Details Popup */}
			{showInvoicePopup && selectedInvoice && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(0,0,0,0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 3000
					}}
					onClick={handleClosePopup}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: 12,
							padding: 32,
							width: "90%",
							maxWidth: 480,
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							position: "relative"
						}}
						onClick={e => e.stopPropagation()}
					>
						<button
							onClick={handleClosePopup}
							style={{
								position: "absolute",
								top: 16,
								right: 16,
								background: "none",
								border: "none",
								cursor: "pointer"
							}}
							title="Close"
						>
							<X size={22} color="#888" />
						</button>
						<h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: "#7a1335" }}>
							Invoice Details
						</h2>
						<div style={{ marginBottom: 18 }}>
							<div style={{ marginBottom: 8 }}>
								<strong>Order ID:</strong> {selectedInvoice.id}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Customer:</strong> {selectedInvoice.customerName}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Type:</strong> {selectedInvoice.customerType}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Product:</strong> {selectedInvoice.goldType}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Quantity:</strong> {selectedInvoice.quantity}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Weight:</strong> {selectedInvoice.weight}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Amount:</strong> ₹{selectedInvoice.price.toLocaleString()}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Date:</strong> {selectedInvoice.date}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Status:</strong> {selectedInvoice.status}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Payment Method:</strong> {selectedInvoice.paymentMethod}
							</div>
							<div style={{ marginBottom: 8 }}>
								<strong>Address:</strong> {selectedInvoice.address}
							</div>
						</div>
						<div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
							<button
								onClick={handleDownloadInvoice}
								style={{
									background: "#7a1335",
									color: "#fff",
									border: "none",
									borderRadius: 8,
									padding: "10px 20px",
									fontWeight: 600,
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer"
								}}
							>
								<Download size={18} />
								Download Invoice
							</button>
							<button
								onClick={handleClosePopup}
								style={{
									background: "#eee",
									color: "#333",
									border: "none",
									borderRadius: 8,
									padding: "10px 20px",
									fontWeight: 600,
									cursor: "pointer"
								}}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

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