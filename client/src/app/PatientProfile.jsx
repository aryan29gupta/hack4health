import React, { useState, useEffect } from 'react';
import {
  Heart,
  Shield,
  User,
  Calendar,
  Settings,
  LogOut,
  Camera,
  Edit3,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Stethoscope,
  Clock,
  DollarSign,
  CheckCircle,
  Upload,
  Bell,
  Menu,
  Eye,
  Award,
  BookOpen,
  Building,
  Globe,
  Users,
  Star,
  Activity,
  Droplet,
  AlertTriangle,
  Weight,
  Ruler,
  Pill,
  FileText,
  UserCheck,
  Home,
  Bot,
  Brain,
  Sparkles,
  Mic,     
  ArrowRight 
} from "lucide-react";
import Footer from '../components/ui/footer';
import { useNavigate } from "react-router-dom";

export default function PatientProfileDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState({});
  
  // Initialize state with default values
  const [profileData, setProfileData] = useState({
    // Header Card
    profilePhoto: null,
    fullName: "",
    age: 0,
    patientId: "",
    isVerified: true,
    
    // Personal Information
    gender: "",
    contactNumber: "",
    email: "",
    city: "",
    aadhaar: "",
    
    // Medical Information
    bloodGroup: "",
    height: 0,
    weight: 0,
    allergies: [],
    chronicConditions: [],
    currentMedications: "",
    
    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    
    // Healthcare Preferences
    preferredConsultationType: "Hybrid",
    preferredLanguage: "Hindi",
    insuranceProvider: "",
    insurancePolicyNumber: ""
  });

  // Helper function to format Aadhaar number
  const formatAadhaar = (aadhaar) => {
    if (!aadhaar) return "";
    const aadhaarStr = aadhaar.toString();
    if (aadhaarStr.length === 12) {
      return aadhaarStr.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    }
    return aadhaarStr;
  };

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentPatient = localStorage.getItem('currentPatient');
    if (currentPatient) {
      try {
        const patientData = JSON.parse(currentPatient);
        console.log('Loaded patient data:', patientData);
        
        // Map database fields to profile data structure
        setProfileData(prev => ({
          ...prev,
          fullName: patientData.name || "",
          age: patientData.age || 0,
          patientId: `VS-PT-${patientData.id || '12345'}`,
          gender: patientData.gender || "",
          contactNumber: patientData.phoneno ? `+91 ${patientData.phoneno}` : "",
          aadhaar: patientData.aadharno ? formatAadhaar(patientData.aadharno) : "",
          height: patientData.height || 0,
          weight: patientData.weight || 0,
          // Set some default values for fields not in database
          bloodGroup: "B+", // You might want to add this to your database
          city: "New Delhi", // You might want to add this to your database
          email: patientData.name ? `${patientData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com` : "",
          allergies: ["Penicillin", "Shellfish"], // Default values - add to DB later
          chronicConditions: ["Hypertension"], // Default values - add to DB later
          currentMedications: "Amlodipine 5mg (once daily), Vitamin D3 (weekly)",
          emergencyName: "Emergency Contact",
          emergencyRelation: "Family",
          emergencyPhone: "+91 9876543211",
          insuranceProvider: "Star Health",
          insurancePolicyNumber: "SH-789456123"
        }));
      } catch (error) {
        console.error('Error parsing patient data:', error);
        // If there's an error, redirect to login
        navigate('/patient-login');
      }
    } else {
      // No patient data found, redirect to login
      navigate('/patient-login');
    }
  }, [navigate]);

  // Calculate BMI
  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInM = height / 100;
      return (weight / (heightInM * heightInM)).toFixed(1);
    }
    return '0.0';
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-yellow-600' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-600' };
    return { text: 'Obese', color: 'text-red-600' };
  };

  const toggleEdit = (section) => {
    setEditMode(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setProfileData(prev => ({ ...prev, [field]: array }));
  };

  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Profile', active: true },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'reports', icon: FileText, label: 'Medical Reports' },
    { id: 'prescriptions', icon: Pill, label: 'Prescriptions' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'signout', icon: LogOut, label: 'Sign Out' }
  ];

  const EditableField = ({ label, value, field, type = "text", multiline = false, options = null }) => {
    const isEditing = editMode[field];
    
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">{label}</label>
          <button
            onClick={() => toggleEdit(field)}
            className="text-blue-500 hover:text-blue-600 transition-colors p-1"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </button>
        </div>
        {isEditing ? (
          options ? (
            <select
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : multiline ? (
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              rows={4}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          )
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{value || "Not specified"}</div>
        )}
      </div>
    );
  };

  const bmi = calculateBMI(profileData.height, profileData.weight);
  const bmiCategory = getBMICategory(parseFloat(bmi));

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">वैदSeva</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {profileData.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'PT'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {profileData.fullName || 'Patient'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-100 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Patient Portal</h2>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'signout') {
                        setActiveSection('signout');
                      } else {
                        setActiveSection(item.id);
                      }
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
                    {activeSection === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Profile Photo */}
                  <div className="relative group">
                    <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                      {profileData.profilePhoto ? (
                        <img src={profileData.profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        profileData.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'PT'
                      )}
                    </div>
                    <button className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                      <h1 className="text-3xl font-black text-gray-900">{profileData.fullName || 'Patient Name'}</h1>
                      {profileData.isVerified && (
                        <div className="bg-green-100 p-1 rounded-full">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-xl text-green-600 font-semibold mb-2">Patient ID: {profileData.patientId}</p>
                    <p className="text-lg text-gray-600 mb-4">{profileData.age > 0 ? `${profileData.age} years old` : 'Age not specified'} • {profileData.gender || 'Gender not specified'}</p>
                    
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                      <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <Droplet className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">{profileData.bloodGroup || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">BMI: {bmi}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                        <Star className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Active Patient</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority AI Health Assistant Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl mb-4">
                    <Bot className="w-8 h-8 text-purple-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Meet Your AI Health Assistant
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    Get instant symptom analysis, smart health insights, and direct appointment booking through our AI-powered voice assistant.
                  </p>
                </div>

                {/* Enhanced CTA Button */}
                <div className="text-center mb-6">
                  <button 
                    className="group relative inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold text-lg"
                    onClick={() => {
                      window.location.href = "https://b3f198ec32dfa07565.gradio.live/";
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-bold">Arogya Sahayak AI</span>
                        <span className="text-sm text-white/80">Tell me your symptoms</span>
                      </div>

                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">24/7 Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">100% Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Instant Results</span>
                  </div>
                </div>
              </div>

              {/* How it Works Mini Guide */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🚀 How Arogya Sahayak Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mic className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">1. Speak Naturally</h4>
                    <p className="text-sm text-gray-600">Describe your symptoms in your own words</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">2. AI Analysis</h4>
                    <p className="text-sm text-gray-600">Get intelligent health insights instantly</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">3. Book Appointment</h4>
                    <p className="text-sm text-gray-600">Connect with the right doctor immediately</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditableField label="Full Name" value={profileData.fullName} field="fullName" />
                  <EditableField label="Age" value={profileData.age} field="age" type="number" />
                  <EditableField 
                    label="Gender" 
                    value={profileData.gender} 
                    field="gender" 
                    options={["Male", "Female", "Other"]}
                  />
                  <EditableField 
                    label="Blood Group" 
                    value={profileData.bloodGroup} 
                    field="bloodGroup" 
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  />
                  <EditableField label="Contact Number" value={profileData.contactNumber} field="contactNumber" type="tel" />
                  <EditableField label="Email" value={profileData.email} field="email" type="email" />
                  <EditableField label="City" value={profileData.city} field="city" />
                  <EditableField label="Aadhaar Number" value={profileData.aadhaar} field="aadhaar" />
                </div>
              </div>

              {/* Health Vitals */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Health Vitals</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <EditableField label="Height (cm)" value={profileData.height} field="height" type="number" />
                  <EditableField label="Weight (kg)" value={profileData.weight} field="weight" type="number" />
                  <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">BMI</label>
                    <div className={`p-3 bg-gray-50 rounded-lg text-gray-800 font-bold ${bmiCategory.color}`}>
                      {bmi} - {bmiCategory.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Health Records</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Allergies */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Allergies</label>
                      <button
                        onClick={() => toggleEdit('allergies')}
                        className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                      >
                        {editMode.allergies ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    </div>
                    {editMode.allergies ? (
                      <textarea
                        value={profileData.allergies.join(', ')}
                        onChange={(e) => handleArrayChange('allergies', e.target.value)}
                        className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Separate with commas"
                        rows={3}
                      />
                    ) : (
                      <div className="space-y-2">
                        {profileData.allergies.length > 0 ? profileData.allergies.map((allergy, index) => (
                          <div key={index} className="inline-block bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-2">
                            {allergy}
                          </div>
                        )) : (
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-500">No known allergies</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Chronic Conditions */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Chronic Conditions</label>
                      <button
                        onClick={() => toggleEdit('chronicConditions')}
                        className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                      >
                        {editMode.chronicConditions ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    </div>
                    {editMode.chronicConditions ? (
                      <textarea
                        value={profileData.chronicConditions.join(', ')}
                        onChange={(e) => handleArrayChange('chronicConditions', e.target.value)}
                        className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Separate with commas"
                        rows={3}
                      />
                    ) : (
                      <div className="space-y-2">
                        {profileData.chronicConditions.length > 0 ? profileData.chronicConditions.map((condition, index) => (
                          <div key={index} className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mr-2">
                            {condition}
                          </div>
                        )) : (
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-500">No chronic conditions</div>
                        )}
                      </div>
                    )}
                  </div>

                  <EditableField 
                    label="Current Medications" 
                    value={profileData.currentMedications} 
                    field="currentMedications" 
                    multiline={true}
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <EditableField label="Name" value={profileData.emergencyName} field="emergencyName" />
                  <EditableField 
                    label="Relation" 
                    value={profileData.emergencyRelation} 
                    field="emergencyRelation"
                    options={["Spouse", "Parent", "Child", "Sibling", "Friend", "Other"]}
                  />
                  <EditableField label="Phone Number" value={profileData.emergencyPhone} field="emergencyPhone" type="tel" />
                </div>
              </div>

              {/* Healthcare Preferences */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Healthcare Preferences</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditableField 
                    label="Preferred Consultation Type" 
                    value={profileData.preferredConsultationType} 
                    field="preferredConsultationType"
                    options={["Online", "In-person", "Hybrid"]}
                  />
                  <EditableField 
                    label="Preferred Language" 
                    value={profileData.preferredLanguage} 
                    field="preferredLanguage"
                    options={["Hindi", "English", "Bengali", "Tamil", "Telugu", "Other"]}
                  />
                  <EditableField label="Insurance Provider" value={profileData.insuranceProvider} field="insuranceProvider" />
                  <EditableField label="Policy Number" value={profileData.insurancePolicyNumber} field="insurancePolicyNumber" />
                </div>
              </div>
            </div>
          )}
          {/* Appointments Section */}
          {activeSection === 'appointments' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Upcoming Appointments Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span>Upcoming Appointments</span>
                    </h3>
                    
                    {/* Tomorrow's Appointment */}
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">Dr. Priya Sharma - Cardiologist</h4>
                          <p className="text-gray-600 mb-2">Regular Checkup & Blood Pressure Monitoring</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-600" />
                              <span className="font-medium">September 24, 2025 (Tomorrow)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span>10:30 AM - 11:00 AM</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-green-600" />
                              <span>Online Consultation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-600" />
                              <span>Video Call</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button 
                            onClick={() => navigate('/patient-call/main-room')}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                          >
                            Join Call
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Next Week's Appointment */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">Dr. Rajesh Gupta - Ophthalmologist</h4>
                          <p className="text-gray-600 mb-2">Eye Examination & Vision Test</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">October 1, 2025</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span>3:00 PM - 3:30 PM</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-blue-600" />
                              <span>In-person Visit</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span>Delhi Eye Care Center</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Past Appointments Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                      <span>Past Appointments</span>
                    </h3>
                    
                    {/* Last Week's Appointment */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">Dr. Amit Kumar - General Physician</h4>
                          <p className="text-gray-600 mb-2">Hypertension Follow-up & Medication Review</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">September 16, 2025</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>2:00 PM - 2:30 PM</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-gray-500" />
                              <span>In-person Visit</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            View Report
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Previous Month's Appointment */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">Dr. Meera Singh - Cardiologist</h4>
                          <p className="text-gray-600 mb-2">ECG Test & Cardiac Health Assessment</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">August 28, 2025</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>11:00 AM - 12:00 PM</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-gray-500" />
                              <span>Fortis Hospital, Delhi</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            View Report
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
                    onClick={() => {
                      navigate("/book-appointment");
                    }}
                  >
                    Book New Appointment with AI Assistant
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Medical Reports Section */}
          {activeSection === 'reports' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-blue-900">Blood Test Results</h3>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Latest</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-4">Complete Blood Count - Normal ranges</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-blue-600">15 Dec 2024</span>
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-green-900">ECG Report</h3>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Normal</span>
                    </div>
                    <p className="text-sm text-green-700 mb-4">Heart rhythm - Regular sinus rhythm</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-green-600">10 Dec 2024</span>
                      <button className="text-green-600 hover:text-green-800 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-orange-900">X-Ray Chest</h3>
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Clear</span>
                    </div>
                    <p className="text-sm text-orange-700 mb-4">Chest X-ray - No abnormalities detected</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-orange-600">5 Dec 2024</span>
                      <button className="text-orange-600 hover:text-orange-800 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-purple-900">Prescription</h3>
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-purple-700 mb-4">Hypertension medications - 30 days</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-purple-600">1 Dec 2024</span>
                      <button className="text-purple-600 hover:text-purple-800 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium flex items-center space-x-2 mx-auto">
                    <Upload className="w-4 h-4" />
                    <span>Upload New Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Prescriptions Section */}
          {activeSection === 'prescriptions' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Active Prescription */}
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-green-900 mb-1">Current Medications</h3>
                        <p className="text-sm text-green-700">Prescribed by Dr. Amit Kumar</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/80 p-4 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Amlodipine 5mg</p>
                          <p className="text-sm text-gray-600">Once daily, morning</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">15 days left</p>
                          <p className="text-xs text-gray-500">Refill due: 30 Dec</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between bg-white/80 p-4 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Vitamin D3</p>
                          <p className="text-sm text-gray-600">Weekly, 60,000 IU</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">8 weeks left</p>
                          <p className="text-xs text-gray-500">Next dose: 22 Dec</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Request Refill
                      </button>
                      <button className="bg-white text-green-600 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                  
                  {/* Previous Prescriptions */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Previous Prescription</h3>
                        <p className="text-sm text-gray-600">Prescribed by Dr. Priya Sharma</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">Completed</span>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 mb-1">Paracetamol 500mg</p>
                      <p className="text-sm text-gray-600">3 times daily for 5 days - Completed on 1 Dec 2024</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium flex items-center space-x-2 mx-auto">
                    <Calendar className="w-4 h-4" />
                    <span>Medication Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-blue-800">Appointment reminders</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-blue-800">Medication reminders</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-blue-800">Health tips and articles</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Privacy Settings */}
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="font-bold text-purple-900 mb-4">Privacy & Security</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left bg-white/80 p-4 rounded-lg hover:bg-white transition-colors flex items-center justify-between">
                        <span className="text-purple-800">Change Password</span>
                        <span className="text-purple-600">›</span>
                      </button>
                      <button className="w-full text-left bg-white/80 p-4 rounded-lg hover:bg-white transition-colors flex items-center justify-between">
                        <span className="text-purple-800">Two-Factor Authentication</span>
                        <span className="text-purple-600">›</span>
                      </button>
                      <button className="w-full text-left bg-white/80 p-4 rounded-lg hover:bg-white transition-colors flex items-center justify-between">
                        <span className="text-purple-800">Data Export</span>
                        <span className="text-purple-600">›</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* App Settings */}
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="font-bold text-green-900 mb-4">App Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-green-800 mb-2">Language</label>
                        <select className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-white">
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Bengali</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-800 mb-2">Theme</label>
                        <select className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-white">
                          <option>Light Mode</option>
                          <option>Dark Mode</option>
                          <option>System Default</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sign Out confirmation would typically be handled here */}
          {activeSection === 'signout' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LogOut className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Out</h2>
                <p className="text-gray-600 mb-8">Are you sure you want to sign out of your वैदSeva account?</p>
                <div className="flex space-x-4 justify-center">
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors font-medium" onClick={() => navigate("/")}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
