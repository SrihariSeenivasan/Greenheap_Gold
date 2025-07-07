import {
  Backpack,
  Bell,
  Building2,
  ChevronRight,
  Coins,
  CreditCard,
  Gem,
  Heart,
  Home,
  Sprout,
  User,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cart from './Cart/cart';
import LBeneficiaries from './DashboardComponents/Beneficiaries';
import LChitJewelsSavingPlan from './DashboardComponents/ChitJewelsSavingPlan';
import LDigitalGoldSIPPlan from './DashboardComponents/DigitalGoldSIPPlan';
import LGoldPlantScheme from './DashboardComponents/GoldPlantScheme';
import LKYC from './DashboardComponents/KYC';
import BankUPIManager from './DashboardComponents/MyBankAccounts';
import LMyDashboard from './DashboardComponents/MyDashboard';
import LMyProfile from './DashboardComponents/MyProfile';
import LNotification from './DashboardComponents/Notification';
import Wishlist from './Wishlist/wishlist';

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
    { id: 'Wishlist', label: 'Wishlist', icon: Heart },
    { id: 'Cart', label: 'Cart', icon: Backpack },
    { id: 'Notification', label: 'Notification', icon: Bell },
    { id: 'My Bank Accounts', label: 'My Bank Accounts', icon: Building2 },
  ];

  const renderDashboard = () => (
    <LMyDashboard/>
  );

  const renderProfile = () => (
    <LMyProfile/>
  );

  const renderKYC = () => (
    <LKYC/>
  );

  const renderBeneficiaries = () => (
    <LBeneficiaries/>
  );

  const renderSavingPlan = () => (
    <LChitJewelsSavingPlan/>
  );

  const renderDigitalGold = () => (
    <LDigitalGoldSIPPlan/>
  );

  const renderGoldPlant = () => (
    <LGoldPlantScheme/>
  );

  const renderNotification = () => (
    <LNotification/>
  );

  const renderBankAccounts = () => (
    <BankUPIManager/>
  );

  const renderWishlist = () => (
    <Wishlist/>  
  );
  const renderCart = () => (
    <Cart/>  
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
      case 'Wishlist':
        return renderWishlist();  
      case 'Cart':
        return renderCart();
      case 'Notification':
        return renderNotification();
      case 'My Bank Accounts':
        return renderBankAccounts();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 pt-1">
      <div className="w-60 bg-white shadow-lg h-screen overflow-y-auto">
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
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;