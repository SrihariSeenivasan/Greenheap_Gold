const menuItems = [
  "My Dashboard",
  "My Profile (Agent)",
  "Commission",
  "Payout Request",
  "KYC",
  "Beneficiaries",
  "Chit Jewels Saving Plan",
  "Digital Gold SPI Plan",
  "Gold Plant Scheme",
  "Notification",
  "My Bank Accounts",
  "Logout",
];

export default function AdminSideNav() {
  return (
    <nav className="py-8 px-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 transition-all duration-200 ease-in-out hover:translate-x-1"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
