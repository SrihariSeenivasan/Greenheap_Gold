import { Crown, LogOut, Settings, Shield, Sparkles, User } from "lucide-react";
import { useState } from "react";

export const MENU = [
	{ name: "Home", link: "/LUserHome" },
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
					fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif",
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
					top: 44,
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
						fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif",
					}}
				>
					{/* Logo */}
					<a href="/" style={{ display: "flex", alignItems: "center", minWidth: 70 }}>
						<img
							src="/logo.png"
							alt="Logo"
							style={{
								height: "auto",
								width: "80px",
								minWidth: "70px"
							}}
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
							fontFamily: "'Red Hat Display', 'DM Sans', Arial, sans-serif",
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
						
						{/* Enhanced User Profile Dropdown */}
						<div style={{ position: "relative", display: "flex", alignItems: "center" }}>
							<button
								onClick={() => setHovered(hovered === "profile" ? null : "profile")}
								style={{
									background: hovered === "profile" 
										? "linear-gradient(135deg, #6a0822 0%, #8a2342 100%)" 
										: "#fff",
									border: hovered === "profile" 
										? "3px solid transparent" 
										: "2px solid #e0e0e0",
									borderRadius: "50%",
									width: 45,
									height: 45,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									marginLeft: 10,
									boxShadow: hovered === "profile" 
										? "0 0 20px rgba(106, 8, 34, 0.4), 0 0 40px rgba(138, 35, 66, 0.2)" 
										: "0 2px 8px rgba(240, 227, 209, 0.3)",
									transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
									position: "relative",
									padding: 0,
									zIndex: 1201,
									transform: hovered === "profile" ? "scale(1.05)" : "scale(1)",
								}}
								aria-label="User Profile"
							>
								{hovered === "profile" && (
									<div style={{
										position: "absolute",
										top: "-3px",
										left: "-3px",
										right: "-3px",
										bottom: "-3px",
										borderRadius: "50%",
										background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)",
										backgroundSize: "300% 300%",
										animation: "royalBorder 3s ease infinite",
										zIndex: -1
									}} />
								)}
								<img
									src="/home/user_profile.png"
									alt="Profile"
									style={{
										width: 32,
										height: 32,
										borderRadius: "50%",
										objectFit: "cover",
										background: "#eee",
										border: hovered === "profile" ? "2px solid rgba(255,255,255,0.3)" : "none"
									}}
								/>
								{hovered === "profile" && (
									<div style={{
										position: "absolute",
										top: "-6px",
										right: "-6px",
										width: "18px",
										height: "18px",
										background: "linear-gradient(45deg, #FFD700, #FFA500)",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										animation: "crownPulse 1.5s ease-in-out infinite",
										border: "2px solid #fff"
									}}>
										<Crown size={10} color="#fff" />
									</div>
								)}
							</button>
							
							{hovered === "profile" && (
								<div
									style={{
										position: "fixed",
										top: 95,
										right: 20,
										background: "rgba(255, 255, 255, 0.98)",
										backdropFilter: "blur(20px)",
										border: "1px solid rgba(255, 255, 255, 0.3)",
										borderRadius: 20,
										boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
										minWidth: 280,
										zIndex: 20000,
										padding: "0",
										display: "flex",
										flexDirection: "column",
										alignItems: "stretch",
										animation: "luxuryFadeIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
										overflow: "hidden"
									}}
									onMouseLeave={() => setHovered(null)}
								>
									{/* Header Section */}
									<div style={{
										background: "linear-gradient(135deg, #6a0822 0%, #8a2342 100%)",
										padding: "20px",
										textAlign: "center",
										position: "relative",
										overflow: "hidden"
									}}>
										<div style={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
											opacity: 0.3
										}} />
										<div style={{
											width: 70,
											height: 70,
											borderRadius: "50%",
											background: "rgba(255, 255, 255, 0.2)",
											margin: "0 auto 12px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											border: "3px solid rgba(255, 255, 255, 0.3)",
											position: "relative"
										}}>
											<img
												src="/home/user_profile.png"
												alt="Profile"
												style={{
													width: 55,
													height: 55,
													borderRadius: "50%",
													objectFit: "cover"
												}}
											/>
											<div style={{
												position: "absolute",
												top: -4,
												right: -4,
												background: "linear-gradient(45deg, #FFD700, #FFA500)",
												borderRadius: "50%",
												width: 22,
												height: 22,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												animation: "floatCrown 2s ease-in-out infinite",
												border: "2px solid #fff"
											}}>
												<Crown size={12} color="#fff" />
											</div>
										</div>
										<h3 style={{
											color: "#fff",
											fontSize: "18px",
											fontWeight: "600",
											margin: "0 0 6px 0",
											textShadow: "0 2px 4px rgba(0,0,0,0.3)"
										}}>
											John Doe
										</h3>
										<p style={{
											color: "rgba(255, 255, 255, 0.9)",
											fontSize: "13px",
											margin: 0,
											opacity: 0.9
										}}>
											Premium Member
										</p>
									</div>

									{/* Menu Items */}
									<div style={{ padding: "6px 0" }}>
										<a
											href="/user"
											style={{
												padding: "14px 20px",
												color: "#2D3748",
												fontWeight: 500,
												fontSize: 15,
												textDecoration: "none",
												transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
												background: "transparent",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												position: "relative",
												overflow: "hidden"
											}}
											onMouseEnter={e => {
												e.currentTarget.style.background = "linear-gradient(135deg, #6a0822 0%, #8a2342 100%)";
												e.currentTarget.style.color = "#fff";
												e.currentTarget.style.transform = "translateX(6px)";
											}}
											onMouseLeave={e => {
												e.currentTarget.style.background = "transparent";
												e.currentTarget.style.color = "#2D3748";
												e.currentTarget.style.transform = "translateX(0)";
											}}
											onClick={() => setHovered(null)}
										>
											<div style={{
												width: 36,
												height: 36,
												borderRadius: "50%",
												background: "linear-gradient(135deg, #6a0822 0%, #8a2342 100%)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginRight: 14,
												boxShadow: "0 4px 12px rgba(106, 8, 34, 0.3)"
											}}>
												<User size={16} color="#fff" />
											</div>
											<span>My Dashboard</span>
											<Sparkles size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />
										</a>

										{/* <a
											href="/user/settings"
											style={{
												padding: "14px 20px",
												color: "#2D3748",
												fontWeight: 500,
												fontSize: 15,
												textDecoration: "none",
												transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
												background: "transparent",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												position: "relative",
												overflow: "hidden"
											}}
											onMouseEnter={e => {
												e.currentTarget.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
												e.currentTarget.style.color = "#fff";
												e.currentTarget.style.transform = "translateX(6px)";
											}}
											onMouseLeave={e => {
												e.currentTarget.style.background = "transparent";
												e.currentTarget.style.color = "#2D3748";
												e.currentTarget.style.transform = "translateX(0)";
											}}
											onClick={() => setHovered(null)}
										>
											<div style={{
												width: 36,
												height: 36,
												borderRadius: "50%",
												background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginRight: 14,
												boxShadow: "0 4px 12px rgba(79, 172, 254, 0.3)"
											}}>
												<Settings size={16} color="#fff" />
											</div>
											<span>Settings</span>
										</a>

										<a
											href="/user/premium"
											style={{
												padding: "14px 20px",
												color: "#2D3748",
												fontWeight: 500,
												fontSize: 15,
												textDecoration: "none",
												transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
												background: "transparent",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												position: "relative",
												overflow: "hidden"
											}}
											onMouseEnter={e => {
												e.currentTarget.style.background = "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)";
												e.currentTarget.style.color = "#8B4513";
												e.currentTarget.style.transform = "translateX(6px)";
											}}
											onMouseLeave={e => {
												e.currentTarget.style.background = "transparent";
												e.currentTarget.style.color = "#2D3748";
												e.currentTarget.style.transform = "translateX(0)";
											}}
											onClick={() => setHovered(null)}
										>
											<div style={{
												width: 36,
												height: 36,
												borderRadius: "50%",
												background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginRight: 14,
												boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)"
											}}>
												<Shield size={16} color="#fff" />
											</div>
											<span>Premium Features</span>
											<div style={{
												background: "linear-gradient(45deg, #FFD700, #FFA500)",
												color: "#fff",
												fontSize: "9px",
												padding: "2px 6px",
												borderRadius: "8px",
												marginLeft: "auto",
												fontWeight: "600",
												textTransform: "uppercase"
											}}>
												VIP
											</div>
										 </a>

										 <div style={{
											height: "1px",
											background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
											margin: "6px 20px"
										}} /> */}

										<a
											href="/"
											style={{
												padding: "14px 20px",
												color: "#E53E3E",
												fontWeight: 500,
												fontSize: 15,
												textDecoration: "none",
												background: "transparent",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
												position: "relative",
												overflow: "hidden"
											}}
											onMouseEnter={e => {
												e.currentTarget.style.background = "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)";
												e.currentTarget.style.color = "#fff";
												e.currentTarget.style.transform = "translateX(6px)";
											}}
											onMouseLeave={e => {
												e.currentTarget.style.background = "transparent";
												e.currentTarget.style.color = "#E53E3E";
												e.currentTarget.style.transform = "translateX(0)";
											}}
											onClick={() => setHovered(null)}
										>
											<div style={{
												width: 36,
												height: 36,
												borderRadius: "50%",
												background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginRight: 14,
												boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)"
											}}>
												<LogOut size={16} color="#fff" />
											</div>
											<span>Logout</span>
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>

			<style>
				{`
				@keyframes luxuryFadeIn {
					0% { 
						opacity: 0; 
						transform: translateY(-15px) scale(0.95);
						filter: blur(8px);
					}
					50% {
						opacity: 0.8;
						transform: translateY(-8px) scale(0.98);
						filter: blur(4px);
					}
					100% { 
						opacity: 1; 
						transform: translateY(0) scale(1);
						filter: blur(0px);
					}
				}
				
				@keyframes royalBorder {
					0%, 100% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
				}
				
				@keyframes crownPulse {
					0%, 100% { transform: scale(1) rotate(0deg); }
					50% { transform: scale(1.15) rotate(5deg); }
				}
				
				@keyframes floatCrown {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-2px) rotate(5deg); }
				}
				`}
			</style>
		</>
	);
};

export default LNavBar;