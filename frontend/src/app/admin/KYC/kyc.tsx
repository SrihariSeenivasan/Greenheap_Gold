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

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
			{/* Modal for viewing Aadhaar/PAN details */}
			{modal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
					<div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
							onClick={() => setModal(null)}
							aria-label="Close"
						>
							&times;
						</button>
						<h2 className="text-lg font-semibold mb-4">{modal.label}</h2>
						<div className="w-full h-96">
							<iframe
								src={modal.url}
								title={modal.label}
								className="w-full h-full rounded border"
							/>
						</div>
					</div>
				</div>
			)}
			<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">KYC Requests</h1>
				<table className="min-w-full bg-white rounded-lg overflow-hidden">
					<thead>
						<tr>
							<th className="px-4 py-2 text-yellow-700">User</th>
							<th className="px-4 py-2 text-yellow-700">Aadhaar</th>
							<th className="px-4 py-2 text-yellow-700">PAN Card</th>
							<th className="px-4 py-2 text-yellow-700">Status</th>
							<th className="px-4 py-2 text-yellow-700">Submitted</th>
							<th className="px-4 py-2 text-yellow-700">Actions</th>
						</tr>
					</thead>
					<tbody>
						{kycRequests.map((req) => (
							<tr key={req.id} className="border-b last:border-b-0">
								<td className="px-4 py-3 flex items-center gap-3">
									<img
										src={req.avatar}
										alt={req.user}
										className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
									/>
									<span>{req.user}</span>
								</td>
								<td className="px-4 py-3">
									<button
										className="text-blue-600 underline hover:text-blue-800"
										onClick={() => setModal({ url: req.aadharUrl, label: `${req.user} - Aadhaar` })}
									>
										View
									</button>
								</td>
								<td className="px-4 py-3">
									<button
										className="text-blue-600 underline hover:text-blue-800"
										onClick={() => setModal({ url: req.panUrl, label: `${req.user} - PAN Card` })}
									>
										View
									</button>
								</td>
								<td className="px-3 py-3">
									<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
										req.status === "Approved"
											? "bg-green-100 text-green-700"
											: req.status === "Pending"
											? "bg-yellow-100 text-yellow-700"
											: "bg-red-100 text-red-700"
									}`}>
										{req.status}
									</span>
								</td>
								<td className="px-4 py-3">{req.submitted}</td>
								<td className="px-4 py-3 space-x-2">
									<button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">Approve</button>
									<button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Reject</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default KYC;
