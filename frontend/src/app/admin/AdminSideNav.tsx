const menuItems = [
  { name: "My Dashboard", link: "/admin" },
  { name: "My Profile", link: "/adminprofile" },
  { name: "Manage Ornaments", link: "/manageornaments" },
  { name: "Commission", link: "/commission" },
  { name: "Payout Request", link: "/payoutrequest" },
  { name: "KYC", link: "/kyc" },
  { name: "Beneficiaries", link: "/beneficiaries" },
  { name: "Chit Jewels Saving Plan", link: "/savingplan" },
  { name: "Digital Gold SPI Plan", link: "/spiplan" },
  { name: "Gold Plant Scheme", link: "/plantscheme" },
  { name: "Notification", link: "/notification" },
  { name: "My Bank Accounts", link: "/mybankaccounts" },
  { name: "Logout", link: "/" },
];

export default function AdminSideNav() {
  return (
    <nav className="py-8 px-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.link}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 transition-all duration-200 ease-in-out hover:translate-x-1"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}