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
  Calendar,
  Clock,
  Badge,
  Award,
  Briefcase,
  Globe,
  Activity,
  UserCheck,
  Edit3,
  Save,
  Camera,
  Star,
  CheckCircle,
  AlertCircle,
  Settings,
  Lock,
  Eye,
  FileText,
  Bell,
  Stethoscope,
  BookOpen,
  Languages,
  MapPinIcon,
  PhoneCall,
  MessageSquare,
  Video,
  Home
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/ui/footer';


export default function NurseProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const navigate = useNavigate();
  // Sample nurse data
  const [nurseData, setNurseData] = useState({
    // Basic Info
    name: "Priya Patel",
    photo: "/api/placeholder/150/150",
    gender: "Female",
    dob: "1990-05-15",
    phone: "+91 98765 43210",
    email: "priya@gmail.com",
    location: "Mumbai, Maharashtra",
    
    // Professional Info
    nurseId: "VS-N-2024-1001",
    qualifications: "B.Sc Nursing, M.Sc Critical Care",
    specialization: "Critical Care & Emergency Nursing",
    experience: "8 years",
    languages: ["English", "Hindi", "Marathi"],
    certifications: ["ACLS", "BLS", "PALS", "Critical Care Certification"],
    
    // Work & Availability
    workplace: "Apollo Hospital, Mumbai",
    shift: "Day Shift (8:00 AM - 8:00 PM)",
    availability: "Monday - Friday",
    serviceMode: ["On-ground", "Virtual Consultation"],
    areasServed: ["Mumbai Central", "South Mumbai", "Bandra"],
    
    // System Details
    assignedPatients: 12,
    upcomingAppointments: 5,
    completedCases: 245,
    pendingReminders: 3,
    
    // Skills
    clinicalSkills: ["IV Therapy", "Wound Care", "Patient Monitoring", "Medication Administration", "Emergency Response"],
    communityHealthSkills: ["Health Education", "Vaccination", "Screening Programs", "Home Care"],
    softSkills: ["Communication", "Empathy", "Leadership", "Problem Solving", "Time Management"],
    
    // Emergency/Support
    emergencyContact: {
      name: "Dr. Rajesh Kumar",
      phone: "+91 98765 12345",
      relation: "Supervising Doctor"
    },
    reportingDoctor: "Dr. Sumitha Sharma",
    
    // Security
    loginId: "sarah.johnson",
    lastLogin: "2024-09-13 09:30 AM",
    accountStatus: "Active"
  });

    const [editedData, setEditedData] = useState(nurseData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save
      setNurseData(editedData);
    } else {
      // Enter edit mode with current data
      setEditedData(nurseData);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'professional', label: 'Professional', icon: Badge },
    { id: 'schedule', label: 'Schedule & Work', icon: Calendar },
    { id: 'patients', label: 'Patient Care', icon: Users },
    { id: 'skills', label: 'Skills & Certifications', icon: Award },
    { id: 'security', label: 'Security & Settings', icon: Lock }
  ];

  const StatCard = ({ title, value, icon: Icon, color = "red" }) => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-black text-${color}-600 mt-2`}>{value}</p>
        </div>
        <div className={`w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const SkillBadge = ({ skill, level = "expert" }) => {
    const levelColors = {
      expert: "from-red-500 to-red-600",
      intermediate: "from-orange-500 to-orange-600",
      beginner: "from-blue-500 to-blue-600"
    };
    
    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${levelColors[level]} text-white text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 m-1`}>
        <CheckCircle className="w-4 h-4 mr-2" />
        {skill}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
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
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              onClick={() => navigate("/")}>
                Dashboard
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
                  Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Header */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="nurse.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">{nurseData.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {nurseData.specialization}
                      </span>
                      <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                        {nurseData.accountStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Badge className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">ID: {nurseData.nurseId}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">{nurseData.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">{nurseData.experience} Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Assigned Patients" value={nurseData.assignedPatients} icon={Users} />
            <StatCard title="Upcoming Appointments" value={nurseData.upcomingAppointments} icon={Calendar} />
            <StatCard title="Completed Cases" value={nurseData.completedCases} icon={CheckCircle} />
            <StatCard title="Pending Reminders" value={nurseData.pendingReminders} icon={Bell} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 mb-8">
            <div className="flex flex-wrap border-b border-gray-200">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-6 py-4 font-semibold transition-all duration-300 ${
                    activeTab === id
                      ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Profile Overview</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Full Name:</span>
                        <span className="text-gray-800">{nurseData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Gender:</span>
                        <span className="text-gray-800">{nurseData.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Date of Birth:</span>
                        <span className="text-gray-800">{new Date(nurseData.dob).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Phone:</span>
                        <span className="text-gray-800">{nurseData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Email:</span>
                        <span className="text-gray-800">{nurseData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Location:</span>
                        <span className="text-gray-800">{nurseData.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Emergency */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Emergency Contact</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Contact Name:</span>
                        <span className="text-gray-800">{nurseData.emergencyContact.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Relation:</span>
                        <span className="text-gray-800">{nurseData.emergencyContact.relation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Phone:</span>
                        <span className="text-gray-800">{nurseData.emergencyContact.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Reporting Doctor:</span>
                        <span className="text-gray-800">{nurseData.reportingDoctor}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {nurseData.languages.map((language, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Tab */}
            {activeTab === 'professional' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Professional Details</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Qualifications</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Education:</span>
                        <span className="text-gray-800">{nurseData.qualifications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Specialization:</span>
                        <span className="text-gray-800">{nurseData.specialization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Experience:</span>
                        <span className="text-gray-800">{nurseData.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Workplace:</span>
                        <span className="text-gray-800">{nurseData.workplace}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {nurseData.certifications.map((cert, index) => (
                        <div key={index} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          <Award className="w-4 h-4 inline mr-2" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule & Work Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Work Schedule & Availability</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Work Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Shift:</span>
                        <span className="text-gray-800">{nurseData.shift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Availability:</span>
                        <span className="text-gray-800">{nurseData.availability}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-600">Service Modes:</span>
                        <div className="flex gap-2 mt-2">
                          {nurseData.serviceMode.map((mode, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {mode}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {nurseData.areasServed.map((area, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          <MapPinIcon className="w-4 h-4 inline mr-2" />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Patient Care Tab */}
            {activeTab === 'patients' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Patient Care Management</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">
                    <h4 className="font-bold text-blue-800 mb-4">Current Patients</h4>
                    <div className="text-3xl font-black text-blue-600 mb-2">{nurseData.assignedPatients}</div>
                    <p className="text-blue-700 text-sm">Active cases under care</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl">
                    <h4 className="font-bold text-green-800 mb-4">Completed Cases</h4>
                    <div className="text-3xl font-black text-green-600 mb-2">{nurseData.completedCases}</div>
                    <p className="text-green-700 text-sm">Successfully treated patients</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl">
                    <h4 className="font-bold text-orange-800 mb-4">Pending Tasks</h4>
                    <div className="text-3xl font-black text-orange-600 mb-2">{nurseData.pendingReminders}</div>
                    <p className="text-orange-700 text-sm">Reminders and follow-ups</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Recent Activities</h3>
                    <div className="space-y-3">
                      {[
                        { activity: "Patient checkup completed", time: "2 hours ago", type: "success" },
                        { activity: "Medication administered", time: "4 hours ago", type: "info" },
                        { activity: "Follow-up scheduled", time: "6 hours ago", type: "warning" },
                        { activity: "Case report submitted", time: "1 day ago", type: "success" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${
                            item.type === 'success' ? 'bg-green-500' :
                            item.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.activity}</p>
                            <p className="text-sm text-gray-600">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Upcoming Appointments</h3>
                    <div className="space-y-3">
                      {[
                        { patient: "Suresh Kishor", time: "11:30 AM", type: "Regular Checkup" },
                        { patient: "Sunaina Rajput", time: "2:00 PM", type: "Follow-up" },
                        { patient: "Raj Sharma", time: "4:30 PM", type: "Medication Review" }
                      ].map((appointment, index) => (
                        <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-800">{appointment.patient}</p>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-red-600">{appointment.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Skills & Competencies</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2 mb-4">Clinical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {nurseData.clinicalSkills.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} level="expert" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2 mb-4">Community Health Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {nurseData.communityHealthSkills.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} level="intermediate" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2 mb-4">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {nurseData.softSkills.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} level="expert" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-900 mb-8">Security & Account Settings</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Account Security */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Account Security</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Login ID:</span>
                        <span className="text-gray-800">{nurseData.loginId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Account Status:</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {nurseData.accountStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Last Login:</span>
                        <span className="text-gray-800">{nurseData.lastLogin}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
                        <Lock className="w-5 h-5 inline mr-2" />
                        Change Password
                      </button>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
                        <Shield className="w-5 h-5 inline mr-2" />
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  {/* Activity Logs */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-red-200 pb-2">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { action: "Profile updated", time: "Today, 2:30 PM", ip: "192.168.1.1" },
                        { action: "Password changed", time: "Yesterday, 9:15 AM", ip: "192.168.1.1" },
                        { action: "Login successful", time: "Today, 9:30 AM", ip: "192.168.1.1" },
                        { action: "Profile viewed", time: "2 days ago", ip: "192.168.1.1" }
                      ].map((log, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">{log.action}</p>
                              <p className="text-sm text-gray-600">{log.time}</p>
                            </div>
                            <span className="text-xs text-gray-500">{log.ip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Privacy & Data Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Profile Visibility</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Allow Contact from Patients</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Data Sharing for Research</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left">
              <MessageSquare className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Contact Supervisor</h3>
              <p className="text-green-100">Get in touch with your reporting doctor</p>
            </button>
            
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left">
              <Calendar className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Schedule Management</h3>
              <p className="text-purple-100">Manage your shifts and availability</p>
            </button>
            
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left">
              <FileText className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Generate Reports</h3>
              <p className="text-blue-100">Create patient care reports</p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}