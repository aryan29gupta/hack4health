import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Search,
  Filter,
  Clock,
  Phone,
  Video,
  Check,
  X,
  User,
  History,
  Bell,
  CalendarX,
  BookOpen,
  Pill,
  TestTube,
  AlertTriangle,
  FileText,
} from "lucide-react";

export default function AppointmentsSection() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  // Get logged in patient data from localStorage
  const loggedInPatientName = typeof window !== 'undefined' 
    ? localStorage.getItem("patientName") || "Suresh Kishor"
    : "Suresh Kishor";
  
  const selectedProblem = typeof window !== 'undefined'
    ? localStorage.getItem("selectedProblem") || "General Checkup"
    : "General Checkup";

  // Initialize appointments data
  useEffect(() => {
    const appointmentsData = [
      {
        id: 1,
        patientName: loggedInPatientName,
        patientInitials: loggedInPatientName.split(" ").map(n => n[0]).join(""),
        problem: "Respiratory Issues",
        time: "11:30 AM",
        duration: "30 mins",
        status: "in-progress",
        hasHistory: true,
        contact: "+91 98765 43210",
        email: "jatin.y@example.com",
        lastVisit: "Jan 15, 2025",
      },
      {
        id: 2,
        patientName: "Piyush Sharma",
        patientInitials: "PS",
        problem: "Annual Checkup",
        time: "2:00 PM",
        duration: "45 mins",
        status: "upcoming",
        hasHistory: true,
        contact: "+91 87654 32109",
        email: "piyush.s@example.com",
        lastVisit: "Dec 8, 2024",
      },
      {
        id: 3,
        patientName: "Raju Padhi",
        patientInitials: "KG",
        problem: "General Checkup",
        time: "11:00 AM",
        duration: "30 mins",
        status: "upcoming",
        hasHistory: true,
        contact: "+91 76543 21098",
        email: "raju.p@example.com",
        lastVisit: "Feb 1, 2025",
      },
      {
        id: 4,
        patientName: "Sonam Patel",
        patientInitials: "SP",
        problem: "Joint Pain",
        time: "12:00 PM",
        duration: "45 mins",
        status: "upcoming",
        hasHistory: true,
        contact: "+91 65432 10987",
        email: "sonam.p@example.com",
        lastVisit: "Jan 20, 2025",
      },
      {
        id: 5,
        patientName: "Rahul Verma",
        patientInitials: "RV",
        problem: "Fever & Cold",
        time: "10:30 AM",
        duration: "20 mins",
        status: "completed",
        hasHistory: false,
        contact: "+91 94321 09876",
        email: "rahul.v@example.com",
        lastVisit: "Feb 5, 2025",
      },
      {
        id: 6,
        patientName: "Neha Singh",
        patientInitials: "NS",
        problem: "Diabetes Checkup",
        time: "3:30 PM",
        duration: "30 mins",
        status: "upcoming",
        hasHistory: true,
        contact: "+91 83210 98765",
        email: "neha.s@example.com",
        lastVisit: "Jan 28, 2025",
      },
    ];

    setAppointments(appointmentsData);
    setFilteredAppointments(appointmentsData);
  }, [loggedInPatientName, selectedProblem]);

  // Patient histories data
  const patientHistories = {
    1: {
      past: "Patient has a history of eczema since childhood. Last flare-up was 3 months ago. Previously prescribed topical corticosteroids. Known allergies to certain fabrics.",
      previous: `- Jan 15, 2025: Treated for mild skin irritation\n- Nov 10, 2024: Annual physical examination\n- Sep 5, 2024: Skin biopsy (results negative for malignancy)`,
      medications: `- Triamcinolone 0.1% cream (as needed)\n- Cetirizine 10mg daily\n- Multivitamin supplement`,
      allergies: `- Wool\n- Nickel\n- Sulfites\n- Penicillin (moderate reaction)`,
      lab: `- Complete Blood Count (Feb 10, 2025): Within normal ranges\n- Allergy Panel (Dec 5, 2024): Positive for dust mites, pollen`,
    },
    2: {
      past: "Patient has controlled hypertension for 5 years. Family history of cardiovascular disease. Underwent appendectomy in 2020.",
      previous: `- Dec 8, 2025: Blood pressure check\n- Aug 22, 2024: Flu vaccination\n- May 15, 2024: Annual physical examination`,
      medications: `- Lisinopril 10mg daily\n- Aspirin 81mg daily`,
      allergies: "No known allergies",
      lab: `- Lipid Panel (Jan 5, 2025): Slightly elevated LDL\n- Blood Pressure: 135/85 mmHg (Feb 10, 2025)`,
    },
    3: {
      past: "History of asthma since age 12. Occasional bronchitis during winter months. Non-smoker.",
      previous: `- Feb 1, 2025: Bronchitis treatment\n- Nov 30, 2024: Pulmonary function test\n- Sep 15, 2024: Flu vaccination`,
      medications: `- Albuterol inhaler (as needed)\n- Fluticasone inhaler (twice daily)\n- Singulair 10mg (nightly)`,
      allergies: `- Pollen\n- Dust\n- Pet dander\n- Sulfa drugs`,
      lab: `- Chest X-ray (Feb 2, 2025): Normal\n- Pulmonary Function Test (Nov 30, 2024): Mild obstruction`,
    },
    4: {
      past: "Diagnosed with rheumatoid arthritis in 2022. Maternal history of osteoporosis. Fractured left wrist in 2019.",
      previous: `- Jan 20, 2025: Joint pain follow-up\n- Nov 10, 2024: Physical therapy evaluation\n- Jul 5, 2024: Rheumatology consultation`,
      medications: `- Methotrexate 15mg weekly\n- Folic acid 1mg daily\n- Ibuprofen 400mg (as needed for pain)`,
      allergies: `- Shellfish\n- NSAIDs (except ibuprofen)`,
      lab: `- Rheumatoid Factor (Dec 15, 2024): Positive\n- CRP (Dec 15, 2024): Elevated (15 mg/L)\n- Vitamin D: Slightly low (28 ng/mL)`,
    },
    6: {
      past: "Type 2 diabetes diagnosed in 2021. Currently managing with diet and medication. No hospitalizations related to diabetes.",
      previous: `- Dec 12, 2024: HbA1c check (6.8%)\n- Sep 5, 2024: Foot examination\n- Jun 20, 2024: Ophthalmology consult`,
      medications: `- Metformin 500mg twice daily\n- Atorvastatin 10mg nightly`,
      allergies: "None reported",
      lab: `- HbA1c (Dec 12, 2024): 6.8%\n- Fasting Glucose (Jan 15, 2025): 128 mg/dL\n- Lipid Panel (Jan 15, 2025): Within normal limits`,
    },
  };

  // Filter appointments based on search and status
  useEffect(() => {
    let filtered = appointments;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.contact.includes(searchTerm)
      );
    }

    // Apply status filter
    if (currentFilter !== 'all') {
      if (currentFilter === 'upcoming') {
        filtered = filtered.filter(a => a.status === 'upcoming' || a.status === 'in-progress');
      } else {
        filtered = filtered.filter(a => a.status === currentFilter);
      }
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, currentFilter, appointments]);

  const formatStatus = (status) => {
    const statusMap = {
      upcoming: "Upcoming",
      "in-progress": "In Progress",
      completed: "Completed",
      canceled: "Canceled",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      upcoming: "bg-blue-100 text-blue-700",
      "in-progress": "bg-yellow-100 text-yellow-700",
      completed: "bg-green-100 text-green-700",
      canceled: "bg-red-100 text-red-700",
    };
    return colorMap[status] || "bg-gray-100 text-gray-700";
  };

  const displayToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const viewHistory = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    setSelectedAppointment(appointment);
    setShowHistoryModal(true);
  };

  const startCall = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem("currentAppointment", JSON.stringify(appointment));
      navigate(`/doctor-call/${appointmentId}`);
    }
  };

  const completeAppointment = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    const notes = prompt(`Enter notes for ${appointment.patientName}'s appointment:`);

    if (notes !== null) {
      const updatedAppointments = appointments.map(a =>
        a.id === appointmentId
          ? { ...a, status: "completed", notes }
          : a
      );
      setAppointments(updatedAppointments);
      displayToast(`Appointment with ${appointment.patientName} marked as complete`, 'success');
    }
  };

  const cancelAppointment = () => {
    if (!selectedAppointment) return;

    const reason = prompt(`Reason for canceling ${selectedAppointment.patientName}'s appointment:`);

    if (reason) {
      const updatedAppointments = appointments.map(a =>
        a.id === selectedAppointment.id
          ? { ...a, status: "canceled", cancelReason: reason }
          : a
      );
      setAppointments(updatedAppointments);
      setShowHistoryModal(false);
      displayToast(`Appointment with ${selectedAppointment.patientName} has been canceled`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Appointments</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          
          <button
            onClick={() => setCurrentFilter(currentFilter === 'all' ? 'upcoming' : 'all')}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              {currentFilter === 'all' ? 'All' : 'Upcoming'}
            </span>
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {filteredAppointments.length}
            </div>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No appointments scheduled</h3>
            <p className="text-gray-600">All clear for today! Check back later for new appointments.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {appointment.patientInitials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{appointment.patientName}</div>
                          <div className="text-sm text-gray-500">{appointment.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg">
                        {appointment.problem}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-700 font-medium">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{appointment.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {formatStatus(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {appointment.hasHistory && (
                          <button
                            onClick={() => viewHistory(appointment.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                          >
                            <History className="w-4 h-4" />
                            <span>History</span>
                          </button>
                        )}
                        
                        {appointment.status === "in-progress" && (
                          <button
                            onClick={() => startCall(appointment.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                          >
                            <Video className="w-4 h-4" />
                            <span>Call</span>
                          </button>
                        )}
                        
                        {appointment.status === "upcoming" && (
                          <button
                            onClick={() => completeAppointment(appointment.id)}
                            className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                          >
                            <Check className="w-4 h-4" />
                            <span>Complete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Patient History Modal */}
      {showHistoryModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedAppointment.patientName}'s Medical History
                </h3>
                <p className="text-gray-600 mt-1">
                  Appointment: {selectedAppointment.time} | {selectedAppointment.problem}
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              {patientHistories[selectedAppointment.id] && (
                <>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Past Medical History</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {patientHistories[selectedAppointment.id].past}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Previous Visits</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {patientHistories[selectedAppointment.id].previous}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Pill className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">Current Medications</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {patientHistories[selectedAppointment.id].medications}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-900">Allergies</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {patientHistories[selectedAppointment.id].allergies}
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <TestTube className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-900">Lab Results</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {patientHistories[selectedAppointment.id].lab}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-100">
              <button
                onClick={() => completeAppointment(selectedAppointment.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                <Check className="w-4 h-4" />
                <span>Mark Complete</span>
              </button>
              <button
                onClick={cancelAppointment}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                <X className="w-4 h-4" />
                <span>Cancel Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-full">
          <div className={`px-6 py-4 rounded-xl shadow-lg text-white font-medium ${
            toastType === 'error' ? 'bg-red-600' : 'bg-blue-600'
          }`}>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}