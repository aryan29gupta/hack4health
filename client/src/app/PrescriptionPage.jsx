import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase config (matches original HTML)
const firebaseConfig = {
  apiKey: "AIzaSyDzN2L_4dLV6D2tE4OCpjhqY9YATnF4PUU",
  authDomain: "prescription-6d10f.firebaseapp.com",
  projectId: "prescription-6d10f",
  storageBucket: "prescription-6d10f.firebasestorage.app",
  messagingSenderId: "289983682642",
  appId: "1:289983682642:web:ca5c3964c5a84b9954a78b",
  measurementId: "G-LK5GC3DFLM",
};

export default function PrescriptionPage() {
  const navigate = useNavigate();
  const [db, setDb] = useState(null);
  const [patientBasic, setPatientBasic] = useState("Loading...");
  const [patientMedical, setPatientMedical] = useState("Blood Group: -- | Gender: -- | Weight: -- kg");
  const [dateStr, setDateStr] = useState("");
  const [remarks, setRemarks] = useState("No remarks provided.");
  const [medicines, setMedicines] = useState([]);
  const [tests, setTests] = useState([]);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  useEffect(() => {
    // 1. Initialize Date
    const currentDate = new Date();
    setDateStr(`Date: ${currentDate.toLocaleDateString()}`);

    // 2. Load data from LocalStorage
    loadData();

    // 3. Dynamic Firebase SDK Loading
    const loadFirebase = async () => {
      try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js");
        
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        setDb(firestore);
        setIsFirebaseLoaded(true);
      } catch (err) {
        console.error("Failed to load Firebase from CDN:", err);
      }
    };
    loadFirebase();
  }, []);

  const loadData = () => {
    // User Data
    try {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        let name = userData.name || userData.fullName || "Unknown";
        name = name.replace(/\d+$/, "").trim();
        setPatientBasic(`Name: ${name} | Age: ${userData.age || "--"} | Height: ${userData.height || "--"} cm`);

        let bloodGroup = userData.bloodGroup || userData.blood || "--";
        setPatientMedical(`Blood Group: ${bloodGroup} | Gender: ${userData.gender || "--"} | Weight: ${userData.weight || "--"} kg`);
      } else {
        setPatientBasic("Name: Rajesh Kumar | Age: 20 | Height: 163");
        setPatientMedical("Blood Group: B+ | Gender: Male | Weight: 80");
      }
    } catch (e) {
      console.error("Error loading user data:", e);
    }

    // Remarks
    setRemarks(localStorage.getItem("patientRemarks") || "No remarks provided.");

    // Medicines
    try {
      const medsString = localStorage.getItem("prescribedMedicines");
      if (medsString) setMedicines(JSON.parse(medsString));
    } catch (e) {
      console.error("Error loading medicines:", e);
    }

    // Tests
    try {
      const testsString = localStorage.getItem("prescribedTests");
      if (testsString) setTests(JSON.parse(testsString));
    } catch (e) {
      console.error("Error loading tests:", e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToCloud = async () => {
    if (!isFirebaseLoaded || !db) {
      alert("Firebase is still loading. Please try again in a few seconds.");
      return;
    }

    try {
      const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js");
      
      const prescriptionData = {
        patientInfo: {
          basic: patientBasic,
          medical: patientMedical,
        },
        remarks: remarks,
        tests: tests.length > 0 ? tests : ["No tests required"],
        medicines: medicines.length > 0 ? medicines.map(m => `${m.name} (${m.quantity || "As directed"}, ${m.duration || "As needed"})`) : ["No medicines prescribed"],
        date: new Date().toISOString(),
        doctor: "Dr. Mohit Chopra",
      };

      await addDoc(collection(db, "prescriptions"), prescriptionData);
      alert("Prescription successfully saved to cloud!");
    } catch (error) {
      console.error("Error saving to cloud:", error);
      alert("Failed to save to cloud. Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0fe] py-10 px-4 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] w-full max-w-[600px] relative print:shadow-none print:w-full">
        
        {/* Header */}
        <div className="text-center text-[18px] font-bold border-b border-[#ddd] pb-4 mb-4">
          Dr. MOHIT CHOPRA, MD<br />
          17/10 Old Rajendra Nagar-110060<br />
          Phone no: +91-XXXXXXXXXX
        </div>

        {/* Patient Information */}
        <div className="mt-4">
          <h3 className="text-[16px] font-bold m-0 border-l-4 border-blue-500 pl-2">Patient Information</h3>
          <div className="bg-[#f8f9fa] p-3 rounded-md mt-2 space-y-1 text-[14px]">
            <div>{patientBasic}</div>
            <div>{patientMedical}</div>
            <div>{dateStr}</div>
          </div>
        </div>

        {/* Remarks */}
        <div className="mt-4">
          <h3 className="text-[16px] font-bold m-0 border-l-4 border-blue-500 pl-2">Remarks</h3>
          <div className="bg-[#f8f9fa] p-3 rounded-md mt-2 text-[14px]">
            {remarks}
          </div>
        </div>

        {/* Test Required */}
        <div className="mt-4">
          <h3 className="text-[16px] font-bold m-0 border-l-4 border-blue-500 pl-2">Test Required</h3>
          <div className="bg-[#f8f9fa] p-3 rounded-md mt-2 text-[14px]">
            <ul className="list-disc list-inside">
              {tests.length > 0 ? (
                tests.map((test, idx) => <li key={idx}>{test}</li>)
              ) : (
                <li>No tests required</li>
              )}
            </ul>
          </div>
        </div>

        {/* Medicine Required */}
        <div className="mt-4">
          <h3 className="text-[16px] font-bold m-0 border-l-4 border-blue-500 pl-2">Medicine Required</h3>
          <div className="bg-[#f8f9fa] p-3 rounded-md mt-2 text-[14px]">
            <ul className="list-disc list-inside">
              {medicines.length > 0 ? (
                medicines.map((m, idx) => (
                  <li key={idx}>
                    {m.name} ({m.quantity || "As directed"}, {m.duration || "As needed"})
                  </li>
                ))
              ) : (
                <li>No medicines prescribed</li>
              )}
            </ul>
          </div>
        </div>

        {/* Stamp */}
        <div className="flex justify-end mt-6">
           <img src="/logo.png" alt="Doctor Stamp" className="w-[150px] opacity-70" />
        </div>
      </div>

      {/* Button Container */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[90%] max-w-[600px] flex gap-4 justify-between items-center print:hidden z-10">
        <button 
          className="bg-[#0044cc] hover:bg-[#003399] text-white py-2 px-5 rounded-md text-[14px] transition-all cursor-pointer font-medium"
          onClick={handlePrint}
        >
          PRINT
        </button>
        
        <button 
          className="bg-[#007bff] hover:bg-[#0056b3] text-white py-2 px-5 rounded-md text-[14px] transition-all cursor-pointer font-medium disabled:opacity-50"
          onClick={handleSaveToCloud}
          disabled={!isFirebaseLoaded}
        >
          {isFirebaseLoaded ? "SAVE TO CLOUD" : "LOADING..."}
        </button>

        <a href="/test_lab.html">
          <button className="bg-[#007bff] hover:bg-[#0056b3] text-white py-2 px-5 rounded-md text-[14px] transition-all cursor-pointer font-medium">
            More info
          </button>
        </a>
      </div>
    </div>
  );
}
