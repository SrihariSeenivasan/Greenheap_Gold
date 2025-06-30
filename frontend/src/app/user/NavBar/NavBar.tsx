import CustomButton from "../../components/custom/CustomButton";
import CustomImage from "../../components/custom/Image";

export const MENU = [
	{
		name: "Home",
		link: "/",
	},
	{
		name: "About Us",
		link: "/aboutus",
	},
	{
		name: "Buy Ornaments",
		link: "/buyornaments",
	},
	{
		name: "Contact Us",
		link: "/contactus",
	},
];

const NavBar = () => {
	return (
		<div>
			{/* Top nav */}
			<div className="bg-[#1a202c] py-2">
				<div className="container mx-auto">
					<div className="flex flex-wrap items-center justify-between">
						<div className="text-white hidden sm:flex items-center gap-6">
							<div className="flex items-center gap-2">
								<span className="material-icons text-lg">phone</span>
								<a
									className="text-white font-normal"
									href="tel:+918190059995"
									rel="noreferrer"
								>
									<span className="text-wrap leading-tight m-0 text-base">
										+91 81900 59995
									</span>
								</a>
							</div>
							<div className="flex items-center gap-2">
								<span className="material-icons text-lg">email</span>
								<a
									className="text-white font-normal"
									href="mailto:spprtgreenheapdigigold@gmail.com"
									rel="noreferrer"
								>
									<span className="text-wrap leading-tight m-0 text-base">
										spprtgreenheapdigigold@gmail.com
									</span>
								</a>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<a href="#" className="text-white hover:text-blue-500 transition">
								<span className="material-icons text-2xl">facebook</span>
							</a>
							<a href="#" className="text-white hover:text-pink-500 transition">
								<span className="material-icons text-2xl">instagram</span>
							</a>
							<a href="#" className="text-white hover:text-blue-400 transition">
								<span className="material-icons text-2xl">twitter</span>
							</a>
							<a href="#" className="text-white hover:text-red-600 transition">
								<span className="material-icons text-2xl">youtube</span>
							</a>
							<a href="#" className="text-white hover:text-blue-700 transition">
								<span className="material-icons text-2xl">linkedin</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Main nav */}
			<nav className="bg-white sticky top-0 shadow">
				<div className="container mx-auto flex items-center justify-between py-2">
					<a href="/" className="flex items-center">
						<CustomImage
							src={"/logo.png"}
							wrapperClss="h-auto w-[8vw] min-w-[100px]"
							height="auto"
							width="8vw"
						/>
					</a>
					{/* Hamburger for mobile */}
					<div className="sm:hidden">
						<button
							className="text-gray-700 focus:outline-none"
							type="button"
							aria-label="Toggle navigation"
							onClick={() => {
								const menu = document.getElementById("navBarMenu");
								if (menu) menu.classList.toggle("hidden");
							}}
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
					<div
						className="hidden sm:flex flex-1 items-center justify-between"
						id="navBarMenu"
					>
						<ul className="flex flex-col sm:flex-row mx-auto my-2 sm:my-0 gap-2 sm:gap-4">
							{MENU && MENU.length > 0 ? (
								MENU.map((menuItem, menuIdx) => (
									<li className="px-1" key={`menu-${menuIdx}`}>
										<a
											className="text-gray-800 hover:text-yellow-600 font-medium px-3 py-2 rounded transition"
											href={menuItem.link}
										>
											{menuItem.name}
										</a>
									</li>
								))
							) : (
								<li className="px-1">
									<span className="text-gray-500">No Menu</span>
								</li>
							)}
						</ul>
						<ul className="flex items-center gap-4">
							<li className="px-1 cursor-pointer">
								<CustomButton
									title={`Become Partner`}
									className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
								/>
							</li>
							<li className="px-1 cursor-pointer">
								<CustomButton
									title={`Login /  Sign Up`}
									className="px-2 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded transition flex items-center"
									icon={
										<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									}
								/>
							</li>
						</ul>
					</div>
				</div>
				{/* Mobile menu */}
				<div className="sm:hidden hidden" id="navBarMenu">
					<ul className="flex flex-col gap-2 p-4 bg-white shadow">
						{MENU && MENU.length > 0 ? (
							MENU.map((menuItem, menuIdx) => (
								<li className="px-1" key={`menu-mobile-${menuIdx}`}>
									<a
										className="text-gray-800 hover:text-yellow-600 font-medium px-3 py-2 rounded transition block"
										href={menuItem.link}
									>
										{menuItem.name}
									</a>
								</li>
							))
						) : (
							<li className="px-1">
								<span className="text-gray-500">No Menu</span>
							</li>
						)}
						<li className="px-1 cursor-pointer">
							<CustomButton
								title={`Become Partner`}
								className="w-full px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
							/>
						</li>
						<li className="px-1 cursor-pointer">
							<CustomButton
								title={`Login /  Sign Up`}
								className="w-full px-2 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded transition flex items-center"
								icon={
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								}
							/>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
