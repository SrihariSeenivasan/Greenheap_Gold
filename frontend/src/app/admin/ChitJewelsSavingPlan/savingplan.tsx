import { useState } from "react";

const initialPlans = [
	{
		id: 1,
		name: "Chit Plan A",
		duration: "12 months",
		amount: "₹1,000/mo",
		status: "Active",
		description:
			"A 12-month chit plan with monthly contributions and attractive returns.",
	},
	{
		id: 2,
		name: "Chit Plan B",
		duration: "24 months",
		amount: "₹2,000/mo",
		status: "Closed",
		description:
			"A 24-month chit plan for long-term savers with higher rewards.",
	},
];

const emptyPlan = {
	id: 0,
	name: "",
	duration: "",
	amount: "",
	status: "Active",
	description: "",
};

const SavingPlan = () => {
	const [plans, setPlans] = useState(initialPlans);
	const [showAdd, setShowAdd] = useState(false);
	const [newPlan, setNewPlan] = useState(emptyPlan);
	const [showError, setShowError] = useState(false);
	const [editIdx, setEditIdx] = useState<number | null>(null);

	const handleAddChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setNewPlan((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddPlan = () => {
		if (
			!newPlan.name ||
			!newPlan.duration ||
			!newPlan.amount ||
			!newPlan.description
		) {
			setShowError(true);
			return;
		}
		if (editIdx !== null) {
			setPlans((prev) =>
				prev.map((plan, idx) =>
					idx === editIdx ? { ...newPlan, id: plan.id } : plan
				)
			);
			setEditIdx(null);
		} else {
			setPlans((prev) => [
				...prev,
				{ ...newPlan, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
			]);
		}
		setShowAdd(false);
		setNewPlan(emptyPlan);
	};

	const handleEdit = (idx: number) => {
		setEditIdx(idx);
		setNewPlan(plans[idx]);
		setShowAdd(true);
	};

	const handleStatusToggle = (id: number) => {
		setPlans((prev) =>
			prev.map((plan) =>
				plan.id === id
					? {
							...plan,
							status: plan.status === "Active" ? "Closed" : "Active",
					  }
					: plan
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center p-2 sm:p-6">
			<div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-full sm:max-w-4xl">
				<h1 className="text-xl sm:text-2xl font-bold text-[#7a1335] mb-4 sm:mb-6">
					Chit Jewels Saving Plans
				</h1>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-lg overflow-hidden">
						<thead>
							<tr>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Plan Name</th>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Duration</th>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Amount</th>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Description</th>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Status</th>
								<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Actions</th>
							</tr>
						</thead>
						<tbody>
							{plans.map((plan, idx) => (
								<tr key={plan.id} className="border-b last:border-b-0">
									<td className="px-4 py-3">{plan.name}</td>
									<td className="px-4 py-3">{plan.duration}</td>
									<td className="px-4 py-3">{plan.amount}</td>
									<td className="px-4 py-3 text-gray-600">
										{plan.description}
									</td>
									<td className="px-4 py-3">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												plan.status === "Active"
													? "bg-green-100 text-green-700"
													: "bg-gray-200 text-gray-700"
											}`}
										>
											{plan.status}
										</span>
									</td>
									<td className="px-4 py-3 space-x-2">
										<div className="flex flex-row gap-3 mt-6">
										<button
											className={`px-3 py-1 rounded text-xs font-semibold transition ${
												plan.status === "Active"
													? "bg-gray-300 hover:bg-gray-400 text-gray-800"
													: "bg-green-500 hover:bg-green-600 text-white"
											}`}
											onClick={() => handleStatusToggle(plan.id)}
										>
											{plan.status === "Active" ? "Close" : "Activate"}
										</button>
										<button
											className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
											onClick={() => handleEdit(idx)}
										>
											Edit
										</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<button
					className="mt-4 sm:mt-6 bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition w-full sm:w-auto"
					onClick={() => { setShowAdd(true); setEditIdx(null); }}
				>
					Add New Plan
				</button>
				{showAdd && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
						<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 min-w-[90vw] sm:min-w-[320px] max-w-[98vw] sm:max-w-[90vw]">
							<h2 className="text-lg font-bold mb-4 text-[#7a1335]">
								{editIdx !== null ? "Edit Plan" : "Add New Plan"}
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Left column: Plan Name, Duration */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Plan Name</label>
										<input
											type="text"
											name="name"
											value={newPlan.name}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="Plan Name"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Duration</label>
										<input
											type="text"
											name="duration"
											value={newPlan.duration}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="e.g. 12 months"
										/>
									</div>
								</div>
								{/* Right column: Amount, Description */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Amount</label>
										<input
											type="text"
											name="amount"
											value={newPlan.amount}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="e.g. ₹1,000/mo"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Description</label>
										<textarea
											name="description"
											value={newPlan.description}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="Description"
											rows={2}
										/>
									</div>
								</div>
							</div>
							<div className="flex gap-2 justify-end mt-4">
								<button
									className="px-4 py-1 rounded bg-[#7a1335] hover:bg-[#a31d4b] text-white"
									onClick={handleAddPlan}
								>
									{editIdx !== null ? "Save" : "Add"}
								</button>
								<button
									className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
									onClick={() => {
										setShowAdd(false);
										setNewPlan(emptyPlan);
										setEditIdx(null);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
				{/* Creative Centered Error Popup */}
				{showError && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
							
							<div className="mb-4 text-gray-700 text-center">
								Please fill all fields.
							</div>
							<button
								className="px-6 py-2 rounded bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold shadow transition"
								onClick={() => setShowError(false)}
							>
								OK
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SavingPlan;
