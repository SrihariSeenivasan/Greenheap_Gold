import { ChevronRight, CreditCard, Smartphone, X } from 'lucide-react';
import { useState } from 'react';

type CardType = {
  id: number;
  type: string;
  last4: string;
  bank: string;
};

type UPIType = {
  id: number;
  upiId: string;
  provider: string;
};

const PaymentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [selectedUPI, setSelectedUPI] = useState<UPIType | null>(null);
  
  // Sample user data
  const userCards: CardType[] = [
    { id: 1, type: 'visa', last4: '4532', bank: 'HDFC Bank' },
    { id: 2, type: 'mastercard', last4: '8901', bank: 'ICICI Bank' },
    { id: 3, type: 'rupay', last4: '2345', bank: 'SBI Bank' }
  ];
  
  const userUPIs: UPIType[] = [
    { id: 1, upiId: 'user@paytm', provider: 'Paytm' },
    { id: 2, upiId: 'user@phonepe', provider: 'PhonePe' },
    { id: 3, upiId: 'user@gpay', provider: 'Google Pay' }
  ];

  const handlePayment = () => {
    if (selectedMethod === 'card' && selectedCard) {
      alert(`Payment initiated with card ending ${selectedCard.last4}`);
    } else if (selectedMethod === 'upi' && selectedUPI) {
      alert(`Payment initiated with UPI ID: ${selectedUPI.upiId}`);
    }
    setIsOpen(false);
  };

  const getCardIcon = (type: string) => {
    const icons: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      rupay: '💳'
    };
    return icons[type] || '💳';
  };

  const getUPIIcon = (provider: string) => {
    const icons: Record<string, string> = {
      'Paytm': '📱',
      'PhonePe': '📱',
      'Google Pay': '📱'
    };
    return icons[provider] || '📱';
  };

 

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            Choose Payment Method
          </h2>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: '#64748b'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '20px',
          maxHeight: 'calc(80vh - 140px)',
          overflowY: 'auto'
        }}>
          {/* Payment Method Selection */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  setSelectedMethod('card');
                  setSelectedUPI(null);
                }}
                style={{
                  padding: '16px',
                  border: selectedMethod === 'card' ? '2px solid #6366f1' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: selectedMethod === 'card' ? '#f8fafc' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <CreditCard size={24} color={selectedMethod === 'card' ? '#6366f1' : '#64748b'} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: selectedMethod === 'card' ? '#6366f1' : '#64748b'
                }}>
                  Card
                </span>
              </button>
              
              <button
                onClick={() => {
                  setSelectedMethod('upi');
                  setSelectedCard(null);
                }}
                style={{
                  padding: '16px',
                  border: selectedMethod === 'upi' ? '2px solid #6366f1' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: selectedMethod === 'upi' ? '#f8fafc' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <Smartphone size={24} color={selectedMethod === 'upi' ? '#6366f1' : '#64748b'} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: selectedMethod === 'upi' ? '#6366f1' : '#64748b'
                }}>
                  UPI
                </span>
              </button>
            </div>
          </div>

          {/* Cards List */}
          {selectedMethod === 'card' && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Select Card
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {userCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    style={{
                      padding: '16px',
                      border: selectedCard?.id === card.id ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: selectedCard?.id === card.id ? '#f8fafc' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>{getCardIcon(card.type)}</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#1e293b'
                        }}>
                          •••• {card.last4}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                          {card.bank}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} color="#94a3b8" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* UPI List */}
          {selectedMethod === 'upi' && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Select UPI
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {userUPIs.map(upi => (
                  <button
                    key={upi.id}
                    onClick={() => setSelectedUPI(upi)}
                    style={{
                      padding: '16px',
                      border: selectedUPI?.id === upi.id ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: selectedUPI?.id === upi.id ? '#f8fafc' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>{getUPIIcon(upi.provider)}</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#1e293b'
                        }}>
                          {upi.upiId}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#64748b'
                        }}>
                          {upi.provider}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} color="#94a3b8" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={!selectedCard && !selectedUPI}
            style={{
              flex: 2,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: selectedCard || selectedUPI ? '#6366f1' : '#e2e8f0',
              color: selectedCard || selectedUPI ? 'white' : '#94a3b8',
              fontSize: '14px',
              fontWeight: '500',
              cursor: selectedCard || selectedUPI ? 'pointer' : 'not-allowed'
            }}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;