import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./app/page";
import DoctorLoginPage from "./app/DoctorLogin";
import PatientLoginPage from "./app/PatientLogin";
import NurseLoginPage from "./app/NurseLogin";
import NGOLoginPage from "./app/NGOLogin";
import DoctorProfileDashboard from "./app/DoctorProfile";
import VedsevaPatientProfile from "./app/PatientProfile";
import NurseProfile from "./app/NurseProfile";
import NGODashboard from "./app/NGOProfile";
import BookAppointmentPage from "./app/BookAppointment";
import PatientSignupPage from "./app/PatientSignup";
import DoctorVideoCall from './webrtc/DoctorVideoCall';
import PatientVideoCall from './webrtc/PatientVideoCall';
import PrescriptionPage from "./app/PrescriptionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/doctor-login" element={<DoctorLoginPage />} />
        <Route path="/patient-login" element={<PatientLoginPage />} />
        <Route path="/nurse-login" element={<NurseLoginPage />} />
        <Route path="/ngo-login" element={<NGOLoginPage />} />
        <Route path="/doctor-profile" element={<DoctorProfileDashboard />} />
        <Route path="/patient-profile" element={<VedsevaPatientProfile />} />
        <Route path="/nurse-profile" element={<NurseProfile />} />
        <Route path="/NGO-profile" element={<NGODashboard />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/patient-signup" element={<PatientSignupPage />} />
        
        {/* WebRTC Video Call Routes */}
        <Route path="/doctor-call/:appointmentId?" element={<DoctorVideoCall />} />
        <Route path="/patient-call/:appointmentId?" element={<PatientVideoCall />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
