import { useState } from "react";

const initialSchemes = [
	{
		id: 1,
		name: "Gold Plant 2024",
		duration: "18 months",
		minInvest: "₹5,000",
		status: "Active",
		description: "A special gold plant scheme for 2024 with attractive returns.",
	},
];

const emptyScheme = {
	id: 0,
	name: "",
	duration: "",
	minInvest: "",
	status: "Active",
	description: "",
};

const PlantScheme = () => {
	const [schemes, setSchemes] = useState(initialSchemes);
	const [showAdd, setShowAdd] = useState(false);
	const [newScheme, setNewScheme] = useState(emptyScheme);
	const [showError, setShowError] = useState(false);

	const handleAddChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewScheme((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddScheme = () => {
		if (
			!newScheme.name ||
			!newScheme.duration ||
			!newScheme.minInvest ||
			!newScheme.description
		) {
			setShowError(true);
			return;
		}
		setSchemes((prev) => [
			...prev,
			{ ...newScheme, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
		]);
		setShowAdd(false);
		setNewScheme(emptyScheme);
	};

	const handleStatusToggle = (id: number) => {
		setSchemes((prev) =>
			prev.map((scheme) =>
				scheme.id === id
					? {
							...scheme,
							status: scheme.status === "Active" ? "Closed" : "Active",
					  }
					: scheme
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">
					Gold Plant Schemes
				</h1>
				<table className="min-w-full bg-white rounded-lg overflow-hidden">
					<thead>
						<tr>
							<th className="px-4 py-2 text-yellow-700">Scheme Name</th>
							<th className="px-4 py-2 text-yellow-700">Duration</th>
							<th className="px-4 py-2 text-yellow-700">Min Investment</th>
							<th className="px-4 py-2 text-yellow-700">Description</th>
							<th className="px-4 py-2 text-yellow-700">Status</th>
							<th className="px-4 py-2 text-yellow-700">Actions</th>
						</tr>
					</thead>
					<tbody>
						{schemes.map((scheme) => (
							<tr key={scheme.id} className="border-b last:border-b-0">
								{/* Left: Scheme Name, Duration */}
								<td className="px-4 py-3">{scheme.name}</td>
								<td className="px-4 py-3">{scheme.duration}</td>
								{/* Right: Min Investment, Status */}
								<td className="px-4 py-3">{scheme.minInvest}</td>
								<td className="px-4 py-3 text-gray-600">
									{scheme.description}
								</td>
								<td className="px-4 py-3">
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold ${
											scheme.status === "Active"
												? "bg-green-100 text-green-700"
												: "bg-gray-200 text-gray-700"
										}`}
									>
										{scheme.status}
									</span>
								</td>
								<td className="px-4 py-3">
									<button
										className={`px-3 py-1 rounded text-xs font-semibold transition ${
											scheme.status === "Active"
												? "bg-gray-300 hover:bg-gray-400 text-gray-800"
												: "bg-green-500 hover:bg-green-600 text-white"
										}`}
										onClick={() => handleStatusToggle(scheme.id)}
									>
										{scheme.status === "Active" ? "Close" : "Activate"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition"
					onClick={() => setShowAdd(true)}
				>
					Add New Scheme
				</button>
				{showAdd && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-xl p-6 min-w-[320px] max-w-[90vw]">
							<h2 className="text-lg font-bold mb-4 text-yellow-700">
								Add New Scheme
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{/* Left: Scheme Name, Duration */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Scheme Name</label>
										<input
											type="text"
											name="name"
											value={newScheme.name}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="Scheme Name"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Duration</label>
										<input
											type="text"
											name="duration"
											value={newScheme.duration}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="e.g. 18 months"
										/>
									</div>
								</div>
								{/* Right: Min Investment, Description */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Min Investment</label>
										<input
											type="text"
											name="minInvest"
											value={newScheme.minInvest}
											onChange={handleAddChange}
											className="w-full px-3 py-2 border rounded"
											placeholder="e.g. ₹5,000"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Description</label>
										<textarea
											name="description"
											value={newScheme.description}
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
									className="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
									onClick={handleAddScheme}
								>
									Add
								</button>
								<button
									className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
									onClick={() => {
										setShowAdd(false);
										setNewScheme(emptyScheme);
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
							<span className="material-icons text-5xl text-yellow-500 mb-2 animate-bounce">
								warning_amber
							</span>
							<h2 className="text-xl font-bold text-yellow-700 mb-2 text-center">
								Missing Fields
							</h2>
							<div className="mb-4 text-gray-700 text-center">
								Please fill all fields.
							</div>
							<button
								className="px-6 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow transition"
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

export default PlantScheme;
