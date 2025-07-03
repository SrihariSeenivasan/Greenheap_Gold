import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  Check,
  X,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const BuyNow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [saveCard, setSaveCard] = useState(false);
  const [orderId, setOrderId] = useState('');

  const product: Product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    quantity: 1,
  };

  const shippingAddress = {
    name: 'John Doe',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    pincode: '400001',
    phone: '+91 9876543210',
  };

  const deliveryCharge = 99;
  const subtotal = product.price * product.quantity;
  const finalAmount = subtotal + deliveryCharge - discount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(250);
    } else if (promoCode.toLowerCase() === 'welcome') {
      setDiscount(199);
    } else {
      setDiscount(0);
    }
  };

  const handlePayment = () => {
    const newOrderId = 'ORD' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);

    setTimeout(() => {
      setCurrentStep(2);
    }, 1500);
  };

  const steps = ['Summary', 'Payment', 'Confirmation'];

  const brand = '#7a1335';

  const ButtonPrimary = ({ children, onClick, disabled }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[${brand}] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f9] to-[#fef0f4] p-32 ">
      <div className="max-w-4xl mx-auto py-8">
        {currentStep === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#7a1335]">Order Summary</h2>

            {/* Product */}
            <div className="flex gap-4 items-start">
              <img src={product.image} alt={product.name} className="w-24 rounded-xl" />
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                <p className="text-[#7a1335] font-bold text-lg mt-1">₹{product.price}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex gap-2 items-center mb-2">
                <MapPin className="w-4 h-4 text-[#7a1335]" />
                <h4 className="font-semibold text-[#7a1335]">Shipping Address</h4>
              </div>
              <p className="text-sm">{shippingAddress.name}</p>
              <p className="text-sm text-gray-600">
                {shippingAddress.address}, {shippingAddress.city} - {shippingAddress.pincode}
              </p>
              <p className="text-sm text-gray-600">{shippingAddress.phone}</p>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="flex-1 border px-4 py-2 rounded-lg"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={applyPromoCode}
                className="bg-[#7a1335] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="text-sm text-green-600">✓ Promo applied. Saved ₹{discount}</p>
            )}

            {/* Price */}
            <div className="text-sm space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>₹{deliveryCharge}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#7a1335] pt-2 border-t">
                <span>Total</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            {/* Continue */}
            <ButtonPrimary onClick={() => setCurrentStep(1)}>Proceed to Payment</ButtonPrimary>
          </div>
        )}

        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-[#7a1335]">Payment</h2>

            {/* Payment Method */}
            <div className="space-y-3">
              {['UPI', 'Google Pay', 'PhonePe'].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <Smartphone className="text-gray-600 w-4 h-4" />
                  <span>{method}</span>
                </label>
              ))}

              <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={selectedPayment === 'card'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <CreditCard className="text-gray-600 w-4 h-4" />
                <span>Credit/Debit Card</span>
              </label>

              {selectedPayment === 'card' && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3 ml-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border px-4 py-2 rounded-lg"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, number: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="border px-4 py-2 rounded-lg"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, expiry: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="border px-4 py-2 rounded-lg"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full border px-4 py-2 rounded-lg"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                    />
                    Save card for future
                  </label>
                </div>
              )}

              <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === 'cod'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <Truck className="text-gray-600 w-4 h-4" />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentStep(0)}
                className="border py-3 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Back
              </button>
              <ButtonPrimary
                onClick={handlePayment}
                disabled={!selectedPayment}
              >
                {selectedPayment === 'cod' ? 'Place Order' : 'Confirm Payment'}
              </ButtonPrimary>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Check className="text-green-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#7a1335]">Thank you for your order!</h2>
            <p className="text-gray-600">Order ID: <span className="font-medium">{orderId}</span></p>

            {/* Summary */}
            <div className="border-t pt-4 text-left text-sm">
              <p><strong>Item:</strong> {product.name}</p>
              <p><strong>Total Paid:</strong> ₹{finalAmount}</p>
              <p><strong>Delivery by:</strong> July 6, 2025</p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-6">
              <ButtonPrimary onClick={() => {
                setCurrentStep(0);
                setSelectedPayment('');
                setPromoCode('');
                setDiscount(0);
                setOrderId('');
              }}>
                Continue Shopping
              </ButtonPrimary>
              <button className="border py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                Track Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNow;
