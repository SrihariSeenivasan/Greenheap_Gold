import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Edit3, 
  Trash2,
  Copy,
  Check,
  Smartphone,
  User,
  Building,
  Calendar,
  Hash,
  AtSign,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

interface BankCard {
  id: number;
  accountNumber: string;
  ifscCode: string;
  holderName: string;
  bankName: string;
  validThru: string;
  cardType: 'visa' | 'mastercard' | 'rupay';
}

interface UPIAccount {
  id: number;
  upiId: string;
  holderName: string;
  bankName: string;
}

const BankUPIManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bank' | 'upi'>('bank');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Bank Card States
  const [bankCards, setBankCards] = useState<BankCard[]>([]);
  const [bankForm, setBankForm] = useState({
    accountNumber: '',
    ifscCode: '',
    holderName: '',
    bankName: '',
    validThru: '',
    cardType: 'visa' as 'visa' | 'mastercard' | 'rupay'
  });

  // UPI States
  const [upiAccounts, setUpiAccounts] = useState<UPIAccount[]>([]);
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    holderName: '',
    bankName: ''
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const addBankCard = () => {
    if (bankForm.accountNumber && bankForm.ifscCode && bankForm.holderName && bankForm.bankName && bankForm.validThru) {
      const newCard: BankCard = {
        id: Date.now(),
        ...bankForm
      };
      setBankCards([...bankCards, newCard]);
      setBankForm({
        accountNumber: '',
        ifscCode: '',
        holderName: '',
        bankName: '',
        validThru: '',
        cardType: 'visa'
      });
    }
  };

  const addUPIAccount = () => {
    if (upiForm.upiId && upiForm.holderName && upiForm.bankName) {
      const newUPI: UPIAccount = {
        id: Date.now(),
        ...upiForm
      };
      setUpiAccounts([...upiAccounts, newUPI]);
      setUpiForm({
        upiId: '',
        holderName: '',
        bankName: ''
      });
    }
  };

  const deleteBankCard = (id: number) => {
    setBankCards(bankCards.filter(card => card.id !== id));
  };

  const deleteUPIAccount = (id: number) => {
    setUpiAccounts(upiAccounts.filter(upi => upi.id !== id));
  };

  const getCardGradient = (type: string, index: number) => {
    const gradients = {
      visa: ['from-blue-600 to-blue-800', 'from-purple-600 to-purple-800', 'from-indigo-600 to-indigo-800'],
      mastercard: ['from-red-600 to-orange-600', 'from-pink-600 to-red-600', 'from-orange-600 to-red-600'],
      rupay: ['from-green-600 to-teal-600', 'from-emerald-600 to-green-600', 'from-teal-600 to-cyan-600']
    };
    return gradients[type as keyof typeof gradients][index % 3];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7a1335] to-[#a91d47] bg-clip-text text-transparent mb-2">
            Payment Manager
          </h1>
          <p className="text-gray-600">Manage your bank cards and UPI accounts</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'bank'
                  ? 'bg-gradient-to-r from-[#7a1335] to-[#a91d47] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#7a1335]'
              }`}
            >
              <CreditCard className="w-5 h-5 inline mr-2" />
              Bank Cards
            </button>
            <button
              onClick={() => setActiveTab('upi')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'upi'
                  ? 'bg-gradient-to-r from-[#7a1335] to-[#a91d47] text-white shadow-lg'
                  : 'text-gray-600 hover:text-[#7a1335]'
              }`}
            >
              <Smartphone className="w-5 h-5 inline mr-2" />
              UPI Accounts
            </button>
          </div>
        </div>

        {activeTab === 'bank' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Bank Card Entry Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7a1335] to-[#a91d47] rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Add Bank Card
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Hash className="w-4 h-4 inline mr-1" />
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={bankForm.ifscCode}
                      onChange={(e) => setBankForm({...bankForm, ifscCode: e.target.value.toUpperCase()})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                      placeholder="Enter IFSC code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={bankForm.holderName}
                    onChange={(e) => setBankForm({...bankForm, holderName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                    placeholder="Enter card holder name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-1" />
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankForm.bankName}
                      onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Valid Thru
                    </label>
                    <input
                      type="text"
                      value={bankForm.validThru}
                      onChange={(e) => setBankForm({...bankForm, validThru: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                  <div className="flex gap-4">
                    {['visa', 'mastercard', 'rupay'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="cardType"
                          value={type}
                          checked={bankForm.cardType === type}
                          onChange={(e) => setBankForm({...bankForm, cardType: e.target.value as 'visa' | 'mastercard' | 'rupay'})}
                          className="mr-2"
                        />
                        <span className="capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addBankCard}
                  className="w-full bg-gradient-to-r from-[#7a1335] to-[#a91d47] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-[#7a1335]/25 transition-all duration-200 hover:scale-105"
                >
                  Add Bank Card
                </button>
              </div>
            </div>

            {/* Bank Cards Display Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bank Cards</h2>
              
              {bankCards.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bank cards added yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bankCards.map((card, index) => (
                    <div key={card.id} className="relative">
                      {/* ATM Card Design */}
                      <div className={`relative bg-gradient-to-r ${getCardGradient(card.cardType, index)} rounded-2xl p-6 text-white shadow-xl overflow-hidden`}>
                        {/* Card Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white"></div>
                          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-2 border-white"></div>
                        </div>
                        
                        {/* Card Content */}
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-8">
                            <div className="text-lg font-bold uppercase tracking-wider">
                              {card.bankName}
                            </div>
                            <div className="text-right">
                              <div className="text-xs opacity-80">VALID THRU</div>
                              <div className="font-mono text-sm">{card.validThru}</div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <div className="text-xs opacity-80 mb-1">ACCOUNT NUMBER</div>
                            <div className="font-mono text-lg tracking-widest">
                              {card.accountNumber.replace(/(.{4})/g, '$1 ')}
                            </div>
                          </div>

                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-xs opacity-80 mb-1">CARD HOLDER</div>
                              <div className="font-semibold uppercase">{card.holderName}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs opacity-80 mb-1">IFSC</div>
                              <div className="font-mono text-sm">{card.ifscCode}</div>
                            </div>
                          </div>

                          <div className="absolute top-6 right-6 text-xs font-bold uppercase opacity-80">
                            {card.cardType}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <button
                            onClick={() => handleCopy(card.accountNumber)}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                          >
                            {copiedText === card.accountNumber ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteBankCard(card.id)}
                            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* UPI Entry Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7a1335] to-[#a91d47] rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Add UPI Account
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AtSign className="w-4 h-4 inline mr-1" />
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiForm.upiId}
                    onChange={(e) => setUpiForm({...upiForm, upiId: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                    placeholder="Enter UPI ID (e.g., user@paytm)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={upiForm.holderName}
                    onChange={(e) => setUpiForm({...upiForm, holderName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                    placeholder="Enter account holder name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={upiForm.bankName}
                    onChange={(e) => setUpiForm({...upiForm, bankName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7a1335] focus:border-transparent transition-all"
                    placeholder="Enter bank name"
                  />
                </div>

                <button
                  onClick={addUPIAccount}
                  className="w-full bg-gradient-to-r from-[#7a1335] to-[#a91d47] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-[#7a1335]/25 transition-all duration-200 hover:scale-105"
                >
                  Add UPI Account
                </button>
              </div>
            </div>

            {/* UPI Display Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your UPI Accounts</h2>
              
              {upiAccounts.length === 0 ? (
                <div className="text-center py-12">
                  <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No UPI accounts added yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {upiAccounts.map((upi, index) => (
                    <div key={upi.id} className="relative">
                      {/* Mobile Phone UI */}
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl">
                        {/* Phone Frame */}
                        <div className="bg-black rounded-2xl p-1">
                          {/* Screen */}
                          <div className="bg-gradient-to-br from-[#7a1335] to-[#a91d47] rounded-2xl overflow-hidden">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-4 py-2 text-white text-xs">
                              <div className="flex items-center gap-1">
                                <Signal className="w-3 h-3" />
                                <Wifi className="w-3 h-3" />
                              </div>
                              <div className="font-mono">12:34</div>
                              <div className="flex items-center gap-1">
                                <span>98%</span>
                                <Battery className="w-3 h-3" />
                              </div>
                            </div>

                            {/* UPI App Interface */}
                            <div className="bg-white rounded-t-3xl p-6 min-h-[280px]">
                              <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#7a1335] to-[#a91d47] rounded-full flex items-center justify-center mx-auto mb-3">
                                  <AtSign className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">UPI Payment</h3>
                              </div>

                              <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                  <div className="text-xs text-gray-500 mb-1">UPI ID</div>
                                  <div className="font-mono text-sm text-gray-800 flex items-center justify-between">
                                    <span>{upi.upiId}</span>
                                    <button
                                      onClick={() => handleCopy(upi.upiId)}
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      {copiedText === upi.upiId ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-gray-500" />}
                                    </button>
                                  </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                  <div className="text-xs text-gray-500 mb-1">Account Holder</div>
                                  <div className="font-semibold text-gray-800">{upi.holderName}</div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                  <div className="text-xs text-gray-500 mb-1">Bank</div>
                                  <div className="font-medium text-gray-800">{upi.bankName}</div>
                                </div>
                              </div>

                              {/* Action Button */}
                              <button
                                onClick={() => deleteUPIAccount(upi.id)}
                                className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
                              >
                                Remove Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankUPIManager;