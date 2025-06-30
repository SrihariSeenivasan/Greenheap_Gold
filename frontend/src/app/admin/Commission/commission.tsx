import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

const initialCommissions = [
	{ id: 1, partner: "S. Kumar", amount: "₹5,000", date: "2024-06-01", status: "Paid" },
	{ id: 2, partner: "A. Singh", amount: "₹3,200", date: "2024-05-28", status: "Pending" },
	{ id: 3, partner: "M. Patel", amount: "₹4,500", date: "2024-05-25", status: "Paid" },
];

const Commission = () => {
	const [commissions, setCommissions] = useState(initialCommissions);
	const [viewData, setViewData] = useState<any | null>(null);
	const [editData, setEditData] = useState<any | null>(null);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	// Handlers
	const handleView = (data: any) => setViewData(data);
	const handleEdit = (data: any) => setEditData(data);
	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setEditData((prev: any) => ({ ...prev, [name]: value }));
	};
	const handleEditSave = () => {
		setCommissions((prev) =>
			prev.map((c) => (c.id === editData.id ? editData : c))
		);
		setEditData(null);
	};
	const handleDelete = (id: number) => setDeleteId(id);
	const confirmDelete = () => {
		setCommissions((prev) => prev.filter((c) => c.id !== deleteId));
		setDeleteId(null);
	};

	const handleDownloadReport = () => {
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text("Commission Summary", 14, 16);

		const tableColumn = ["Partner", "Amount", "Date", "Status"];
		const tableRows = commissions.map((c) => [
			c.partner,
			c.amount,
			c.date,
			c.status,
		]);

		// Use (doc as any).autoTable to avoid TypeScript error
		(doc as any).autoTable({
			head: [tableColumn],
			body: tableRows,
			startY: 22,
			styles: { fontSize: 12 },
			headStyles: { fillColor: [255, 215, 64] },
		});
		doc.save("commission-report.pdf");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
			<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Commission Summary</h1>
				<table className="min-w-full bg-white rounded-lg overflow-hidden">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left text-yellow-700">Partner</th>
							<th className="px-4 py-2 text-left text-yellow-700">Amount</th>
							<th className="px-4 py-2 text-left text-yellow-700">Date</th>
							<th className="px-4 py-2 text-left text-yellow-700">Status</th>
							<th className="px-4 py-2 text-left text-yellow-700">Actions</th>
						</tr>
					</thead>
					<tbody>
						{commissions.map((c) => (
							<tr key={c.id} className="border-b last:border-b-0">
								<td className="px-4 py-3">{c.partner}</td>
								<td className="px-4 py-3">{c.amount}</td>
								<td className="px-4 py-3">{c.date}</td>
								<td className="px-4 py-3">
									<span
										className={`px-3 py-1 rounded-full text-xs font-semibold ${
											c.status === "Paid"
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-700"
										}`}
									>
										{c.status}
									</span>
								</td>
								<td className="px-4 py-3 space-x-2">
									<button
										className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
										onClick={() => handleView(c)}
									>
										View
									</button>
									<button
										className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
										onClick={() => handleEdit(c)}
									>
										Edit
									</button>
									<button
										className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
										onClick={() => handleDelete(c.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button
					className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition"
					onClick={handleDownloadReport}
				>
					Download Report
				</button>

				{/* View Popup */}
				{viewData && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-xl p-6 min-w-[300px] max-w-[90vw] flex flex-col items-center justify-center">
							<h2 className="text-lg font-bold mb-4 text-center">Commission Details</h2>
							<div className="mb-2"><b>Partner:</b> {viewData.partner}</div>
							<div className="mb-2"><b>Amount:</b> {viewData.amount}</div>
							<div className="mb-2"><b>Date:</b> {viewData.date}</div>
							<div className="mb-2"><b>Status:</b> {viewData.status}</div>
							<div className="flex justify-center mt-4">
								<button
									className="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
									onClick={() => setViewData(null)}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Edit Popup */}
				{editData && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-xl p-6 min-w-[300px] max-w-[90vw] flex flex-col items-center justify-center">
							<h2 className="text-lg font-bold mb-4 text-center">Edit Commission</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
								{/* Left column: Partner, Amount */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Partner</label>
										<input
											type="text"
											name="partner"
											value={editData.partner}
											onChange={handleEditChange}
											className="w-full px-3 py-2 border rounded"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Amount</label>
										<input
											type="text"
											name="amount"
											value={editData.amount}
											onChange={handleEditChange}
											className="w-full px-3 py-2 border rounded"
										/>
									</div>
								</div>
								{/* Right column: Date, Status */}
								<div className="flex flex-col gap-2">
									<div>
										<label className="block text-sm mb-1">Date</label>
										<input
											type="date"
											name="date"
											value={editData.date}
											onChange={handleEditChange}
											className="w-full px-3 py-2 border rounded"
										/>
									</div>
									<div>
										<label className="block text-sm mb-1">Status</label>
										<select
											name="status"
											value={editData.status}
											onChange={handleEditChange}
											className="w-full px-3 py-2 border rounded"
										>
											<option value="Paid">Paid</option>
											<option value="Pending">Pending</option>
										</select>
									</div>
								</div>
							</div>
							<div className="flex gap-2 justify-center mt-4">
								<button
									className="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
									onClick={handleEditSave}
								>
									Save
								</button>
								<button
									className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
									onClick={() => setEditData(null)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Delete Popup */}
				{deleteId !== null && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
						<div className="bg-white rounded-lg shadow-xl p-6 min-w-[300px] max-w-[90vw] flex flex-col items-center justify-center">
							<h2 className="text-lg font-bold mb-4 text-center text-red-600">Delete Commission</h2>
							<div className="mb-4 text-center">Are you sure you want to delete this commission entry?</div>
							<div className="flex gap-2 justify-center">
								<button
									className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
									onClick={confirmDelete}
								>
									Delete
								</button>
								<button
									className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
									onClick={() => setDeleteId(null)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Commission;
		
