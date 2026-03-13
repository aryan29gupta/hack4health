import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Footer from "../components/ui/footer";
import AppointmentsSection from "./DoctorAppointment";
import { useNavigate } from "react-router-dom";

export default function DoctorProfileDashboard() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState({});
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(() => {
    const storedData = localStorage.getItem("doctorData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        return {
          profilePhoto: null,
          fullName: parsedData.fullName || parsedData.name || "Dr. Unknown",
          specialization: parsedData.specialization || "General Medicine",
          isVerified:
            parsedData.isVerified !== undefined ? parsedData.isVerified : true,

          gender: parsedData.gender || "Male",
          contactNumber: parsedData.contactNumber || "xxxxxxxxxx",
          email: parsedData.email || "patient@gmail.com",
          city: parsedData.city || "",

          // Professional Information
          education: parsedData.education || "MBBS",
          specializations: parsedData.specializations || [
            parsedData.specialization || "General Medicine",
          ],
          experience: parsedData.experience || "2",
          affiliation: parsedData.affiliation || "",

          // Practice Settings
          consultationType: parsedData.consultationType || "Hybrid",
          availability: {
            monday: { start: "09:00", end: "17:00", available: true },
            tuesday: { start: "09:00", end: "17:00", available: true },
            wednesday: { start: "09:00", end: "17:00", available: true },
            thursday: { start: "09:00", end: "17:00", available: true },
            friday: { start: "09:00", end: "17:00", available: true },
            saturday: { start: "09:00", end: "13:00", available: true },
            sunday: { start: "", end: "", available: false },
          },

          // About Me
          bio:
            parsedData.bio ||
            "Experienced healthcare professional dedicated to providing quality medical care.",
        };
      } catch (error) {
        console.error("Error parsing stored doctor data:", error);
      }
    }

    // Fallback default data if no stored data
    return {
      // Header Card
      profilePhoto: null,
      fullName: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      isVerified: true,

      // Personal Information
      gender: "Male",
      contactNumber: "+91 98765 43210",
      email: "rajesh@gmail.com",
      city: "New Delhi",

      // Professional Information
      education: "MBBS, MD (Cardiology)",
      specializations: ["Cardiology", "Interventional Cardiology"],
      experience: "12",
      affiliation: "AIIMS New Delhi",

      // Practice Settings
      consultationType: "Hybrid",
      availability: {
        monday: { start: "09:00", end: "17:00", available: true },
        tuesday: { start: "09:00", end: "17:00", available: true },
        wednesday: { start: "09:00", end: "17:00", available: true },
        thursday: { start: "09:00", end: "17:00", available: true },
        friday: { start: "09:00", end: "17:00", available: true },
        saturday: { start: "09:00", end: "13:00", available: true },
        sunday: { start: "", end: "", available: false },
      },

      // About Me
      bio: "Experienced cardiologist with over 12 years of practice in interventional cardiology. Specialized in complex cardiac procedures and preventive cardiology. Committed to providing comprehensive cardiac care using the latest medical technologies and evidence-based treatments.",
    };
  });

  // Load doctor data when component mounts
  useEffect(() => {
    const loadDoctorData = () => {
      const storedData = localStorage.getItem("doctorData");

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);

          setProfileData((prevData) => ({
            ...prevData,
            fullName:
              parsedData.fullName || parsedData.name || prevData.fullName,
            email: parsedData.email || prevData.email,
            contactNumber: parsedData.contactNumber || prevData.contactNumber,
            specialization:
              parsedData.specialization || prevData.specialization,
            city: parsedData.city || prevData.city,
            gender: parsedData.gender || prevData.gender,
            experience: parsedData.experience || prevData.experience,
            education: parsedData.education || prevData.education,
            affiliation: parsedData.affiliation || prevData.affiliation,
            consultationType:
              parsedData.consultationType || prevData.consultationType,
            bio: parsedData.bio || prevData.bio,
            isVerified:
              parsedData.isVerified !== undefined
                ? parsedData.isVerified
                : prevData.isVerified,
            specializations: parsedData.specializations || [
              parsedData.specialization || prevData.specialization,
            ],
          }));
        } catch (error) {
          console.error("Error loading doctor data:", error);
        }
      }
    };

    loadDoctorData();
  }, []);

  // Save profile data to localStorage when updated
  const saveProfileData = (updatedData) => {
    try {
      const currentData = JSON.parse(
        localStorage.getItem("doctorData") || "{}"
      );
      const mergedData = { ...currentData, ...updatedData };
      localStorage.setItem("doctorData", JSON.stringify(mergedData));
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  

  const toggleEdit = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field, value) => {
    const updatedData = { [field]: value };
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    saveProfileData(updatedData);
  };

  const handleSpecializationChange = (index, value) => {
    const newSpecs = [...profileData.specializations];
    newSpecs[index] = value;
    const updatedData = { specializations: newSpecs };
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    saveProfileData(updatedData);
  };

  const addSpecialization = () => {
    const newSpecs = [...profileData.specializations, ""];
    const updatedData = { specializations: newSpecs };
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    saveProfileData(updatedData);
  };

  const removeSpecialization = (index) => {
    const newSpecs = profileData.specializations.filter((_, i) => i !== index);
    const updatedData = { specializations: newSpecs };
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    saveProfileData(updatedData);
  };

  const handleAvailabilityChange = (day, field, value) => {
    const updatedAvailability = {
      ...profileData.availability,
      [day]: { ...profileData.availability[day], [field]: value },
    };
    const updatedData = { availability: updatedAvailability };
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    saveProfileData(updatedData);
  };

  const sidebarItems = [
    { id: "profile", icon: User, label: "Profile", active: true },
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "experience", icon: BookOpen, label: "Experience" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "signout", icon: LogOut, label: "Sign Out" },
  ];

  const EditableField = ({
    label,
    value,
    field,
    type = "text",
    multiline = false,
  }) => {
    const isEditing = editMode[field];

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">{label}</label>
          <button
            onClick={() => toggleEdit(field)}
            className="text-blue-500 hover:text-blue-600 transition-colors p-1"
          >
            {isEditing ? (
              <Save className="w-4 h-4" />
            ) : (
              <Edit3 className="w-4 h-4" />
            )}
          </button>
        </div>
        {isEditing ? (
          multiline ? (
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
          <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
            {value || "Not specified"}
          </div>
        )}
      </div>
    );
  };

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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {profileData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {profileData.fullName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-100 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
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
          {activeSection === "profile" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Profile Photo */}
                  <div className="relative group">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                      {profileData.profilePhoto ? (
                        <img
                          src={profileData.profilePhoto}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        profileData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      )}
                    </div>
                    <button className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                      <h1 className="text-3xl font-black text-gray-900">
                        {profileData.fullName}
                      </h1>
                      {profileData.isVerified && (
                        <div className="bg-green-100 p-1 rounded-full">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-xl text-blue-600 font-semibold mb-4">
                      {profileData.specialization}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          2 Years Experience
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                        <Star className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">
                          4.9 Rating
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          500+ Patients
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditableField
                    label="Full Name"
                    value={profileData.fullName}
                    field="fullName"
                  />
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Gender
                      </label>
                      <button
                        onClick={() => toggleEdit("gender")}
                        className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                      >
                        {editMode.gender ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {editMode.gender ? (
                      <select
                        value={profileData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {profileData.gender}
                      </div>
                    )}
                  </div>
                  <EditableField
                    label="Contact Number"
                    value={profileData.contactNumber}
                    field="contactNumber"
                    type="tel"
                  />
                  <EditableField
                    label="Email"
                    value={profileData.email}
                    field="email"
                    type="email"
                  />
                  <EditableField
                    label="City"
                    value={profileData.city}
                    field="city"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Professional Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <EditableField
                    label="Educational Qualifications"
                    value={profileData.education}
                    field="education"
                  />

                  {/* Specializations */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Specializations
                      </label>
                      <div className="flex space-x-2">
                        <button
                          onClick={addSpecialization}
                          className="text-green-500 hover:text-green-600 transition-colors p-1"
                        >
                          <span className="text-lg">+</span>
                        </button>
                        <button
                          onClick={() => toggleEdit("specializations")}
                          className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                        >
                          {editMode.specializations ? (
                            <Save className="w-4 h-4" />
                          ) : (
                            <Edit3 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {profileData.specializations.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          {editMode.specializations ? (
                            <>
                              <input
                                type="text"
                                value={spec}
                                onChange={(e) =>
                                  handleSpecializationChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                className="flex-1 p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              />
                              <button
                                onClick={() => removeSpecialization(index)}
                                className="text-red-500 hover:text-red-600 transition-colors p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <div className="flex-1 p-3 bg-gray-50 rounded-lg text-gray-800">
                              {spec}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EditableField
                      label="Years of Experience"
                      value={profileData.experience}
                      field="experience"
                      type="number"
                    />
                    <EditableField
                      label="Current Hospital/Clinic"
                      value={profileData.affiliation}
                      field="affiliation"
                    />
                  </div>
                </div>
              </div>

              {/* Practice Settings */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Practice Settings
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Consultation Type */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Consultation Type
                        </label>
                        <button
                          onClick={() => toggleEdit("consultationType")}
                          className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                        >
                          {editMode.consultationType ? (
                            <Save className="w-4 h-4" />
                          ) : (
                            <Edit3 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {editMode.consultationType ? (
                        <select
                          value={profileData.consultationType}
                          onChange={(e) =>
                            handleInputChange(
                              "consultationType",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        >
                          <option value="Online">Online Only</option>
                          <option value="In-person">In-person Only</option>
                          <option value="Hybrid">
                            Both Online & In-person
                          </option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                          {profileData.consultationType}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-gray-700">
                        Weekly Availability
                      </label>
                      <button
                        onClick={() => toggleEdit("availability")}
                        className="text-blue-500 hover:text-blue-600 transition-colors p-1"
                      >
                        {editMode.availability ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(profileData.availability).map(
                        ([day, settings]) => (
                          <div
                            key={day}
                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="w-24 capitalize font-medium text-gray-700">
                              {day}
                            </div>

                            {editMode.availability ? (
                              <>
                                <input
                                  type="checkbox"
                                  checked={settings.available}
                                  onChange={(e) =>
                                    handleAvailabilityChange(
                                      day,
                                      "available",
                                      e.target.checked
                                    )
                                  }
                                  className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                {settings.available && (
                                  <>
                                    <input
                                      type="time"
                                      value={settings.start}
                                      onChange={(e) =>
                                        handleAvailabilityChange(
                                          day,
                                          "start",
                                          e.target.value
                                        )
                                      }
                                      className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                    <span>to</span>
                                    <input
                                      type="time"
                                      value={settings.end}
                                      onChange={(e) =>
                                        handleAvailabilityChange(
                                          day,
                                          "end",
                                          e.target.value
                                        )
                                      }
                                      className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="flex items-center space-x-2">
                                {settings.available ? (
                                  <>
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-700">
                                      {settings.start} - {settings.end}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <X className="w-5 h-5 text-red-500" />
                                    <span className="text-gray-500">
                                      Unavailable
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Me */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                </div>

                <EditableField
                  label="Professional Bio"
                  value={profileData.bio}
                  field="bio"
                  multiline={true}
                />
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Work Experience */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Current Position */}
                  <div className="relative pl-8 border-l-4 border-blue-500">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">Senior Cardiologist</h3>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Current</span>
                      </div>
                      <p className="text-lg font-semibold text-purple-600 mb-2">AIIMS New Delhi</p>
                      <p className="text-sm text-gray-600 mb-4">2018 - Present (7 years)</p>
                      <p className="text-gray-700">
                        Leading the cardiology department with focus on interventional procedures. 
                        Performing complex cardiac surgeries including angioplasty, stenting, and valve replacements. 
                        Mentoring junior doctors and medical students.
                      </p>
                    </div>
                  </div>

                  {/* Previous Positions */}
                  <div className="relative pl-8 border-l-4 border-gray-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Assistant Professor of Cardiology</h3>
                      <p className="text-lg font-semibold text-gray-700 mb-2">Safdarjung Hospital</p>
                      <p className="text-sm text-gray-600 mb-4">2015 - 2018 (3 years)</p>
                      <p className="text-gray-700">
                        Conducted cardiac procedures and supervised medical residents. 
                        Contributed to research in preventive cardiology and published multiple papers.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l-4 border-gray-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Junior Resident</h3>
                      <p className="text-lg font-semibold text-gray-700 mb-2">PGIMER Chandigarh</p>
                      <p className="text-sm text-gray-600 mb-4">2012 - 2015 (3 years)</p>
                      <p className="text-gray-700">
                        Completed residency training in Internal Medicine with specialization in Cardiology. 
                        Gained extensive experience in emergency cardiac care and critical care management.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements & Awards */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Achievements & Awards</h2>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Excellence in Cardiology</h3>
                        <p className="text-sm text-gray-600">Indian Medical Association - 2023</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Recognized for outstanding contribution to interventional cardiology and patient care.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Best Research Paper</h3>
                        <p className="text-sm text-gray-600">Cardiology Society of India - 2022</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Minimally Invasive Cardiac Interventions in Elderly Patients" - Published in Indian Heart Journal.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Patient Care Excellence</h3>
                        <p className="text-sm text-gray-600">AIIMS New Delhi - 2021</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Awarded for exceptional patient satisfaction scores and compassionate care delivery.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">International Recognition</h3>
                        <p className="text-sm text-gray-600">American College of Cardiology - 2020</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Fellowship recognition for advanced training in interventional cardiology techniques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Certifications & Licenses</h2>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Medical License</h3>
                    <p className="text-sm text-gray-600 mb-2">Delhi Medical Council</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Valid till 2026</span>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Board Certification</h3>
                    <p className="text-sm text-gray-600 mb-2">Interventional Cardiology</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Certified 2018</span>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">BLS Certification</h3>
                    <p className="text-sm text-gray-600 mb-2">American Heart Association</p>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Renewed 2024</span>
                  </div>
                </div>
              </div>

              {/* Publications & Research */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Publications & Research</h2>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
                    <h3 className="font-bold text-gray-900 mb-2">
                      "Advanced Techniques in Percutaneous Coronary Intervention"
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Indian Heart Journal • Vol 75, Issue 3 • March 2023
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      A comprehensive study on minimally invasive cardiac procedures and their outcomes in Indian population. 
                      The research involved 500+ patients over 2 years.
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Peer Reviewed</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">35 Citations</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="font-bold text-gray-900 mb-2">
                      "Cardiac Rehabilitation in Post-Operative Patients"
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Journal of Cardiovascular Medicine • Vol 22, Issue 8 • August 2022
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      Research on the effectiveness of structured rehabilitation programs in improving quality of life 
                      and reducing readmission rates in cardiac patients.
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Peer Reviewed</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">28 Citations</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-bold text-gray-900 mb-2">
                      "Telemedicine in Cardiology: Post-Pandemic Perspectives"
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Indian Medical Gazette • Vol 156, Issue 12 • December 2021
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      Analysis of telemedicine adoption in cardiac care during COVID-19 and its future implications 
                      for patient management and follow-up care.
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Peer Reviewed</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">42 Citations</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                    View All Publications (12)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Account Settings */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                </div>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Update Password
                    </button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Disabled</span>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-10 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors hover:bg-gray-400">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Appointment Reminders",
                      description: "Get notified about upcoming appointments",
                      enabled: true,
                      color: "blue"
                    },
                    {
                      title: "New Patient Bookings",
                      description: "Receive alerts for new appointment requests",
                      enabled: true,
                      color: "green"
                    },
                    {
                      title: "Patient Messages",
                      description: "Notifications for patient inquiries and messages",
                      enabled: true,
                      color: "purple"
                    },
                    {
                      title: "Schedule Changes",
                      description: "Updates about appointment cancellations or reschedules",
                      enabled: false,
                      color: "orange"
                    },
                    {
                      title: "Marketing Updates",
                      description: "Promotional content and platform updates",
                      enabled: false,
                      color: "pink"
                    }
                  ].map((notification, index) => (
                    <div key={index} className={`bg-gradient-to-r from-${notification.color}-50 to-${notification.color}-100 p-4 rounded-xl border border-${notification.color}-200`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{notification.enabled ? 'Enabled' : 'Disabled'}</span>
                          <div className="relative">
                            <input type="checkbox" className="sr-only" defaultChecked={notification.enabled} />
                            <div className={`w-10 h-6 rounded-full cursor-pointer transition-colors ${
                              notification.enabled ? `bg-${notification.color}-500` : 'bg-gray-300'
                            }`}>
                              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-y-1 ${
                                notification.enabled ? 'translate-x-5' : 'translate-x-1'
                              }`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Privacy & Visibility</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="visibility" className="text-purple-600 focus:ring-purple-500" defaultChecked />
                        <div>
                          <span className="font-medium text-gray-900">Public Profile</span>
                          <p className="text-sm text-gray-600">Your profile is visible to all users on the platform</p>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="visibility" className="text-purple-600 focus:ring-purple-500" />
                        <div>
                          <span className="font-medium text-gray-900">Limited Visibility</span>
                          <p className="text-sm text-gray-600">Only show basic information to new patients</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Data Sharing</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">Share anonymized data for research</span>
                          <p className="text-sm text-gray-600">Help improve healthcare through anonymous data contributions</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" defaultChecked />
                          <div className="w-10 h-6 bg-indigo-500 rounded-full cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-5 translate-y-1"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">Platform analytics</span>
                          <p className="text-sm text-gray-600">Allow वैदSeva to analyze usage patterns to improve services</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" className="sr-only" />
                          <div className="w-10 h-6 bg-gray-300 rounded-full cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform translate-x-1 translate-y-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Settings */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Consultation Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Consultation Duration</label>
                        <select className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200">
                          <option>15 minutes</option>
                          <option selected>30 minutes</option>
                          <option>45 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Buffer Time Between Appointments</label>
                        <select className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200">
                          <option>5 minutes</option>
                          <option selected>10 minutes</option>
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Consultation Fees</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Online Consultation Fee</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="500"
                            defaultValue="500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">In-Person Consultation Fee</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            placeholder="800"
                            defaultValue="800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Preferences */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">App Preferences</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Language</h4>
                    <select className="w-full p-2 border border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
                      <option>English</option>
                      <option>हिंदी</option>
                      <option>বাংলা</option>
                      <option>தமிழ்</option>
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Theme</h4>
                    <select className="w-full p-2 border border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                      <option>Light Mode</option>
                      <option>Dark Mode</option>
                      <option>Auto</option>
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Time Zone</h4>
                    <select className="w-full p-2 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                      <option>IST (GMT+5:30)</option>
                      <option>EST (GMT-5:00)</option>
                      <option>PST (GMT-8:00)</option>
                      <option>GMT (GMT+0:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-red-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-900">Danger Zone</h2>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Delete Account</h3>
                  <p className="text-red-700 mb-4">
                    Permanently delete your वैदSeva account and all associated data. This action cannot be undone.
                  </p>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Save Settings */}
              <div className="sticky bottom-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Changes are saved automatically
                  </p>
                  <div className="flex space-x-3">
                    <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                      Reset to Defaults
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                      Save All Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections */}
          {activeSection !== "profile" &&
            activeSection !== "appointments" &&
            activeSection !== "experience" &&
            activeSection !== "signout" && 
            activeSection !== "settings" &&(
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                    {activeSection}
                  </h2>
                  <p className="text-gray-600">
                    This section is under development.
                  </p>
                </div>
              </div>
            )}

          {/* Appointments Section */}
          {activeSection === "appointments" && <AppointmentsSection />}

          {/* Sign Out confirmation would typically be handled here */}
          {activeSection === "signout" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <LogOut className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sign Out
                </h2>
                <p className="text-gray-600 mb-8">
                  Are you sure you want to sign out of your वैदSeva account?
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => setActiveSection("profile")}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors font-medium"
                    onClick={() => navigate("/")}
                  >
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
