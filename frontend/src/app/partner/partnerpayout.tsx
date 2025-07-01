import { useState } from "react";

// Dummy profile bank/UPI details for selection
const profileBankDetails = [
	{
		type: "Bank",
		label: "HDFC Bank - XXXX1234 (IFSC: HDFC0001234)",
		value: "bank1",
	},
	{
		type: "Bank",
		label: "SBI - XXXX5678 (IFSC: SBIN0005678)",
		value: "bank2",
	},
	{
		type: "UPI",
		label: "partner@upi",
		value: "upi1",
	},
];

const payoutHistory = [
	{ date: "2024-06-01", amount: "₹2,000", method: "UPI", status: "Paid" },
	{ date: "2024-05-20", amount: "₹1,500", method: "Bank", status: "Pending" },
];

const PartnerPayout = () => {
	const [amount, setAmount] = useState("");
	const [method, setMethod] = useState("UPI");
	const [selectedDetail, setSelectedDetail] = useState(
		profileBankDetails[0]?.value || ""
	);

	const handleRequest = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement payout request logic
		setAmount("");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 sm:p-6">
			<h1 className="text-2xl font-bold text-yellow-700 mb-6">Payouts</h1>
			<div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
				<div className="mb-4">
					<div className="text-lg font-semibold text-gray-700">
						Total Earnings:{" "}
						<span className="text-yellow-700">₹15,000</span>
					</div>
					<div className="text-sm text-gray-500">
						Withdrawal Balance:{" "}
						<span className="text-green-700">₹2,000</span>
					</div>
					<div className="text-xs text-gray-400">
						Minimum payout: ₹1,000
					</div>
				</div>
				<form
					onSubmit={handleRequest}
					className="flex flex-col sm:flex-row gap-2 items-end"
				>
					<input
						type="number"
						min={1000}
						placeholder="Amount (min ₹1,000)"
						className="px-3 py-2 border rounded w-full sm:w-40"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
					<select
						className="px-3 py-2 border rounded w-full sm:w-40"
						value={method}
						onChange={(e) => setMethod(e.target.value)}
					>
						<option value="UPI">UPI</option>
						<option value="Bank">Bank</option>
						<option value="Paytm">Paytm</option>
					</select>
					{/* New field: Choose Bank/UPI from profile */}
					<select
						className="px-3 py-2 border rounded w-full sm:w-56"
						value={selectedDetail}
						onChange={(e) => setSelectedDetail(e.target.value)}
						required
					>
						<option value="">Select Bank/UPI from Profile</option>
						{profileBankDetails
							.filter(
								(d) =>
									d.type === method ||
									(method === "Paytm" && d.type === "UPI")
							)
							.map((d) => (
								<option key={d.value} value={d.value}>
									{d.label}
								</option>
							))}
					</select>
					<button
						type="submit"
						className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded transition"
					>
						Request Payout
					</button>
				</form>
			</div>
			<div className="bg-white rounded-xl shadow p-4 sm:p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Payout History
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
						<thead>
							<tr>
								<th className="px-4 py-2 text-yellow-700">Date</th>
								<th className="px-4 py-2 text-yellow-700">Amount</th>
								<th className="px-4 py-2 text-yellow-700">Method</th>
								<th className="px-4 py-2 text-yellow-700">Status</th>
							</tr>
						</thead>
						<tbody>
							{payoutHistory.map((p, i) => (
								<tr key={i} className="border-b last:border-b-0">
									<td className="px-4 py-3">{p.date}</td>
									<td className="px-4 py-3">{p.amount}</td>
									<td className="px-4 py-3">{p.method}</td>
									<td className="px-4 py-3">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												p.status === "Paid"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{p.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PartnerPayout;
