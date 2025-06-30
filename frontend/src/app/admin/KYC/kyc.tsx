import { useState } from "react";

const kycRequests = [
	{
		id: 1,
		user: "Amit Kumar",
		avatar: "/avatars/amit.png",
		status: "Pending",
		submitted: "2024-06-01",
		aadharUrl: "/uploads/amit_aadhar.pdf",
		panUrl: "/uploads/amit_pan.pdf",
	},
	{
		id: 2,
		user: "Priya Sharma",
		avatar: "/avatars/priya.png",
		status: "Approved",
		submitted: "2024-05-28",
		aadharUrl: "/uploads/priya_aadhar.pdf",
		panUrl: "/uploads/priya_pan.pdf",
	},
];

const KYC = () => {
	// State to manage the modal visibility and content
	const [modal, setModal] = useState<{ url: string; label: string } | null>(null);
	const [requests, setRequests] = useState(kycRequests);

	const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
		setRequests((prev) =>
			prev.map((req) =>
				req.id === id ? { ...req, status } : req
			)
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-1 sm:p-6">
			{/* Modal for viewing Aadhaar/PAN details */}
			{modal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white rounded-xl shadow-xl w-[95vw] max-w-md sm:max-w-2xl p-3 sm:p-6 relative animate-fade-in">
						<button
							className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl transition"
							onClick={() => setModal(null)}
							aria-label="Close"
						>
							&times;
						</button>
						<h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-yellow-700 flex items-center gap-2">
							<span className="material-icons text-yellow-500 text-base sm:text-xl">visibility</span>
							{modal.label}
						</h2>
						<div className="w-full h-56 sm:h-[70vh] rounded-lg border bg-yellow-50 flex items-center justify-center">
							<iframe
								src={modal.url}
								title={modal.label}
								className="w-full h-full rounded"
							/>
						</div>
					</div>
				</div>
			)}
			<div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-10 w-full max-w-xs sm:max-w-5xl">
				<div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8 gap-2">
					<h1 className="text-l sm:text-xl font-bold text-yellow-700 flex items-center gap-2">
						<span className="material-icons text-xl l:text-l text-yellow-500">verified_user</span>
						KYC Requests
					</h1>
					<span className="text-xs sm:text-sm text-gray-500">{requests.length} requests</span>
				</div>
				<div className="overflow-x-auto rounded">
					<table className="min-w-full bg-white rounded overflow-hidden shadow text-xs sm:text-sm">
						<thead>
							<tr className="bg-yellow-50">
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold text-left">User</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold">Aadhaar</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold">PAN</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold">Status</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold">Submitted</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-yellow-700 font-semibold">Actions</th>
							</tr>
						</thead>
						<tbody>
							{requests.map((req) => (
								<tr
									key={req.id}
									className="border-b last:border-b-0 hover:bg-yellow-50 transition"
								>
									<td className="px-2 py-2 sm:px-4 sm:py-3 flex items-center gap-2">
										<img
											src={req.avatar}
											alt={req.user}
											className="w-7 h-7 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-yellow-400 shadow"
										/>
										<div>
											<div className="font-semibold text-gray-800">{req.user}</div>
											<div className="text-[10px] text-gray-400">ID: {req.id}</div>
										</div>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<button
											className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold underline transition"
											onClick={() => setModal({ url: req.aadharUrl, label: `${req.user} - Aadhaar` })}
										>
											<span className="material-icons text-xs sm:text-base">picture_as_pdf</span>
											View
										</button>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<button
											className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold underline transition"
											onClick={() => setModal({ url: req.panUrl, label: `${req.user} - PAN Card` })}
										>
											<span className="material-icons text-xs sm:text-base">picture_as_pdf</span>
											View
										</button>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1
											${req.status === "Approved"
												? "bg-green-100 text-green-700"
												: req.status === "Pending"
												? "bg-yellow-100 text-yellow-700"
												: "bg-red-100 text-red-700"
											}`}>
											<span className="material-icons text-xs sm:text-sm">
												{req.status === "Approved"
													? "check_circle"
													: req.status === "Pending"
													? "hourglass_empty"
													: "cancel"}
											</span>
											{req.status}
										</span>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-500">{req.submitted}</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3 space-x-1 flex items-center">
										<button
											className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold shadow transition
												${req.status === "Approved"
													? "bg-green-200 text-green-700 cursor-not-allowed"
													: "bg-green-500 hover:bg-green-600 text-white"
												}`}
											onClick={() => handleStatusChange(req.id, "Approved")}
											disabled={req.status === "Approved"}
										>
											<span className="material-icons text-xs sm:text-sm">check</span>
											Approve
										</button>
										<button
											className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-semibold shadow transition
												${req.status === "Rejected"
													? "bg-red-200 text-red-700 cursor-not-allowed"
													: "bg-red-500 hover:bg-red-600 text-white"
												}`}
											onClick={() => handleStatusChange(req.id, "Rejected")}
											disabled={req.status === "Rejected"}
										>
											<span className="material-icons text-xs sm:text-sm">close</span>
											Reject
										</button>
									</td>
								</tr>
							))}
							{requests.length === 0 && (
								<tr>
									<td colSpan={6} className="text-center py-8 text-gray-400 text-xs sm:text-sm">
										No KYC requests found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default KYC;
