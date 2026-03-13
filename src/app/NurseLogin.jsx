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
  Clock,
  Activity,
  UserCheck
} from "lucide-react";
import Footer from '../components/ui/footer';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';

export default function NurseLoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validation
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    try {
        // Query Supabase table for matching username + password
        const { data, error } = await supabase
          .from("Nurse") // 👈 replace with your actual table name
          .select("*")
          .eq("name", username)
          .eq("password", password)
          .maybeSingle();
    
          if (error || !data) {
          console.error("Login failed:", error);
          setErrors({ general: "Invalid username or password" });
        } else {
          localStorage.setItem("doctor", JSON.stringify(data));
          navigate("/nurse-profile");
        }
      } catch (err) {
        console.error("Login error:", err);
        setErrors({ general: "Something went wrong. Try again." });
      } finally {
        setIsLoading(false);
      }
    };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">वैदSeva</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Services
              </a>
              <a href="#technology" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Technology
              </a>
              <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Contact
              </a>
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-700 hover:text-red-600 font-medium">Services</a>
                <a href="#technology" className="text-gray-700 hover:text-red-600 font-medium">Technology</a>
                <a href="#about" className="text-gray-700 hover:text-red-600 font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-red-600 font-medium">Contact</a>
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium w-fit hover:shadow-lg transition-shadow">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-100/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Branding & Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-red-600">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider">Nurse Portal</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                Care With
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 block">
                  Compassion
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Access your nursing dashboard to manage patient care, coordinate with medical teams, and deliver exceptional healthcare with precision and empathy.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-red-600 mb-1">Care</div>
                  <div className="text-sm text-gray-500 font-medium">Management</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-red-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">Support</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-black text-red-600 mb-1">Real</div>
                  <div className="text-sm text-gray-500 font-medium">Time</div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 transform hover:scale-105 transition-all duration-300">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                    <UserCheck className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Nurse Login</h2>
                  <p className="text-gray-600">Access your nursing dashboard</p>
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="relative">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your username"
                      />
                      {errors.username && (
                        <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-red-600 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <button className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Access Care Dashboard
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Additional Links */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Need help accessing your account?{' '}
                    <button className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
                      Contact Support
                    </button>
                  </p>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}