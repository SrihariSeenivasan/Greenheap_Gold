import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Lock, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const B2BRegistration: React.FC = () => {
const navigate = useNavigate(); // Add this line
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    countryCode: '+91',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const countryCodes = [
    { code: '+1', label: '+1 (US)' },
    { code: '+44', label: '+44 (UK)' },
    { code: '+91', label: '+91 (India)' },
    { code: '+86', label: '+86 (China)' },
    { code: '+49', label: '+49 (Germany)' },
    { code: '+33', label: '+33 (France)' },
    { code: '+81', label: '+81 (Japan)' },
    { code: '+61', label: '+61 (Australia)' },
    { code: '+971', label: '+971 (UAE)' },
    { code: '+65', label: '+65 (Singapore)' }
  ];

  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Medium';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return 'Password strength';
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? '' : 'This field is required';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        if (!value.trim()) return 'Phone number is required';
        if (!phoneRegex.test(value)) return 'Please enter a valid 10-digit mobile number';
        return '';
      case 'address':
        return value.trim() ? '' : 'Address is required';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'dob':
        if (!value) return 'Date of birth is required';
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 18) return 'You must be at least 18 years old to register';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'terms' && key !== 'newsletter' && key !== 'countryCode') {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key] = error;
      }
    });

    // Check terms acceptance
    if (!formData.terms) {
      newErrors.terms = 'Please accept the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      alert('Registration successful! Welcome to our B2B gold platform.');
      console.log('Form submitted:', formData);
      // Redirect to bdashboard
      navigate('/bdashboard');
    }
    
  };
// bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Shield className="w-8 h-8 text-slate-800" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">B2B Registration</h1>
            <p className="text-slate-700 text-lg">Join our exclusive gold trading network</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* DOB and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <div className="md:col-span-3">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Business Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300 resize-none"
                placeholder="Enter complete business address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">Password strength</span>
                      <span className="text-xs text-slate-600">{getStrengthText(passwordStrength)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:border-slate-300"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 mt-0.5"
                />
                <label className="text-sm text-slate-700 cursor-pointer">
                  I agree to the <a href="#" className="text-amber-600 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-amber-600 font-semibold hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 mt-0.5"
                />
                <label className="text-sm text-slate-700 cursor-pointer">
                  I would like to receive market updates and newsletters
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-800 font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide"
            >
              Create B2B Account
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <a href="#" className="text-amber-600 font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BRegistration;