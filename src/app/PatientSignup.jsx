import React, { useState } from 'react';
import {
  Heart,
  Shield,
  MapPin,
  Phone,
  Mail,
  Users,
  Menu,
  X,
  User,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Calendar,
  Activity,
  Clock,
  UserPlus,
  CreditCard,
  Scale,
  Ruler
} from "lucide-react";
import Footer from '../components/ui/footer';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export default function PatientSignupPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    aadharNumber: '',
    phoneNumber: '',
    height: '',
    weight: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || formData.age < 1 || formData.age > 150) newErrors.age = 'Please enter a valid age';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required';
    else if (formData.aadharNumber.replace(/\s/g, '').length !== 12) newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    if (!formData.height.trim()) newErrors.height = 'Height is required';
    else if (isNaN(formData.height) || formData.height < 50 || formData.height > 300) newErrors.height = 'Please enter height in cm (50-300)';
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    else if (isNaN(formData.weight) || formData.weight < 10 || formData.weight > 500) newErrors.weight = 'Please enter weight in kg (10-500)';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const { data, error } = await supabase
      .from("patient") // your table name
      .insert([
        {
          name: formData.fullName,
          age: parseInt(formData.age),
          gender: formData.gender,
          aadharno: formData.aadharNumber.replace(/\s/g, ''), // remove spaces
          phoneno: formData.phoneNumber,
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
          password: formData.password // ideally, hash the password in production
        }
      ]);

    if (error) {
      console.error("Signup error:", error);
      alert("Failed to create account: " + error.message);
    } else {
      console.log("Signup successful:", data);
      alert("Account created successfully!");
      navigate("/patient-login"); // redirect to login page
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  const formatAadhar = (value) => {
    const cleanValue = value.replace(/\s/g, '');
    const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">वैदSeva</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Services
              </a>
              <a href="#technology" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Technology
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
                <a href="#technology" className="text-gray-700 hover:text-blue-600 font-medium">Technology</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium w-fit hover:shadow-lg transition-shadow">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Signup Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side - Branding & Info */}
            <div className="space-y-8 lg:sticky lg:top-8">
              <div className="flex items-center space-x-3 text-blue-600">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider">Create Account</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                Join Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  Health Network
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Create your personalized health profile and get access to premium healthcare services, expert consultations, and comprehensive health tracking.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">Support</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-purple-600 mb-1">Expert</div>
                  <div className="text-sm text-gray-500 font-medium">Care</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-green-600 mb-1">Instant</div>
                  <div className="text-sm text-gray-500 font-medium">Access</div>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 transform hover:scale-105 transition-all duration-300">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                    <UserPlus className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join thousands of satisfied patients</p>
                </div>

                {/* Signup Form */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  {/* Age and Gender Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Age */}
                    <div className="relative">
                      <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                        Age
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="age"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                          placeholder="Age"
                        />
                      </div>
                      {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age}</p>}
                    </div>

                    {/* Gender */}
                    <div className="relative">
                      <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white/80 backdrop-blur-sm"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
                    </div>
                  </div>

                  {/* Aadhar Number */}
                  <div className="relative">
                    <label htmlFor="aadharNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Aadhar Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange('aadharNumber', formatAadhar(e.target.value))}
                        onKeyPress={handleKeyPress}
                        maxLength={14}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                    {errors.aadharNumber && <p className="mt-2 text-sm text-red-600">{errors.aadharNumber}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
                        onKeyPress={handleKeyPress}
                        maxLength={10}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter 10-digit number"
                      />
                    </div>
                    {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>

                  {/* Height and Weight Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Height */}
                    <div className="relative">
                      <label htmlFor="height" className="block text-sm font-semibold text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Ruler className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="height"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                          placeholder="Height in cm"
                        />
                      </div>
                      {errors.height && <p className="mt-2 text-sm text-red-600">{errors.height}</p>}
                    </div>

                    {/* Weight */}
                    <div className="relative">
                      <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Scale className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="weight"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                          placeholder="Weight in kg"
                        />
                      </div>
                      {errors.weight && <p className="mt-2 text-sm text-red-600">{errors.weight}</p>}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Confirm your password"
                      />
                    </div>
                    {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agree-terms"
                        name="agree-terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agree-terms" className="text-gray-700">
                        I agree to the{' '}
                        <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                          Terms and Conditions
                        </button>
                        {' '}and{' '}
                        <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                  </div>
                  {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

                  {/* Signup Button */}
                  <button
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Create My Health Account
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Additional Links */}
                <div className="mt-8 text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200" onClick={() => navigate("/patient-login")}>
                      Sign In Here
                    </button>
                  </p>
                  <p className="text-sm text-gray-600">
                    Need help?{' '}
                    <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                      Contact Support
                    </button>
                  </p>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span>Your data is protected with 256-bit SSL encryption</span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}