import { Award, Calendar, ChevronDown, ChevronUp, Gem, Shield } from 'lucide-react';
import { useState } from 'react';

// Define interfaces for plan and FAQ
interface Plan {
  id: number;
  name: string;
  duration: string;
  amount: string;
  description: string;
  monthlyPayment: string;
  popular: boolean;
  features: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const ChitJewelsPlans = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans: Plan[] = [
    {
      id: 1,
      name: "Gold Starter",
      duration: "12 Months",
      amount: "₹50,000",
      description: "Perfect for beginners looking to start their gold investment journey with flexible monthly payments.",
      monthlyPayment: "₹4,167",
      popular: false,
      features: ["Digital gold storage", "Monthly payment flexibility", "Insurance coverage", "24/7 customer support"]
    },
    {
      id: 2,
      name: "Gold Premium",
      duration: "18 Months",
      amount: "₹1,00,000",
      description: "Our most popular plan offering the best value with enhanced benefits and priority customer service.",
      monthlyPayment: "₹5,556",
      popular: true,
      features: ["Premium digital gold storage", "Priority customer support", "Extended insurance coverage", "Bonus rewards", "Free delivery"]
    },
    {
      id: 3,
      name: "Gold Elite",
      duration: "24 Months",
      amount: "₹2,00,000",
      description: "Premium plan for serious investors with maximum benefits and exclusive perks.",
      monthlyPayment: "₹8,333",
      popular: false,
      features: ["Elite digital gold storage", "Dedicated relationship manager", "Comprehensive insurance", "Exclusive rewards", "Priority delivery", "Investment advisory"]
    },
    {
      id: 4,
      name: "Gold Platinum",
      duration: "36 Months",
      amount: "₹5,00,000",
      description: "Ultimate investment plan with the highest returns and premium services for long-term wealth building.",
      monthlyPayment: "₹13,889",
      popular: false,
      features: ["Platinum digital gold storage", "Personal investment advisor", "Maximum insurance coverage", "VIP customer service", "Complimentary services", "Exclusive events access"]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is digital gold and how does it work?",
      answer: "Digital gold is a modern way to invest in gold without physical possession. You purchase gold online, and it's stored securely in insured vaults. You can buy, sell, or convert to physical gold anytime through our platform."
    },
    {
      question: "Can I convert my digital gold to physical gold?",
      answer: "Yes, you can convert your digital gold to physical gold at any time. We offer home delivery services for coins and bars, or you can collect from our authorized centers. Conversion charges may apply based on the quantity and location."
    },
    {
      question: "Is my digital gold safe and insured?",
      answer: "Absolutely! Your digital gold is stored in secure, insured vaults with 24/7 monitoring. We provide comprehensive insurance coverage and follow strict security protocols to ensure your investment is protected."
    },
    {
      question: "How do I sell my digital gold?",
      answer: "Selling digital gold is simple through our platform. You can sell partially or completely at current market rates. The proceeds are transferred to your registered bank account within 24-48 hours after the transaction."
    }
  ];

  const showPlanDetails = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const closePlanDetails = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Gem className="h-16 w-16 text-yellow-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chit Jewels
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Your Gateway to Smart Gold Investment
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-yellow-50">
              Discover our flexible chit fund plans designed to help you build wealth through gold investments. 
              Choose from our range of plans tailored to meet your financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Common Information Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Chit Jewels?
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our chit fund plans combine the traditional concept of group savings with modern gold investment strategies. 
            Each plan is designed to provide you with flexible payment options while building your gold portfolio over time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Insured</h3>
            <p className="text-gray-600">Your investments are protected with comprehensive insurance coverage and secure storage facilities.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Calendar className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Plans</h3>
            <p className="text-gray-600">Choose from various duration and payment options that suit your financial capabilities and goals.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Returns</h3>
            <p className="text-gray-600">Benefit from gold's historical performance and our expertise in precious metal investments.</p>
          </div>
        </div>
      </div>

      {/* Active Plans Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Active Plans
            </h2>
            <p className="text-lg text-gray-600">
              Select the plan that best fits your investment goals and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-105 ${plan.popular ? 'border-amber-500' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-amber-600 mb-2">{plan.amount}</div>
                    <div className="text-gray-600 mb-4">{plan.duration}</div>
                    <div className="bg-amber-50 px-3 py-2 rounded-lg">
                      <span className="text-sm font-semibold text-amber-700">Monthly: {plan.monthlyPayment}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => showPlanDetails(plan)}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16" style={{ backgroundColor: '#7a1335' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FFD700' }}>
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1" style={{ backgroundColor: '#FFD700', margin: '0 auto' }}></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#7a1335' }}>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    {faq.question}
                  </span>
                  <div style={{ color: '#7a1335' }}>
                    {openFaq === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <div className="pl-9 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Details Popup */}
      {selectedPlan && (
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
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={closePlanDetails}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h3>
              <div className="text-4xl font-bold text-amber-600 mb-2">{selectedPlan.amount}</div>
              <div className="text-gray-600 mb-4">{selectedPlan.duration}</div>
              <div className="bg-amber-50 px-4 py-2 rounded-lg inline-block">
                <span className="font-semibold text-amber-700">Monthly Payment: {selectedPlan.monthlyPayment}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{selectedPlan.description}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Plan Features:</h4>
              <div className="space-y-3">
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={closePlanDetails}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 py-3 px-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Choose This Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChitJewelsPlans;