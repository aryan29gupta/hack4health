import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './DoctorVideoCall.module.css';
import { medicineDatabase } from './medicine';

export default function DoctorVideoCall() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  
  // Realtime WebRTC parameters
  const socketRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionsRef = useRef(new Map());
  const localStreamRef = useRef(null);

  // UI state
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const iceCandidatesQueue = useRef(new Map()); // userId -> array of candidates

  // Prescription UI State
  const [selectedDisease, setSelectedDisease] = useState("");
  const [otherDisease, setOtherDisease] = useState("");
  const [showOtherDisease, setShowOtherDisease] = useState(false);
  const [medicineSearch, setMedicineSearch] = useState("");
  const [testSearch, setTestSearch] = useState("");
  const [showMedicineList, setShowMedicineList] = useState(false);
  const [showTestList, setShowTestList] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [patientRemarks, setPatientRemarks] = useState("");
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [durations, setDurations] = useState({});
  const [quantities, setQuantities] = useState({});

  // Mock databases from original JS
  const [search, setSearch] = useState("");

const filteredMedicines = medicineDatabase.filter((med) =>
  med.toLowerCase().includes(search.toLowerCase())
);

  const testDatabase = [
    "17-hydroxyprogesterone immunoassay",
    "ABO blood groups and Rhesus factor typing point-of-care test",
    "Albumin",
    "Alkaline phosphatase",
    "Alanine aminotransferase (ALT)",
    "Amylase and lipase",
    "Antibodies to Treponema pallidum",
    "Aspartate aminotransferase (AST)",
    "Basic metabolic panel (BMP)",
    "Bilirubin",
    "Blood pH and gases",
    "Blood typing",
    "Blood urea nitrogen (BUN)",
    "Comprehensive metabolic panel",
    "C-reactive protein (CRP)",
    "Creatinine",
    "Electrolytes",
    "Glucose",
    "Haemoglobin (Hb)",
    "Haemoglobin A1c (HbA1c)",
  ];

  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    // ------------------------------------ //
    // 1. Initialize Socket & WebRTC        //
    // ------------------------------------ //
    async function initWebRTC() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Mirror local video to remote box for testing as requested
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          setHasRemoteVideo(true);
          setConnectionStatus("Local Mirror Mode (Testing)");
        }

        // Connect socket directly to Express backend
        // Use window.location.hostname to support multi-device local networking
        const backendUrl = `http://${window.location.hostname}:5000`;
        console.log("Connecting to signaling server at:", backendUrl);
        socketRef.current = io(backendUrl); 

        setupSocketListeners(socketRef.current);
        
        // Immediately join the room
        const roomToJoin = appointmentId || "main-room";
        socketRef.current.emit("join-room", roomToJoin);
        setConnectionStatus("Joining room...");

      } catch (err) {
        console.error("Error accessing media devices:", err);
        setConnectionStatus("Failed to access camera/microphone");
      }
    }

    initWebRTC();

    return () => {
      // Cleanup WebRTC and Sockets
      if (socketRef.current) socketRef.current.disconnect();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      for (const [userId, pc] of peerConnectionsRef.current) {
        pc.close();
      }
    };
  }, [appointmentId]);


  function setupSocketListeners(socket) {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("user-joined", async (userId) => {
      console.log("User joined room:", userId);
      setConnectionStatus("Peer joined, establishing connection...");
      await createPeerConnection(userId, true);
    });

    socket.on("existing-users", async (users) => {
      console.log("Found existing users in room:", users);
      if (users.length > 0) {
        setConnectionStatus("Found peer, establishing connection...");
        for (const userId of users) {
          await createPeerConnection(userId, false);
        }
      } else {
        setConnectionStatus("Waiting for patient to join...");
      }
    });

    socket.on("offer", async (data) => {
      console.log("Received offer from:", data.sender);
      await handleOffer(data.offer, data.sender);
    });

    socket.on("answer", async (data) => {
      console.log("Received answer from:", data.sender);
      await handleAnswer(data.answer, data.sender);
    });

    socket.on("ice-candidate", async (data) => {
      console.log("Received ICE candidate from:", data.sender);
      await handleIceCandidate(data.candidate, data.sender);
    });

    socket.on("user-left", (userId) => {
      console.log("User left room:", userId);
      handlePeerLeave(userId);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnectionStatus("Disconnected from server");
    });
  }

  async function createPeerConnection(userId, shouldCreateOffer) {
    const pc = new RTCPeerConnection(configuration);
    peerConnectionsRef.current.set(userId, pc);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    pc.ontrack = (event) => {
      console.log("Received remote track");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setHasRemoteVideo(true);
        setConnectionStatus("Connected to patient!");
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Generated local ICE candidate");
        socketRef.current.emit("ice-candidate", {
          candidate: event.candidate,
          target: userId,
        });
      }
    };

    if (shouldCreateOffer) {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current.emit("offer", { offer, target: userId });
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    }
    return pc;
  }

  async function handleOffer(offer, senderId) {
    let pc = peerConnectionsRef.current.get(senderId);
    if (!pc) {
      pc = await createPeerConnection(senderId, false);
    }
    try {
      console.log("Setting remote description (Offer)");
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      
      // Process queued candidates
      const candidates = iceCandidatesQueue.current.get(senderId) || [];
      console.log(`Processing ${candidates.length} queued candidates for ${senderId}`);
      for (const candidate of candidates) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
      iceCandidatesQueue.current.delete(senderId);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current.emit("answer", { answer, target: senderId });
    } catch (err) {
      console.error("Error handling offer:", err);
    }
  }

  async function handleAnswer(answer, senderId) {
    const pc = peerConnectionsRef.current.get(senderId);
    if (pc) {
      try {
        console.log("Setting remote description (Answer)");
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        
        // Process queued candidates
        const candidates = iceCandidatesQueue.current.get(senderId) || [];
        console.log(`Processing ${candidates.length} queued candidates for ${senderId}`);
        for (const candidate of candidates) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
        iceCandidatesQueue.current.delete(senderId);
      } catch (err) {
        console.error("Error handling answer:", err);
      }
    }
  }

  async function handleIceCandidate(candidate, senderId) {
    const pc = peerConnectionsRef.current.get(senderId);
    if (pc && pc.remoteDescription && pc.remoteDescription.type) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    } else {
      console.log("Queuing ICE candidate (Remote description not yet set)");
      if (!iceCandidatesQueue.current.has(senderId)) {
        iceCandidatesQueue.current.set(senderId, []);
      }
      iceCandidatesQueue.current.get(senderId).push(candidate);
    }
  }

  function handlePeerLeave(userId) {
    const pc = peerConnectionsRef.current.get(userId);
    if (pc) {
      pc.close();
      peerConnectionsRef.current.delete(userId);
    }
    if (peerConnectionsRef.current.size === 0) {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
      setHasRemoteVideo(false);
      setConnectionStatus("Waiting for patient to join...");
    }
  }


  // ------------------------------------ //
  // 2. Doctor / Prescription UI Handlers //
  // ------------------------------------ //

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const handleDiseaseChange = (e) => {
    const val = e.target.value;
    if (val === "Other") {
      setShowOtherDisease(true);
    } else {
      setShowOtherDisease(false);
      setSelectedDisease(val);
    }
  };

  const submitDisease = () => {
    let finalDisease = selectedDisease;
    if (showOtherDisease) {
      finalDisease = otherDisease.trim();
    }
    if (!finalDisease) {
      alert("Please select or specify a disease.");
      return;
    }
    setSelectedDisease(finalDisease);
    setShowOtherDisease(false);
    localStorage.setItem("selectedDisease", finalDisease);
  };

  const demoHistory = [
    { date: "2024-01-15", disease: "Hypertension", doctor: "Dr. Sharma", remarks: "Blood pressure controlled with medication." },
    { date: "2023-11-20", disease: "Common Cold", doctor: "Dr. Verma", remarks: "Prescribed rest and hydration." },
    { date: "2023-08-05", disease: "Gastritis", doctor: "Dr. Gupta", remarks: "Advised diet changes." }
  ];

  const HistoryModal = () => (
    <div className={styles.modal_overlay} onClick={() => setShowHistoryModal(false)}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={() => setShowHistoryModal(false)}>&times;</button>
        <h2 className={styles.title}>Patient Medical History</h2>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Patient Name:</strong> Aryan Gupta</p>
          <p><strong>Age:</strong> 25</p>
          <p><strong>Gender:</strong> Male</p>
        </div>
        <table className={styles.history_table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Doctor</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {demoHistory.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.date}</td>
                <td>{entry.disease}</td>
                <td>{entry.doctor}</td>
                <td>{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const removeDisease = () => {
    setSelectedDisease("");
    localStorage.removeItem("selectedDisease");
  };

  const addMedicine = (medicine) => {
    const duration = durations[medicine] || "Not specified";
    const quantity = quantities[medicine] || "Not specified";
    
    // Don't duplicate
    if (!selectedMedicines.some((m) => m.name === medicine)) {
      setSelectedMedicines((prev) => [...prev, { name: medicine, duration, quantity }]);
    }
    
    // Clear inputs visually
    setDurations((prev) => ({ ...prev, [medicine]: "" }));
    setQuantities((prev) => ({ ...prev, [medicine]: "" }));
  };

  const removeMedicine = (nameToRemove) => {
    setSelectedMedicines((prev) => prev.filter((m) => m.name !== nameToRemove));
  };

  const addTest = (test) => {
    if (!selectedTests.includes(test)) {
      setSelectedTests((prev) => [...prev, test]);
    }
  };

  const removeTest = (testToRemove) => {
    setSelectedTests((prev) => prev.filter((t) => t !== testToRemove));
  };

  const savePrescription = () => {
    localStorage.setItem("prescribedMedicines", JSON.stringify(selectedMedicines));
    localStorage.setItem("prescribedTests", JSON.stringify(selectedTests));
    localStorage.setItem("patientRemarks", patientRemarks);
    if (selectedDisease) {
      localStorage.setItem("selectedDisease", selectedDisease);
    }
    alert("Prescription and remarks have been saved!");
    // Navigate to the new prescription results page
    navigate('/prescription', { replace: true });
  };

  // Outside click simulation for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#medicine-search') && !e.target.closest('#medicine-list')) {
        setShowMedicineList(false);
      }
      if (!e.target.closest('#test-search') && !e.target.closest('#test-list')) {
        setShowTestList(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.webrtc_doctor_wrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        
        {/* Medicines Dropdown */}
        <div className={styles.sidebar_section}>
          <h1 className={styles.title}>Medicines</h1>
          <input
            type="text"
            id="medicine-search"
            placeholder="Search for medicines"
            value={medicineSearch}
            onChange={(e) => setMedicineSearch(e.target.value)}
            onClick={() => setShowMedicineList(true)}
            className={styles.input_text}
          />
          {showMedicineList && (
            <div id="medicine-list" className={styles.medicine_list}>
              {medicineDatabase
                .filter((md) => md.toLowerCase().includes(medicineSearch.toLowerCase()))
                .map((medicine, i) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div className={styles.item}>
                      <span>{i + 1}. {medicine}</span>
                    </div>
                    <div className={styles.medicine_details} style={{ display: 'block' }}>
                      <input
                        type="text"
                        className={styles.input_field}
                        placeholder="Days"
                        value={durations[medicine] || ""}
                        onChange={(e) => setDurations({...durations, [medicine]: e.target.value})}
                      />
                      <input
                        type="text"
                        className={styles.input_field}
                        placeholder="Quantity"
                        value={quantities[medicine] || ""}
                        onChange={(e) => setQuantities({...quantities, [medicine]: e.target.value})}
                      />
                      <button 
                        onClick={() => addMedicine(medicine)}
                        className={styles.done_button}
                        style={{ float: 'none', padding: '5px 10px', fontSize: '14px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Tests Dropdown */}
        <div className={styles.sidebar_section} style={{ marginTop: '30px' }}>
          <h1 className={styles.title}>Tests</h1>
          <input
            type="text"
            id="test-search"
            placeholder="Search for tests"
            value={testSearch}
            onChange={(e) => setTestSearch(e.target.value)}
            onClick={() => setShowTestList(true)}
            className={styles.input_text}
          />
          {showTestList && (
            <div id="test-list" className={styles.test_list}>
              {testDatabase
                .filter((td) => td.toLowerCase().includes(testSearch.toLowerCase()))
                .map((test, i) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                     <div className={styles.item}>
                      <span>{i + 1}. {test}</span>
                    </div>
                    <div className={styles.test_details} style={{ display: 'block' }}>
                      <button 
                        onClick={() => addTest(test)}
                        className={styles.done_button}
                        style={{ float: 'none', padding: '5px 10px', fontSize: '14px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className={styles.sidebar_section} style={{ marginTop: '30px' }}>
          <h1 className={styles.title}>Disease</h1>
          
          {!selectedDisease || showOtherDisease ? (
            <div className="disease-selector">
              <select 
                className={styles.disease_dropdown} 
                onChange={handleDiseaseChange} 
                defaultValue=""
              >
                <option value="" disabled>Select disease</option>
                <option value="Common Cold">Common Cold</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Orthopaedic">Orthopaedic</option>
                <option value="Diarrhea">Diarrhea</option>
                <option value="Fungal Infections">Fungal Infections</option>
                <option value="Multi Nutritional">Multi Nutritional</option>
                <option value="Dengue">Dengue</option>
                <option value="Malaria">Malaria</option>
                <option value="Tuberculosis">Tuberculosis</option>
                <option value="HIV">HIV</option>
                <option value="Other">Other</option>
              </select>

              {showOtherDisease && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Specify disease"
                    className={styles.input_text}
                    value={otherDisease}
                    onChange={(e) => setOtherDisease(e.target.value)}
                  />
                </div>
              )}
              <button 
                onClick={submitDisease}
                className={styles.disease_submit}
              >
                Submit
              </button>
            </div>
          ) : (
            <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#eef2ff', borderRadius: '5px', border: '1px solid #c7d2fe' }}>
              <span className={styles.selected_disease}>
                {selectedDisease}
              </span>
              <button 
                onClick={removeDisease}
                className={styles.remove_disease}
              >
                Change Disease
              </button>
            </div>
          )}
        </div>

        <div className={styles.sidebar_section}>
          <button
            className={styles.done_button}
            style={{ width: '90%', float: 'none', marginTop: '20px' }}
            onClick={() => setShowHistoryModal(true)}
          >
            Previous Medical History
          </button>
        </div>
      </div>

      {showHistoryModal && <HistoryModal />}

      {/* Main Content Area */}
      <div className={styles.main_content}>
        
        {/* Video Call Area */}
        <div className={styles.content_area} style={{ flex: 'none', height: 'auto' }}>
          <div className={styles.video_container} style={{ height: '400px' }}>
            
            {/* Connection Status overlay */}
            <div className={styles.appointment_details}>
              {connectionStatus}
            </div>

            {!hasRemoteVideo && (
              <div className={styles.video_placeholder}>
                Waiting for Patient Video...
              </div>
            )}
            
            {/* Remote Video (Patient) */}
            <video 
              ref={remoteVideoRef} 
              className={styles.remote_video} 
              autoPlay 
              playsInline
            />
            
            {/* Local Video (Doctor) */}
            <video 
              ref={localVideoRef} 
              className={styles.user_video} 
              autoPlay 
              muted 
              playsInline
              style={{ width: '200px', height: '150px' }}
            />
            
            {/* Controls */}
            <div className={styles.call_controls}>
              <button 
                onClick={toggleAudio}
                className={styles.control_button}
                style={{ backgroundColor: isAudioEnabled ? '#2d6efd' : '#f44336' }}
              >
                {isAudioEnabled ? "🎤" : "🔇"}
              </button>
              <button 
                onClick={toggleVideo}
                className={styles.control_button}
                style={{ backgroundColor: isVideoEnabled ? '#2d6efd' : '#f44336' }}
              >
                {isVideoEnabled ? "📹" : "🚫"}
              </button>
            </div>
          </div>
        </div>

        {/* Prescription Details Section */}
        <div className={styles.bottom_section}>
          
          <div className={styles.remarks_section} style={{ backgroundColor: '#f0f4ff', border: '1px solid #dbeafe' }}>
            <h1 className={styles.title}>Diagnosis / Disease</h1>
            {selectedDisease ? (
              <div className={styles.selected_disease_display}>
                <span className={styles.selected_disease}>
                  {selectedDisease}
                </span>
                <button 
                  onClick={removeDisease}
                  className={styles.remove_disease}
                >
                  Remove
                </button>
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No disease selected from sidebar.</p>
            )}
          </div>

          <div className={styles.medicines_section}>
            <h1 className={styles.title}>Medicines</h1>
            <div>
              {selectedMedicines.length === 0 ? <p style={{ color: '#666' }}>No medicines selected.</p> : null}
              {selectedMedicines.map((m, i) => (
                <div key={i} className={styles.medicine_item}>
                  <div>
                    <strong style={{ display: 'block', color: '#1e3a64', marginBottom: '5px' }}>{m.name}</strong>
                    <span style={{ fontSize: '13px', color: '#555' }}>Duration: {m.duration} | Quantity: {m.quantity}</span>
                  </div>
                  <button 
                    onClick={() => removeMedicine(m.name)}
                    style={{ backgroundColor: '#ff3366', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tests_section}>
            <h1 className={styles.title}>Tests</h1>
            <div>
              {selectedTests.length === 0 ? <p style={{ color: '#666' }}>No tests selected.</p> : null}
              {selectedTests.map((t, i) => (
                <div key={i} className={styles.test_item}>
                  <strong style={{ color: '#1e3a64' }}>{t}</strong>
                  <button 
                    onClick={() => removeTest(t)}
                    style={{ backgroundColor: '#ff3366', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.remarks_section}>
            <h1 className={styles.title}>Patient Remarks</h1>
            <textarea
              className={styles.textarea}
              placeholder="Enter remarks about the patient's condition, diagnosis, and recommendations..."
              value={patientRemarks}
              onChange={(e) => setPatientRemarks(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '40px' }}>
            <button 
              className={styles.done_button} 
              onClick={savePrescription}
              style={{ padding: '12px 30px', fontSize: '18px', fontWeight: 'bold' }}
            >
              Done / Complete 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
