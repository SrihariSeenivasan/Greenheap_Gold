import { useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaIdCard, FaRegEye, FaTimesCircle } from "react-icons/fa";

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

// Add a type for modal state
type ModalState = { url: string; label: string } | null;

const KYC = () => {
	// State to manage the modal visibility and content
	const [modal, setModal] = useState<ModalState>(null);
	const [requests, setRequests] = useState(kycRequests);

	const handleStatusChange = (id: number, status: string) => {
		setRequests((prev) =>
			prev.map((req) =>
				req.id === id ? { ...req, status } : req
			)
		);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Approved":
				return <FaCheckCircle className="text-xs sm:text-sm" />;
			case "Pending":
				return <FaHourglassHalf className="text-xs sm:text-sm" />;
			case "Rejected":
				return <FaTimesCircle className="text-xs sm:text-sm" />;
			default:
				return null;
		}
	};

	const getStatusColor = (status:string) => {
		switch (status) {
			case "Approved":
				return "bg-green-100 text-green-700";
			case "Pending":
				return "bg-[#fbeaf0] text-[#7a1335]";
			case "Rejected":
				return "bg-red-100 text-red-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white flex items-center justify-center p-1 sm:p-6">
			{/* Modal for viewing Aadhaar/PAN details */}
			{modal && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 50,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "rgba(0,0,0,0.4)",
						padding: "8px"
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "1rem",
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							width: "98vw",
							maxWidth: "700px",
							padding: "24px",
							position: "relative",
							animation: "fade-in 0.2s"
						}}
					>
						<button
							style={{
								position: "absolute",
								top: 12,
								right: 16,
								color: "#9ca3af",
								fontSize: 28,
								background: "none",
								border: "none",
								cursor: "pointer",
								transition: "color 0.2s"
							}}
							onClick={() => setModal(null)}
							aria-label="Close"
							onMouseOver={e => (e.currentTarget.style.color = "#ef4444")}
							onMouseOut={e => (e.currentTarget.style.color = "#9ca3af")}
						>
							&times;
						</button>
						<h2
							style={{
								fontSize: "1.25rem",
								fontWeight: 700,
								marginBottom: 16,
								color: "#7a1335",
								display: "flex",
								alignItems: "center",
								gap: 8
							}}
						>
							<FaRegEye style={{ color: "#7a1335" }} />
							{modal.label}
						</h2>
						<div
							style={{
								width: "100%",
								height: "56vh",
								borderRadius: "0.75rem",
								border: "1px solid #fbeaf0",
								background: "#fbeaf0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<iframe
								src={modal.url}
								title={modal.label}
								style={{
									width: "100%",
									height: "100%",
									borderRadius: "0.75rem",
									border: "none"
								}}
							/>
						</div>
					</div>
				</div>
			)}
			<div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-10 w-full max-w-full sm:max-w-5xl">
				<div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8 gap-2">
					<h1 className="text-l sm:text-xl font-bold text-[#7a1335] flex items-center gap-2">
						<FaIdCard className="text-xl l:text-l text-[#7a1335]" />
						KYC Requests
					</h1>
					<span className="text-xs sm:text-sm text-gray-500">{requests.length} requests</span>
				</div>
				<div className="overflow-x-auto rounded">
					<table className="min-w-full bg-white rounded overflow-hidden shadow text-xs sm:text-sm">
						<thead>
							<tr className="bg-[#fbeaf0]">
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-[#7a1335] font-semibold text-left">User</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-[#7a1335] font-semibold">Aadhaar</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-[#7a1335] font-semibold">PAN</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-[#7a1335] font-semibold">Status</th>
								<th className="px-2 py-2 sm:px-4 sm:py-3 text-[#7a1335] font-semibold">Submitted</th>
							</tr>
						</thead>
						<tbody>
							{requests.map((req) => (
								<tr
									key={req.id}
									className="border-b last:border-b-0 hover:bg-[#fbeaf0] transition"
								>
									<td className="px-2 py-2 sm:px-4 sm:py-3 flex items-center gap-2">
										<img
											src={req.avatar}
											alt={req.user}
											className="w-7 h-7 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#7a1335] shadow"
										/>
										<div>
											<div className="font-semibold text-[#7a1335]">{req.user}</div>
											<div className="text-[10px] text-gray-400">ID: {req.id}</div>
										</div>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<button
											className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold underline transition"
											onClick={() => setModal({ url: req.aadharUrl, label: `${req.user} - Aadhaar` })}
										>
											<FaRegEye className="text-xs sm:text-base" />
											View
										</button>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<button
											className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold underline transition"
											onClick={() => setModal({ url: req.panUrl, label: `${req.user} - PAN Card` })}
										>
											<FaRegEye className="text-xs sm:text-base" />
											View
										</button>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3">
										<div className="relative">
											<select
												value={req.status}
												onChange={(e) => handleStatusChange(req.id, e.target.value)}
												className={`appearance-none px-3 py-2 pr-8 rounded-full text-[10px] sm:text-xs font-bold cursor-pointer transition-all
													${getStatusColor(req.status)}
													border-2 border-transparent hover:border-[#7a1335] focus:border-[#7a1335] focus:outline-none`}
											>
												<option value="Pending">Pending</option>
												<option value="Approved">Approved</option>
												<option value="Rejected">Rejected</option>
											</select>
											<div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
												
											</div>
											<div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
												
											</div>
										</div>
									</td>
									<td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-500">{req.submitted}</td>
								</tr>
							))}
							{requests.length === 0 && (
								<tr>
									<td colSpan={5} className="text-center py-8 text-gray-400 text-xs sm:text-sm">
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