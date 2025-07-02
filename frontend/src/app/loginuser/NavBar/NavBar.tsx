import React, { useState } from "react";
import CustomButton from "../../components/custom/CustomButton";
import CustomImage from "../../components/custom/Image";

export const MENU = [
	{ name: "Home", link: "/" },
	{ name: "About Us", link: "/laboutus" },
	{ name: "Buy Ornaments", link: "/lbuyornaments" },
	{ name: "Contact Us", link: "/lcontactus" },
];

const LNavBar = () => {
	const [selected, setSelected] = useState<string | null>(null);
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<>
			{/* Maroon top bar with contact and social icons */}
			<div
				style={{
					background: "#6a0822",
					width: "100%",
					minHeight: 44,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 2vw",
					borderBottom: "1.5px solid #fff",
					fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif", // updated font family
					fontSize: 18,
					fontWeight: 400,
					letterSpacing: 0.2,
					boxSizing: "border-box",
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 1100,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
					<span style={{ color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
						<img src="/home/call.png" alt="Phone" style={{ height: 26, width: 26, background: "transparent", padding: 3, marginRight: 7, display: "block" }} />
						<span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 0.2 }}>+91 81900 59995</span>
					</span>
					<span style={{
						color: "#fff",
						display: "flex",
						alignItems: "center",
						gap: 8,
						borderLeft: "2px solid #fff",
						paddingLeft: 16,
					}}>
						<img src="/home/Mail.png" alt="Mail" style={{ height: 26, width: 26, background: "transparent", padding: 3, marginRight: 7, display: "block" }} />
						<span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 0.2 }}>spprtgreenheapdigigold@gmail.com</span>
					</span>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: -36 }}>
					<a href="#" style={{ marginRight: 2 }}>
						<img src="/home/Facebook.png" alt="Facebook" style={{ height: 26, width: 26, background: "transparent", padding: 3, display: "block", transition: "transform 0.15s" }} />
					</a>
					<a href="#" style={{ marginRight: 2 }}>
						<img src="/home/insta.png" alt="Instagram" style={{ height: 26, width: 26, background: "transparent", padding: 3, display: "block", transition: "transform 0.15s" }} />
					</a>
					<a href="#" style={{ marginRight: 2 }}>
						<img src="/home/X.png" alt="Xing" style={{ height: 26, width: 26, background: "transparent", padding: 3, display: "block", transition: "transform 0.15s" }} />
					</a>
					<a href="#" style={{ marginRight: 2 }}>
						<img src="/home/Youtube.png" alt="YouTube" style={{ height: 26, width: 26, background: "transparent", padding: 3, display: "block", transition: "transform 0.15s" }} />
					</a>
					<a href="#">
						<img src="/home/Linkedin.png" alt="LinkedIn" style={{ height: 26, width: 26, background: "transparent", padding: 3, display: "block", transition: "transform 0.15s" }} />
					</a>
				</div>
			</div>
			{/* Main nav */}
			<nav
				style={{
					background: "#fff",
					width: "100%",
					boxShadow: "0 2px 8px #f0e3d1",
					position: "fixed",
					top: 44, // below the fixed top bar
					left: 0,
					right: 0,
					zIndex: 1000,
					overflow: "hidden",
					minHeight: 0,
					transition: "box-shadow 0.18s",
				}}
			>
				<div
					style={{
						maxWidth: 1200,
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "0.2rem 2vw",
						width: "100%",
						boxSizing: "border-box",
						flexWrap: "wrap",
						gap: 10,
						fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif", // updated font family
					}}
				>
					{/* Logo */}
					<a href="/" style={{ display: "flex", alignItems: "center", minWidth: 70 }}>
						<CustomImage
							src={"/logo.png"}
							wrapperClss="h-auto w-[80px] min-w-[70px]"
							height="auto"
							width="80px"
						/>
					</a>
					{/* Menu */}
					<ul
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							margin: 0,
							padding: 0,
							listStyle: "none",
							fontSize: 15,
							fontWeight: 500,
							fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif", // updated font family
							flexWrap: "wrap"
						}}
					>
						{MENU.map((menuItem) => (
							<li key={menuItem.name}>
								<a
									href={menuItem.link}
									onClick={() => setSelected(menuItem.name)}
									onMouseEnter={() => setHovered(menuItem.name)}
									onMouseLeave={() => setHovered(null)}
									style={{
										color:
											selected === menuItem.name
												? "#8a2342"
												: hovered === menuItem.name
													? "#fff"
													: "#222",
										background:
											selected === menuItem.name
												? "#f9e9c7"
												: hovered === menuItem.name
													? "#7a1335"
													: "transparent",
										fontWeight: selected === menuItem.name ? 700 : 500,
										textDecoration: "none",
										padding: "4px 14px",
										transition: "color 0.18s, background 0.18s",
										borderRadius: 7,
										whiteSpace: "nowrap",
										cursor: "pointer",
										boxShadow: hovered === menuItem.name ? "0 2px 8px #f0e3d1" : "none",
										outline: hovered === menuItem.name ? "1.5px solid #7a1335" : "none",
									}}
								>
									{/* Always show hovered text if hovered, else show normal */}
									{hovered === menuItem.name
										? `Go to ${menuItem.name}`
										: menuItem.name}
								</a>
							</li>
						))}
					</ul>
					{/* Right actions */}
					<div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
						<a
							href="/PartnerPopup"
							style={{
								background: hovered === "Become a partner / Login" ? "#8a2342" : "#7a1335",
								color: "#fff",
								borderRadius: 10,
								padding: "7px 14px",
								fontWeight: 500,
								fontSize: 13,
								display: "flex",
								alignItems: "center",
								gap: 7,
								textDecoration: "none",
								boxShadow: "none",
								transition: "background 0.18s, border 0.18s",
								whiteSpace: "nowrap",
								border: hovered === "Become a partner / Login" ? "1.5px solid #8a2342" : "1.5px solid transparent",
								cursor: "pointer"
							}}
							onMouseEnter={() => setHovered("Become a partner / Login")}
							onMouseLeave={() => setHovered(null)}
						>
							<i className="fa fa-handshake-o" style={{ fontSize: 14 }} />
							Become a partner / Login
						</a>
						{/* User Profile Dropdown */}
						<div style={{ position: "relative" }}>
							<button
								onClick={() => setHovered(hovered === "profile" ? null : "profile")}
								style={{
									background: "#fff",
									border: "1.5px solid #e0e0e0",
									borderRadius: "50%",
									width: 38,
									height: 38,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									marginLeft: 8,
									boxShadow: hovered === "profile" ? "0 2px 8px #f0e3d1" : "none",
									transition: "box-shadow 0.18s, border 0.18s",
									position: "relative",
									padding: 0,
								}}
								aria-label="User Profile"
							>
								<img
									src="/home/user_profile.png"
									alt="Profile"
									style={{
										width: 28,
										height: 28,
										borderRadius: "50%",
										objectFit: "cover",
										background: "#eee",
									}}
								/>
							</button>
							{hovered === "profile" && (
								<div
									style={{
										position: "absolute",
										top: 46,
										right: 0,
										background: "#fff",
										border: "1.5px solid #e0e0e0",
										borderRadius: 10,
										boxShadow: "0 4px 16px #f0e3d1",
										minWidth: 160,
										zIndex: 2000,
										padding: "8px 0",
										display: "flex",
										flexDirection: "column",
										alignItems: "stretch"
									}}
									onMouseLeave={() => setHovered(null)}
								>
									<a
										href="/user/dashboard"
										style={{
											padding: "10px 18px",
											color: "#7a1335",
											fontWeight: 600,
											fontSize: 15,
											textDecoration: "none",
											borderBottom: "1px solid #f0e3d1",
											transition: "background 0.15s",
											background: "transparent",
											cursor: "pointer"
										}}
										onClick={() => setHovered(null)}
									>
										My Dashboard
									</a>
									<a
										href="/logout"
										style={{
											padding: "10px 18px",
											color: "#991313",
											fontWeight: 600,
											fontSize: 15,
											textDecoration: "none",
											background: "transparent",
											cursor: "pointer"
										}}
										onClick={() => setHovered(null)}
									>
										Logout
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default LNavBar;
