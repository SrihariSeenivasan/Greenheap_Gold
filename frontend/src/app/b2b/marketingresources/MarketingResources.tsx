import { FaDownload, FaFileAlt, FaFileImage, FaFilePdf } from "react-icons/fa";
import { B2B_PRIMARY } from "../theme";

const resources = [
	{
		title: "Co-branded Flyers",
		desc: "High-quality flyers for your business promotion.",
		file: "co_branded_flyer.pdf",
		type: "pdf",
		link: "#",
		preview: "/assets/marketing/flyer_preview.png",
	},
	{
		title: "SIP Brochures",
		desc: "Brochures to explain SIP benefits to your clients.",
		file: "sip_brochure.pdf",
		type: "pdf",
		link: "#",
		preview: "/assets/marketing/sip_brochure.png",
	},
	{
		title: "Branding Kit",
		desc: "Logos, color codes, and branding guidelines.",
		file: "branding_kit.zip",
		type: "zip",
		link: "#",
		preview: "/assets/marketing/branding_kit.png",
	},
	{
		title: "Social Post Templates",
		desc: "Ready-to-use social media post templates.",
		file: "social_templates.zip",
		type: "zip",
		link: "#",
		preview: "/assets/marketing/social_templates.png",
	},
];

function getIcon(type: string) {
	if (type === "pdf") return <FaFilePdf className="text-red-600 w-6 h-6" />;
	if (type === "zip") return <FaFileAlt className="text-yellow-600 w-6 h-6" />;
	return <FaFileImage className="text-blue-600 w-6 h-6" />;
}

export default function MarketingResources() {
	return (
		<div className="bg-white rounded-lg shadow p-6">
			<h3
				className="text-2xl font-bold mb-6 flex items-center gap-2"
				style={{ color: B2B_PRIMARY }}
			>
				<FaFileAlt className="text-[#7a1335] mb-1" /> Marketing Resources
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{resources.map((res, idx) => (
					<div
						key={idx}
						className="bg-[#fbeaf0] rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
					>
						<div className="w-20 h-20 mb-3 flex items-center justify-center rounded-lg bg-white shadow">
							{res.preview ? (
								<img
									src={res.preview}
									alt={res.title}
									className="w-16 h-16 object-contain rounded"
								/>
							) : (
								getIcon(res.type)
							)}
						</div>
						<div className="font-bold text-[#7a1335] text-lg mb-1 text-center">
							{res.title}
						</div>
						<div className="text-gray-600 text-sm mb-3 text-center">
							{res.desc}
						</div>
						<a
							href={res.link}
							download={res.file}
							className="flex items-center gap-2 px-4 py-2 rounded bg-[#7a1335] text-white font-semibold hover:bg-[#a31d4b] transition"
						>
							<FaDownload /> Download
						</a>
						<div className="mt-2 text-xs text-gray-500">{res.file}</div>
					</div>
				))}
			</div>
		</div>
	);
}
