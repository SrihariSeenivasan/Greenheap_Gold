import React, { useState } from 'react';
import { 
  Home, 
  User, 
  CreditCard, 
  Users, 
  Gem, 
  Coins, 
  Sprout, 
  Bell, 
  Building2, 
  LogOut,
  ChevronRight,
  Store
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BankUPIManager from './DashboardComponents/MyBankAccounts';
import LNotification from './DashboardComponents/Notification';
import LGoldPlantScheme from './DashboardComponents/GoldPlantScheme';
import LKYC from './DashboardComponents/KYC';
import LMyProfile from './DashboardComponents/MyProfile';
import LMyDashboard from './DashboardComponents/MyDashboard';
import LChitJewelsSavingPlan from './DashboardComponents/ChitJewelsSavingPlan';
import LDigitalGoldSIPPlan from './DashboardComponents/DigitalGoldSIPPlan';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('My Dashboard');
 const navigate = useNavigate();
  const menuItems = [
    { id: 'My Dashboard', label: 'My Dashboard', icon: Home },
    { id: 'My Profile', label: 'My Profile', icon: User },
    { id: 'KYC', label: 'KYC', icon: CreditCard },
    { id: 'Beneficiaries', label: 'Beneficiaries', icon: Users },
    { id: 'Chit Jewels Saving Plan', label: 'Chit Jewels Saving Plan', icon: Gem },
    { id: 'Digital Gold SIP Plan', label: 'Digital Gold SIP Plan', icon: Coins },
    { id: 'Gold Plant Scheme', label: 'Gold Plant Scheme', icon: Sprout },
    { id: 'Notification', label: 'Notification', icon: Bell },
    { id: 'My Bank Accounts', label: 'My Bank Accounts', icon: Building2 },
    { id: 'Logout', label: 'Logout', icon: LogOut },
  ];

  const renderDashboard = () => (
    // <div className="space-y-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between">
    //     <h1 className="text-2xl font-bold text-gray-800"># SRIHI00685</h1>
    //     <div className="flex items-center space-x-4">
    //       <div className="text-right">
    //         <p className="text-sm text-gray-600">Welcome</p>
    //         <p className="text-lg font-semibold">Greenheap<span className="text-yellow-600">gold</span></p>
    //       </div>
    //       <div className="bg-black text-white px-4 py-2 rounded-lg">
    //         <button className="text-sm">Become a Agent</button>
    //       </div>
    //       <div className="bg-black p-3 rounded-lg">
    //         <Store className="w-8 h-8 text-white" />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Balance Card */}
    //   <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
    //     <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 text-black">
    //       <div className="flex items-center justify-between">
    //         <span className="text-lg font-semibold">Available balance</span>
    //         <span className="text-2xl font-bold">₹0</span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Investment Plans */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     {/* Chit Jewels Saving Plan */}
    //     <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
    //       <h3 className="text-lg font-semibold text-gray-800 mb-2">Chit Jewels Saving Plan</h3>
    //       <div className="text-3xl font-bold text-red-600 mb-4">0</div>
    //       <div className="flex items-center justify-between">
    //         <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium">
    //           View All
    //         </button>
    //         <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
    //           <span className="text-2xl">💰</span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Digital Gold SIP Plan */}
    //     <div className="bg-red-50 rounded-xl p-6 border border-red-100">
    //       <h3 className="text-lg font-semibold text-gray-800 mb-2">Digital Gold SIP Plan</h3>
    //       <div className="text-3xl font-bold text-red-600 mb-4">0</div>
    //       <div className="flex items-center justify-between">
    //         <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium">
    //           View All
    //         </button>
    //         <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
    //           <span className="text-2xl">💰</span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Gold Plant Scheme */}
    //     <div className="bg-green-50 rounded-xl p-6 border border-green-100">
    //       <h3 className="text-lg font-semibold text-gray-800 mb-2">Gold Plant Scheme</h3>
    //       <div className="text-3xl font-bold text-red-600 mb-4">0</div>
    //       <div className="flex items-center justify-between">
    //         <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium">
    //           View All
    //         </button>
    //         <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
    //           <span className="text-2xl">💰</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <LMyDashboard/>
  );

  const renderProfile = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
    //         <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your full name" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
    //         <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your email" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
    //         <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your phone number" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
    //         <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your address" />
    //       </div>
    //     </div>
    //     <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium">
    //       Update Profile
    //     </button>
    //   </div>
    // </div>
    <LMyProfile/>
  );

  const renderKYC = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
    //         <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter Aadhaar number" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
    //         <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter PAN number" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Upload Aadhaar Front</label>
    //         <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 mb-2">Upload PAN Card</label>
    //         <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" />
    //       </div>
    //     </div>
    //     <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium">
    //       Submit KYC
    //     </button>
    //   </div>
    // </div>
    <LKYC/>
  );

  const renderBeneficiaries = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Beneficiaries</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Manage Beneficiaries</h3>
          <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium">
            Add Beneficiary
          </button>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No beneficiaries added yet</p>
        </div>
      </div>
    </div>
  );

  const renderSavingPlan = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">Chit Jewels Saving Plan</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="text-center py-12 text-gray-500">
    //       <Gem className="w-12 h-12 mx-auto mb-4 text-gray-300" />
    //       <p>No active saving plans</p>
    //       <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium">
    //         Start New Plan
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <LChitJewelsSavingPlan/>
  );

  const renderDigitalGold = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">Digital Gold SIP Plan</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="text-center py-12 text-gray-500">
    //       <Coins className="w-12 h-12 mx-auto mb-4 text-gray-300" />
    //       <p>No active SIP plans</p>
    //       <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium">
    //         Start SIP
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <LDigitalGoldSIPPlan/>
  );

  const renderGoldPlant = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">Gold Plant Scheme</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="text-center py-12 text-gray-500">
    //       <Sprout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
    //       <p>No active plant schemes</p>
    //       <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium">
    //         Start Scheme
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <LGoldPlantScheme/>
  );

  const renderNotification = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="text-center py-12 text-gray-500">
    //       <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
    //       <p>No new notifications</p>
    //     </div>
    //   </div>
    // </div>
    <LNotification/>
  );

  const renderBankAccounts = () => (
    // <div className="space-y-6">
    //   <h2 className="text-2xl font-bold text-gray-800">My Bank Accounts</h2>
    //   <div className="bg-white rounded-xl p-6 shadow-sm border">
    //     <div className="flex justify-between items-center mb-6">
    //       <h3 className="text-lg font-semibold">Bank Accounts</h3>
    //       <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-medium" onClick={() => navigate("/usermybankaccounts")}>
    //         Add Account
    //       </button>
    //     </div>
    //     <div className="text-center py-12 text-gray-500">
    //       <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
    //       <p>No bank accounts added</p>
    //     </div>
    //   </div>
    // </div>
    <BankUPIManager/>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'My Dashboard':
        return renderDashboard();
      case 'My Profile':
        return renderProfile();
      case 'KYC':
        return renderKYC();
      case 'Beneficiaries':
        return renderBeneficiaries();
      case 'Chit Jewels Saving Plan':
        return renderSavingPlan();
      case 'Digital Gold SIP Plan':
        return renderDigitalGold();
      case 'Gold Plant Scheme':
        return renderGoldPlant();
      case 'Notification':
        return renderNotification();
      case 'My Bank Accounts':
        return renderBankAccounts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 pt-32">
      {/* Left Sidebar */}
      <div className="w-80 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">Greenheap<span className="text-yellow-600">gold</span></h1>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-red-50 border-r-4 border-red-500 text-red-600' 
                    : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;