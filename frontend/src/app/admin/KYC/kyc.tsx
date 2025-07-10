import { useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaIdCard, FaRegEye, FaTimesCircle, FaUser, FaBuilding, FaHandshake, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const kycRequests = [
	// User requests
	{
		id: 1,
		user: "Amit Kumar",
		avatar: "/avatars/amit.png",
		status: "Pending",
		submitted: "2024-06-01",
		aadharUrl: "/uploads/amit_aadhar.pdf",
		panUrl: "/uploads/amit_pan.pdf",
		type: "User"
	},
	{
		id: 2,
		user: "Priya Sharma",
		avatar: "/avatars/priya.png",
		status: "Approved",
		submitted: "2024-05-28",
		aadharUrl: "/uploads/priya_aadhar.pdf",
		panUrl: "/uploads/priya_pan.pdf",
		type: "User"
	},
	{
		id: 3,
		user: "Rahul Gupta",
		avatar: "/avatars/rahul.png",
		status: "Rejected",
		submitted: "2024-06-02",
		aadharUrl: "/uploads/rahul_aadhar.pdf",
		panUrl: "/uploads/rahul_pan.pdf",
		type: "User"
	},
	// B2B requests
	{
		id: 4,
		user: "Tech Solutions Pvt Ltd",
		avatar: "/avatars/tech.png",
		status: "Pending",
		submitted: "2024-06-03",
		aadharUrl: "/uploads/tech_gst.pdf",
		panUrl: "/uploads/tech_pan.pdf",
		type: "B2B"
	},
	{
		id: 5,
		user: "Global Services Inc",
		avatar: "/avatars/global.png",
		status: "Approved",
		submitted: "2024-05-30",
		aadharUrl: "/uploads/global_gst.pdf",
		panUrl: "/uploads/global_pan.pdf",
		type: "B2B"
	},
	{
		id: 6,
		user: "Innovate Corp",
		avatar: "/avatars/innovate.png",
		status: "Pending",
		submitted: "2024-06-04",
		aadharUrl: "/uploads/innovate_gst.pdf",
		panUrl: "/uploads/innovate_pan.pdf",
		type: "B2B"
	},
	// Partner requests
	{
		id: 7,
		user: "Strategic Partners LLC",
		avatar: "/avatars/strategic.png",
		status: "Approved",
		submitted: "2024-05-25",
		aadharUrl: "/uploads/strategic_agreement.pdf",
		panUrl: "/uploads/strategic_pan.pdf",
		type: "Partner"
	},
	{
		id: 8,
		user: "Alliance Group",
		avatar: "/avatars/alliance.png",
		status: "Pending",
		submitted: "2024-06-05",
		aadharUrl: "/uploads/alliance_agreement.pdf",
		panUrl: "/uploads/alliance_pan.pdf",
		type: "Partner"
	}
];

type ModalState = { url: string; label: string } | null;

const KYC = () => {
	const [modal, setModal] = useState<ModalState>(null);
	const [requests, setRequests] = useState(kycRequests);
	const [activeTab, setActiveTab] = useState<"User" | "B2B" | "Partner">("User");
	const [currentPage, setCurrentPage] = useState<Record<string, number>>({
		User: 1,
		B2B: 1,
		Partner: 1
	});
	const itemsPerPage = 3;

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

	const getStatusColor = (status: string) => {
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

	const getTabIcon = (type: string) => {
		switch (type) {
			case "User":
				return <FaUser className="text-sm" />;
			case "B2B":
				return <FaBuilding className="text-sm" />;
			case "Partner":
				return <FaHandshake className="text-sm" />;
			default:
				return null;
		}
	};

	const getFilteredRequests = (type: string) => {
		return requests.filter(req => req.type === type);
	};

	const getPaginatedRequests = (type: string) => {
		const filtered = getFilteredRequests(type);
		const startIndex = (currentPage[type] - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filtered.slice(startIndex, endIndex);
	};

	const getTotalPages = (type: string) => {
		const filtered = getFilteredRequests(type);
		return Math.ceil(filtered.length / itemsPerPage);
	};

	const handlePageChange = (type: string, page: number) => {
		setCurrentPage(prev => ({
			...prev,
			[type]: page
		}));
	};

	const getDocumentLabel = (type: string) => {
		switch (type) {
			case "User":
				return { first: "Aadhaar", second: "PAN" };
			case "B2B":
				return { first: "GST", second: "PAN" };
			case "Partner":
				return { first: "Agreement", second: "PAN" };
			default:
				return { first: "Document 1", second: "Document 2" };
		}
	};

	const renderPagination = (type: string) => {
		const totalPages = getTotalPages(type);
		const current = currentPage[type];
		
		if (totalPages <= 1) return null;

		return (
			<div className="flex items-center justify-between mt-4 px-4">
				<div className="text-xs sm:text-sm text-gray-500">
					Showing {((current - 1) * itemsPerPage) + 1} to {Math.min(current * itemsPerPage, getFilteredRequests(type).length)} of {getFilteredRequests(type).length} results
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => handlePageChange(type, current - 1)}
						disabled={current === 1}
						className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
					>
						<FaChevronLeft className="text-xs" />
					</button>
					<div className="flex gap-1">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(type, page)}
								className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
									current === page
										? "bg-[#7a1335] text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{page}
							</button>
						))}
					</div>
					<button
						onClick={() => handlePageChange(type, current + 1)}
						disabled={current === totalPages}
						className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
					>
						<FaChevronRight className="text-xs" />
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-1 sm:p-6">
			{/* Modal for viewing documents */}
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

			<div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-6 w-full max-w-full sm:max-w-6xl mx-auto">
				<div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2">
					<h1 className="text-lg sm:text-2xl font-bold text-[#7a1335] flex items-center gap-2">
						<FaIdCard className="text-xl sm:text-2xl text-[#7a1335]" />
						KYC Requests
					</h1>
					<span className="text-xs sm:text-sm text-gray-500">{requests.length} total requests</span>
				</div>

				{/* Tab Navigation */}
				<div className="flex border-b border-gray-200 mb-6">
					{["User", "B2B", "Partner"].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab as "User" | "B2B" | "Partner")}
							className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
								activeTab === tab
									? "border-[#7a1335] text-[#7a1335] bg-[#fbeaf0]"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							{getTabIcon(tab)}
							{tab}
							<span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
								{getFilteredRequests(tab).length}
							</span>
						</button>
					))}
				</div>

				{/* Table for Active Tab */}
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-[#fbeaf0] border-b border-gray-200">
								<th className="px-3 py-3 sm:px-6 sm:py-4 text-[#7a1335] font-semibold text-left text-sm">{activeTab}</th>
								<th className="px-3 py-3 sm:px-6 sm:py-4 text-[#7a1335] font-semibold text-center text-sm">{getDocumentLabel(activeTab).first}</th>
								<th className="px-3 py-3 sm:px-6 sm:py-4 text-[#7a1335] font-semibold text-center text-sm">{getDocumentLabel(activeTab).second}</th>
								<th className="px-3 py-3 sm:px-6 sm:py-4 text-[#7a1335] font-semibold text-center text-sm">Status</th>
								<th className="px-3 py-3 sm:px-6 sm:py-4 text-[#7a1335] font-semibold text-center text-sm">Submitted</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{getPaginatedRequests(activeTab).map((req) => (
								<tr
									key={req.id}
									className="hover:bg-[#fbeaf0] transition-colors"
								>
									<td className="px-3 py-4 sm:px-6 sm:py-4 flex items-center gap-3">
										<img
											src={req.avatar}
											alt={req.user}
											className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#7a1335] shadow-sm"
										/>
										<div>
											<div className="font-semibold text-[#7a1335] text-sm">{req.user}</div>
											<div className="text-xs text-gray-400">ID: {req.id}</div>
										</div>
									</td>
									<td className="px-3 py-4 sm:px-6 sm:py-4 text-center">
										<button
											className="flex items-center gap-1 mx-auto text-blue-600 hover:text-blue-800 font-medium underline transition-colors text-sm"
											onClick={() => setModal({ url: req.aadharUrl, label: `${req.user} - ${getDocumentLabel(activeTab).first}` })}
										>
											<FaRegEye className="text-xs sm:text-sm" />
											View
										</button>
									</td>
									<td className="px-3 py-4 sm:px-6 sm:py-4 text-center">
										<button
											className="flex items-center gap-1 mx-auto text-blue-600 hover:text-blue-800 font-medium underline transition-colors text-sm"
											onClick={() => setModal({ url: req.panUrl, label: `${req.user} - ${getDocumentLabel(activeTab).second}` })}
										>
											<FaRegEye className="text-xs sm:text-sm" />
											View
										</button>
									</td>
									<td className="px-3 py-4 sm:px-6 sm:py-4 text-center">
										<select
											value={req.status}
											onChange={(e) => handleStatusChange(req.id, e.target.value)}
											className={`appearance-none px-3 py-2 pr-8 rounded-full text-xs font-bold cursor-pointer transition-all border-2 border-transparent hover:border-[#7a1335] focus:border-[#7a1335] focus:outline-none ${getStatusColor(req.status)}`}
										>
											<option value="Pending">Pending</option>
											<option value="Approved">Approved</option>
											<option value="Rejected">Rejected</option>
										</select>
									</td>
									<td className="px-3 py-4 sm:px-6 sm:py-4 text-center text-gray-500 text-sm">{req.submitted}</td>
								</tr>
							))}
							{getPaginatedRequests(activeTab).length === 0 && (
								<tr>
									<td colSpan={5} className="text-center py-8 text-gray-400 text-sm">
										No {activeTab} KYC requests found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{renderPagination(activeTab)}
			</div>
		</div>
	);
};

export default KYC;