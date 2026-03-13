import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Shield,
  MapPin,
  Phone,
  Award,
  Activity,
  Pill,
  Ambulance,
  Baby,
  Brain,
  Zap,
  Cpu,
  Mail,
  Users,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Menu,
  X,
  Stethoscope,
  UserCheck,
  TrendingUp,
  Sparkles
} from "lucide-react";
import Footer from '../components/ui/footer';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
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
                {isMenuOpen ? <X className="w-6 h-6 animate-fade-in" /> : <Menu className="w-6 h-6 animate-fade-in" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-gradient-flow z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-blue-600">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered Healthcare</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight animate-fade-in-up">
                Your Health,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  Our Priority
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-fade-in-up delay-100">
                Experience revolutionary healthcare with AI-powered diagnostics, personalized treatment plans, and
                comprehensive medical services designed for everyone, everywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Start Consultation
                </button>
                <button className="border-2 border-blue-500 text-blue-600 text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center justify-center hover:text-blue-800">
                  <Activity className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up delay-300">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-black text-blue-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-500 font-medium">Patients Served</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-black text-purple-600 mb-2">98%</div>
                  <div className="text-sm text-gray-500 font-medium">Accuracy Rate</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-black text-green-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-500 font-medium">AI Support</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Doctor", icon: Stethoscope, color: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-300" },
                  { label: "Patient", icon: UserCheck, color: "bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-300" },
                  { label: "Nurse", icon: Heart, color: "bg-red-50 hover:bg-red-100 text-red-600 border-red-300" },
                  { label: "NGO", icon: Users, color: "bg-green-50 hover:bg-green-100 text-green-600 border-green-300" }
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (option.label === "Doctor") navigate("/doctor-login");
                      if (option.label === "Patient") navigate("/patient-login");
                      if (option.label === "Nurse") navigate("/nurse-login");
                      if (option.label === "NGO") navigate("/ngo-login");
                    }}
                    className={`${option.color} p-3 rounded-xl border-2 hover:border-current transition-all duration-300 transform hover:scale-105 text-center font-semibold text-sm`}
                  >
                    <option.icon className="w-5 h-5 mx-auto mb-1" />
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="relative transform hover:scale-105 transition-transform duration-500">
                <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-fade-in"></div>
                  <div className="absolute inset-0 flex items-center justify-center animate-fade-in delay-200">
                    <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                      <Stethoscope className="w-16 h-16 text-blue-600 animate-pulse-slow" />
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping-slow"></div>
                      <span className="text-sm font-semibold text-gray-700">AI Active</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-gray-700">Health Analysis Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "AI Diagnoses", icon: Brain, color: "text-blue-600", bg: "bg-blue-50" },
              { number: "500+", label: "Healthcare Centers", icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
              { number: "100+", label: "Medical Specialists", icon: Users, color: "text-green-600", bg: "bg-green-50" },
              { number: "24/7", label: "Emergency Support", icon: Clock, color: "text-red-600", bg: "bg-red-50" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.bg} rounded-xl mb-4`}>
                  <stat.icon className={`w-7 h-7 ${stat.color} group-hover:animate-bounce-short`} />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center space-x-3 text-blue-600 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider">Revolutionary Healthcare Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">AI-Powered Medical Care</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI-enhanced healthcare services designed to provide exceptional
              medical care with cutting-edge technology and compassionate human touch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Telemedicine",
                description: "Connect with AI-assisted doctors for instant consultations, symptom analysis, and personalized treatment recommendations.",
                icon: Brain,
                gradient: "from-green-500 to-emerald-500",
                features: ["24/7 Availability", "Instant Diagnosis", "Prescription Management"],
              },
              {
                title: "Smart Health Monitoring",
                description: "Continuous health tracking with AI-powered insights, early warning systems, and preventive care recommendations.",
                icon: Activity,
                gradient: "from-blue-500 to-cyan-500",
                features: ["Real-time Monitoring", "Predictive Analytics", "Health Alerts"],
              },
              {
                title: "Precision Medicine",
                description: "Personalized treatment plans based on genetic analysis, medical history, and AI-driven therapeutic recommendations.",
                icon: Pill,
                gradient: "from-purple-500 to-pink-500",
                features: ["Genetic Analysis", "Custom Treatments", "Drug Interactions"],
              },
              {
                title: "Emergency Response",
                description: "Rapid emergency care coordination with AI triage, automated ambulance dispatch, and critical care protocols.",
                icon: Ambulance,
                gradient: "from-red-500 to-orange-500",
                features: ["Instant Response", "AI Triage", "Critical Care"],
              },
              {
                title: "Maternal Care",
                description: "Comprehensive pregnancy monitoring with AI-powered risk assessment and personalized care plans for mothers and babies.",
                icon: Baby,
                gradient: "from-pink-500 to-rose-500",
                features: ["Pregnancy Tracking", "Risk Assessment", "Baby Health"],
              },
              {
                title: "Health Intelligence",
                description: "Advanced health analytics providing deep insights into your wellness patterns and personalized improvement strategies.",
                icon: Zap,
                gradient: "from-yellow-500 to-orange-500",
                features: ["Health Analytics", "Wellness Insights", "Lifestyle Coaching"],
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:rotate-6 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from people whose lives have been transformed by our AI-powered healthcare platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Rural Maharashtra",
                testimonial: "वैदSeva's AI diagnosis helped detect my condition early. The telemedicine service brought world-class healthcare to my village.",
                rating: 5,
                avatar: "PS",
              },
              {
                name: "Dr. Rajesh Kumar",
                location: "Community Health Center",
                testimonial: "As a rural doctor, वैदSeva's AI assistance has enhanced my diagnostic capabilities tremendously. It's like having a specialist always available.",
                rating: 5,
                avatar: "RK",
              },
              {
                name: "Meera Patel",
                location: "Gujarat Village",
                testimonial: "The maternal care program monitored my pregnancy beautifully. The AI predictions helped ensure a safe delivery for my baby.",
                rating: 5,
                avatar: "MP",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.testimonial}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold transform hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-600">Advanced AI and machine learning powering better healthcare outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI Diagnostics",
                description: "Machine learning algorithms trained on millions of medical cases for accurate diagnosis",
                icon: Brain,
                color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                title: "Predictive Analytics",
                description: "Early detection of health risks using advanced predictive modeling",
                icon: TrendingUp,
                color: "bg-green-50 border-green-200 hover:bg-green-100",
                iconColor: "text-green-600"
              },
              {
                title: "Natural Language Processing",
                description: "AI-powered medical record analysis and patient communication",
                icon: Cpu,
                color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
                iconColor: "text-purple-600"
              },
              {
                title: "Secure Platform",
                description: "End-to-end encryption and HIPAA-compliant data protection",
                icon: Shield,
                color: "bg-red-50 border-red-200 hover:bg-red-100",
                iconColor: "text-red-600"
              },
            ].map((service, index) => (
              <div key={index} className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${service.color}`}>
                <div className="mb-4">
                  <service.icon className={`w-12 h-12 ${service.iconColor} group-hover:animate-bounce-short`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/20 animate-pulse-bg z-0"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
            Ready to Experience the Future of Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of patients and healthcare providers who trust वैदSeva for AI-powered medical care. Start your journey towards better health today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 text-lg px-10 py-5 rounded-xl hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center transform hover:scale-105">
              <Play className="w-5 h-5 mr-2" />
              Start Free Consultation
            </button>
            <button className="border-2 border-white text-white text-lg px-10 py-5 rounded-xl hover:bg-white/10 transition-colors font-semibold flex items-center justify-center transform hover:scale-105">
              <Phone className="w-5 h-5 mr-2" />
              Call: 1800-123-4567
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}