"use client";
import { useState } from "react";

// Types
type Scheme = {
  id: number;
  name: string;
  duration: string;
  minInvest: string;
  status: string;
  description: string;
  points?: string[]; // 1 required, 2 optional
};

type FlyerImage = {
  id: number;
  url: string; // Only string, not null or undefined
  name: string;
  uploadDate: string;
};

// Initial Data
const initialSchemes: Scheme[] = [
  {
    id: 1,
    name: "Gold Plant 2024",
    duration: "18 months",
    minInvest: "₹5,000",
    status: "Active",
    description: "A special gold plant scheme for 2024 with attractive returns.",
    points: ["Secure your future with gold", "Hassle-free investment", "Attractive returns guaranteed"],
  },
];

const emptyScheme: Scheme = {
  id: 0,
  name: "",
  duration: "",
  minInvest: "",
  status: "Active",
  description: "",
  points: ["", "", ""]
};

const PlantScheme = () => {
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [newScheme, setNewScheme] = useState<Scheme>(emptyScheme);
  const [showError, setShowError] = useState<boolean>(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const [flyerImages, setFlyerImages] = useState<FlyerImage[]>([]);
  const [showFlyerUpload, setShowFlyerUpload] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(schemes.length / itemsPerPage);
  const paginatedSchemes = schemes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [flyerCurrentPage, setFlyerCurrentPage] = useState<number>(1);
  const flyerItemsPerPage = 6;
  const flyerTotalPages = Math.ceil(flyerImages.length / flyerItemsPerPage);
  const paginatedFlyerImages = flyerImages.slice(
    (flyerCurrentPage - 1) * flyerItemsPerPage,
    flyerCurrentPage * flyerItemsPerPage
  );

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("point")) {
      const idx = Number(name.replace("point", ""));
      setNewScheme((prev) => ({
        ...prev,
        points: prev.points ? prev.points.map((p, i) => (i === idx ? value : p)) : [value, "", ""],
      }));
    } else {
      setNewScheme((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFlyerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        // Only add if result is a string (DataURL)
        if (typeof result === "string") {
          const newImage: FlyerImage = {
            id: Date.now() + Math.random(),
            url: result,
            name: file.name,
            uploadDate: new Date().toLocaleDateString(),
          };
          setFlyerImages((prev) => [...prev, newImage]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFlyerImage = (id: number) => {
    setFlyerImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAddScheme = () => {
    if (!newScheme.name || !newScheme.duration || !newScheme.minInvest || !newScheme.description || !newScheme.points || !newScheme.points[0]) {
      setShowError(true);
      return;
    }
    if (editIdx !== null) {
      setSchemes((prev) =>
        prev.map((scheme, idx) =>
          idx === editIdx ? { ...newScheme, id: scheme.id } : scheme
        )
      );
      setEditIdx(null);
    } else {
      setSchemes((prev) => [
        ...prev,
        {
          ...newScheme,
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        },
      ]);
    }
    setShowAdd(false);
    setNewScheme(emptyScheme);
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setNewScheme(schemes[idx]);
    setShowAdd(true);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setSchemes((prev) =>
      prev.map((scheme) =>
        scheme.id === id ? { ...scheme, status: newStatus } : scheme
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-6">
			<div className="mx-auto space-y-6">
				{/* Schemes Flyer Section */}
				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl sm:text-2xl font-bold text-[#7a1335]">
							Schemes Flyer
						</h2>
						<button
							onClick={() => setShowFlyerUpload(true)}
							className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-4 rounded transition text-sm sm:text-base"
						>
							Upload Flyer
						</button>
					</div>

					{flyerImages.length > 0 ? (
						<>
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
								{paginatedFlyerImages.map((image) => (
									<div
										key={image.id}
										className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
									>
										<img
											src={image.url}
											alt={image.name}
											className="w-full h-full object-cover"
										/>
										<div
											style={{
												position: "absolute",
												top: 8,
												right: 8,
												display: "flex",
												flexDirection: "column",
												gap: 6,
												zIndex: 2,
											}}
										>
											<button
												onClick={() => handleRemoveFlyerImage(image.id)}
												style={{
													background: "#ef4444",
													color: "#fff",
													borderRadius: "50%",
													width: 28,
													height: 28,
													border: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 18,
													cursor: "pointer",
													marginBottom: 2,
													boxShadow: "0 1px 4px #0001"
												}}
												title="Delete"
											>
												×
											</button>
											<button
												onClick={() => {
													alert(`Edit not implemented. Image: ${image.name}`);
												}}
												style={{
													background: "#2563eb",
													color: "#fff",
													borderRadius: "50%",
													width: 28,
													height: 28,
													border: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 16,
													cursor: "pointer",
													boxShadow: "0 1px 4px #0001"
												}}
												title="Edit"
											>
												✎
											</button>
										</div>
										<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
											<p className="text-white text-xs truncate">{image.name}</p>
											<p className="text-white/80 text-xs">{image.uploadDate}</p>
										</div>
									</div>
								))}
							</div>
							{/* Flyer Pagination */}
							{flyerTotalPages > 1 && (
								<div className="flex justify-center items-center gap-2 mt-6">
									<button
										className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
										onClick={() => setFlyerCurrentPage((p) => Math.max(1, p - 1))}
										disabled={flyerCurrentPage === 1}
									>
										Prev
									</button>
									<span className="text-sm text-gray-700">
										Page {flyerCurrentPage} of {flyerTotalPages}
									</span>
									<button
										className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
										onClick={() =>
											setFlyerCurrentPage((p) => Math.min(flyerTotalPages, p + 1))
										}
										disabled={flyerCurrentPage === flyerTotalPages}
									>
										Next
									</button>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-12">
							<div className="text-6xl text-gray-300 mb-4">🖼️</div>
							<p className="text-gray-500 text-lg">No flyer images uploaded yet</p>
							<p className="text-gray-400 text-sm mt-2">
								Click "Upload Flyer" to add scheme promotional images
							</p>
						</div>
					)}
				</div>

				{/* Gold Plant Schemes Section */}
				<div className="bg-white rounded-xl shadow-lg p-4">
					<h1 className="text-xl sm:text-2xl font-bold text-[#7a1335] mb-4 sm:mb-6">
						Gold Plant Schemes
					</h1>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
							<thead>
								<tr>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Scheme Name</th>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Duration</th>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Min Investment</th>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Description</th>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Status</th>
									<th className="px-2 sm:px-4 py-2 text-[#7a1335]">Actions</th>
								</tr>
							</thead>
							<tbody>
								{paginatedSchemes.map((scheme, idx) => (
									<tr key={scheme.id} className="border-b last:border-b-0">
										<td className="px-4 py-3 align-middle">{scheme.name}</td>
										<td className="px-4 py-3 align-middle">{scheme.duration}</td>
										<td className="px-4 py-3 align-middle">{scheme.minInvest}</td>
										<td className="px-4 py-3 text-gray-600 align-middle">
											{scheme.description}
										</td>
										<td className="px-4 py-3 align-middle">
											<div className="relative w-full max-w-[160px]">
												<select
													value={scheme.status}
													onChange={(e) =>
														handleStatusChange(scheme.id, e.target.value)
													}
													className={`block w-full px-3 py-2 rounded-full text-xs sm:text-sm font-medium border-0 focus:ring-2 focus:ring-purple-500 transition ${getStatusColor(
														scheme.status
													)}`}
													style={{
														minWidth: 100,
														appearance: "none",
														backgroundPosition: "right 0.75rem center",
														backgroundRepeat: "no-repeat",
													}}
												>
													<option value="Active">Active</option>
													<option value="Closed">Closed</option>
												</select>
												<span
													style={{
														pointerEvents: "none",
														position: "absolute",
														right: 14,
														top: "50%",
														transform: "translateY(-50%)",
														fontSize: 12,
														color: "#888",
													}}
												>
													▼
												</span>
											</div>
										</td>
										<td className="px-4 py-3 align-middle">
											<button
												onClick={() => handleEdit(idx)}
												className="text-[#7a1335] hover:text-[#a31d4b] font-medium text-sm"
											>
												Edit
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Schemes Pagination */}
					<div className="flex justify-center items-center gap-2 mt-4">
						<button
							className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}
						>
							Prev
						</button>
						<span className="text-sm text-gray-700">
							Page {currentPage} of {totalPages}
						</span>
						<button
							className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
					<button
						className="mt-4 sm:mt-6 bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition w-full sm:w-auto"
						onClick={() => {
						 setShowAdd(true);
						 setEditIdx(null);
						}}
					>
						Add New Scheme
					</button>
				</div>
			</div>

			{/* Flyer Upload Modal */}
			{showFlyerUpload && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 50,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "rgba(0,0,0,0.4)",
						padding: 16
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "1rem",
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							width: "100%",
							maxWidth: 500,
							padding: 24,
							position: "relative",
							margin: "0 auto"
						}}
					>
						<h3 className="text-lg font-bold text-[#7a1335] mb-4 text-center">
							Upload Scheme Flyer
						</h3>
						{/* Flyer Images List with Edit/Delete and Pagination */}
						{flyerImages.length > 0 && (
							<>
								<div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 16 }}>
									<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
										{paginatedFlyerImages.map((image) => (
											<div
												key={image.id}
												className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
												style={{ minHeight: 90, minWidth: 90, position: "relative" }}
											>
												<img
													src={image.url}
													alt={image.name}
													className="w-full h-full object-cover"
												/>
												<div
													style={{
														position: "absolute",
														top: 8,
														right: 8,
														display: "flex",
														flexDirection: "column",
														gap: 6,
														zIndex: 2,
													}}
												>
													<button
														onClick={() => handleRemoveFlyerImage(image.id)}
														style={{
															background: "#ef4444",
															color: "#fff",
															borderRadius: "50%",
															width: 28,
															height: 28,
															border: "none",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															fontSize: 18,
															cursor: "pointer",
															marginBottom: 2,
															boxShadow: "0 1px 4px #0001"
														}}
														title="Delete"
													>
														×
													</button>
													<button
														onClick={() => {
															// For demo: just alert image name
															alert(`Edit not implemented. Image: ${image.name}`);
														}}
														style={{
															background: "#2563eb",
															color: "#fff",
															borderRadius: "50%",
															width: 28,
															height: 28,
															border: "none",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															fontSize: 16,
															cursor: "pointer",
															boxShadow: "0 1px 4px #0001"
														}}
														title="Edit"
													>
														✎
													</button>
												</div>
												<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
													<p className="text-white text-xs truncate">{image.name}</p>
													<p className="text-white/80 text-xs">{image.uploadDate}</p>
												</div>
											</div>
										))}
									</div>
								</div>
								{/* Flyer Pagination */}
								{flyerTotalPages > 1 && (
									<div className="flex justify-center items-center gap-2 mb-2">
										<button
											className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
											onClick={() => setFlyerCurrentPage((p) => Math.max(1, p - 1))}
											disabled={flyerCurrentPage === 1}
										>
											Prev
										</button>
										<span className="text-sm text-gray-700">
											Page {flyerCurrentPage} of {flyerTotalPages}
										</span>
										<button
											className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
											onClick={() =>
												setFlyerCurrentPage((p) => Math.min(flyerTotalPages, p + 1))
											}
											disabled={flyerCurrentPage === flyerTotalPages}
										>
											Next
										</button>
									</div>
								)}
							</>
						)}
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#7a1335] transition-colors" style={{ position: "relative" }}>
							<div className="text-4xl text-gray-400 mb-4">📁</div>
							<p className="text-gray-600 mb-2">
								Click to upload or drag and drop
							</p>
							<p className="text-gray-400 text-sm mb-4">
								PNG, JPG, GIF up to 10MB (Multiple files supported)
							</p>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleFlyerImageUpload}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								id="flyer-upload-input"
							/>
						</div>
						<div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
							<button
								onClick={() => setShowFlyerUpload(false)}
								style={{
									padding: "10px 24px",
									borderRadius: "8px",
									background: "#e5e7eb",
									color: "#374151",
									border: "none",
									cursor: "pointer"
								}}
							>
								Close
							</button>
							<button
								onClick={() => {
									// Trigger the file input click
									const input = document.getElementById("flyer-upload-input") as HTMLInputElement;
									if (input) input.click();
								}}
								style={{
									padding: "10px 24px",
									borderRadius: "8px",
									background: "#7a1335",
									color: "#fff",
									border: "none",
									cursor: "pointer"
								}}
							>
								Upload
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Add/Edit Scheme Modal */}
			{showAdd && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 50,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "rgba(0,0,0,0.4)",
						padding: 16
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "1rem",
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							width: "100%",
							maxWidth: 400,
							maxHeight: "90vh",
							overflowY: "auto",
							padding: 24,
							position: "relative",
							margin: "0 auto"
						}}
					>
						<h2 className="text-xl font-bold text-[#7a1335] mb-4 text-center">
							{editIdx !== null ? "Edit Scheme" : "Add New Scheme"}
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Scheme Name
								</label>
								<input
									type="text"
									name="name"
									value={newScheme.name}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
									placeholder="Scheme Name"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Duration
								</label>
								<input
									type="text"
									name="duration"
									value={newScheme.duration}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
									placeholder="e.g. 18 months"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Min Investment
								</label>
								<input
									type="text"
									name="minInvest"
									value={newScheme.minInvest}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
									placeholder="e.g. ₹5,000"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Description
								</label>
								<textarea
									name="description"
									value={newScheme.description}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
									placeholder="Description"
									rows={3}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">Key Points</label>
								<input
									type="text"
									name="point0"
									value={newScheme.points?.[0] || ""}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent mb-2"
									placeholder="Important Point (required)"
									required
								/>
								<input
									type="text"
									name="point1"
									value={newScheme.points?.[1] || ""}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent mb-2"
									placeholder="Optional Point 2"
								/>
								<input
									type="text"
									name="point2"
									value={newScheme.points?.[2] || ""}
									onChange={handleAddChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a1335] focus:border-transparent"
									placeholder="Optional Point 3"
								/>
							</div>
						</div>
						<div className="flex gap-3 justify-center mt-6">
							<button
								onClick={handleAddScheme}
								className="px-6 py-2 rounded bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold transition"
							>
								{editIdx !== null ? "Save" : "Add"}
							</button>
							<button
								onClick={() => {
									setShowAdd(false);
									setNewScheme(emptyScheme);
									setEditIdx(null);
								}}
								className="px-6 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Error Modal */}
			{showError && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 50,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "rgba(0,0,0,0.4)"
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "1.25rem",
							boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
							padding: 32,
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						}}
					>
						<span className="text-5xl text-[#7a1335] mb-2">⚠️</span>
						<h2 className="text-xl font-bold text-[#7a1335] mb-2 text-center">
							Missing Fields
						</h2>
						<div className="mb-4 text-gray-700 text-center">
							Please fill all required fields.
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
	);
};

export default PlantScheme;