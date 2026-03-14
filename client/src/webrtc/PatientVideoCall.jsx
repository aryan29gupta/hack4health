import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './PatientVideoCall.module.css';

export default function PatientVideoCall() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  // WebRTC & Socket Refs
  const socketRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionsRef = useRef(new Map());
  const localStreamRef = useRef(null);

  // UI State
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [statusClass, setStatusClass] = useState("connecting");
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const iceCandidatesQueue = useRef(new Map()); // userId -> array of candidates

  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  useEffect(() => {
    // ------------------------------------ //
    // 1. Initialize Socket & WebRTC        //
    // ------------------------------------ //
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true
        });
        
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Mirror local video to remote box for testing as requested
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          setHasRemoteVideo(true);
          updateStatus('Local Mirror Mode (Testing)', 'connected');
        }

        // Connect directly to the Node backend
        // Use window.location.hostname to support multi-device local networking
        const backendUrl = `http://${window.location.hostname}:5000`;
        console.log('Connecting to signaling server at:', backendUrl);
        socketRef.current = io(backendUrl); 
        
        setupSocketListeners(socketRef.current);

        // Join the specified room (or main-room fallback)
        const roomToJoin = appointmentId || "main-room";
        socketRef.current.emit('join-room', roomToJoin);
        updateStatus('Connecting to room...', 'connecting');

      } catch (err) {
        console.error('Error accessing media devices:', err);
        updateStatus('Failed to access camera/microphone', 'disconnected');
      }
    }

    init();

    return () => {
      // Cleanup
      if (socketRef.current) socketRef.current.disconnect();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      for (const [userId, pc] of peerConnectionsRef.current) {
        pc.close();
      }
    };
  }, [appointmentId]);


  function updateStatus(message, type) {
    setConnectionStatus(message);
    setStatusClass(type);
  }

  function setupSocketListeners(socket) {
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('user-joined', async (userId) => {
      console.log('User joined room:', userId);
      updateStatus('Doctor joined, establishing connection...', 'connecting');
      await createPeerConnection(userId, true);
    });

    socket.on('existing-users', async (users) => {
      console.log('Found existing users in room:', users);
      if (users.length > 0) {
        updateStatus('Found doctor, establishing connection...', 'connecting');
        for (const userId of users) {
          await createPeerConnection(userId, false);
        }
      } else {
        updateStatus('Waiting for doctor to join...', 'connecting');
      }
    });

    socket.on('offer', async (data) => {
      console.log('Received offer from:', data.sender);
      await handleOffer(data.offer, data.sender);
    });

    socket.on('answer', async (data) => {
      console.log('Received answer from:', data.sender);
      await handleAnswer(data.answer, data.sender);
    });

    socket.on('ice-candidate', async (data) => {
      console.log('Received ICE candidate from:', data.sender);
      await handleIceCandidate(data.candidate, data.sender);
    });

    socket.on('user-left', (userId) => {
      console.log('User left room:', userId);
      handlePeerLeave(userId);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      updateStatus('Disconnected from server', 'disconnected');
    });
  }

  async function createPeerConnection(userId, shouldCreateOffer) {
    const pc = new RTCPeerConnection(configuration);
    peerConnectionsRef.current.set(userId, pc);
    
    // Add local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current);
      });
    }
    
    // Handle remote tracks
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setHasRemoteVideo(true);
        updateStatus('Connected to Doctor!', 'connected');
      }
    };
    
    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Generated local ICE candidate');
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          target: userId
        });
      }
    };
    
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        handlePeerLeave(userId);
      }
    };

    // Create offer
    if (shouldCreateOffer) {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current.emit('offer', { offer, target: userId });
      } catch (error) {
        console.error('Error creating offer:', error);
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
      console.log('Setting remote description (Offer)');
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
      socketRef.current.emit('answer', { answer, target: senderId });
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  async function handleAnswer(answer, senderId) {
    const pc = peerConnectionsRef.current.get(senderId);
    if (pc) {
      try {
        console.log('Setting remote description (Answer)');
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        
        // Process queued candidates
        const candidates = iceCandidatesQueue.current.get(senderId) || [];
        console.log(`Processing ${candidates.length} queued candidates for ${senderId}`);
        for (const candidate of candidates) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
        iceCandidatesQueue.current.delete(senderId);
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    }
  }

  async function handleIceCandidate(candidate, senderId) {
    const pc = peerConnectionsRef.current.get(senderId);
    if (pc && pc.remoteDescription && pc.remoteDescription.type) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    } else {
      console.log('Queuing ICE candidate (Remote description not yet set)');
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
      updateStatus('Waiting for doctor to join...', 'connecting');
    }
  }


  // ------------------------------------ //
  // 2. UI Controls                       //
  // ------------------------------------ //

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room');
    }
    navigate('/patient-profile', { replace: true });
  };

  return (
    <div className={styles.webrtc_patient_wrapper}>
      
      {/* Video Chat Screen (mirrors the UI from patient.html) */}
      <div id="videoChat" className={styles.video_container}>
        
        {/* Connection Status Banner */}
        <div className={`${styles.status} ${styles['status_' + statusClass] || ''}`} id="connectionStatus">
          {connectionStatus}
        </div>
        
        <div id="roomInfo" className={styles.status} style={{ top: '60px', backgroundColor: 'rgba(51, 65, 85, 0.8)' }}>
          Room ID: {appointmentId || 'main-room'}
        </div>

        <div className={styles.video_grid}>
          <div className={styles.video_wrapper}>
            
            <video 
              id="remoteVideo" 
              className={`${styles.video_player} ${styles.remote_video}`} 
              autoPlay 
              playsInline 
              ref={remoteVideoRef}
              style={{ display: hasRemoteVideo ? 'block' : 'none' }}
            />
            
            {!hasRemoteVideo && (
              <div id="remotePlaceholder" className={styles.video_placeholder}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>👨‍⚕️</span>
                </div>
                <div>Waiting for doctor...</div>
              </div>
            )}

          </div>
        </div>
        
        <video 
          id="localVideo" 
          className={styles.local_video} 
          autoPlay 
          playsInline 
          muted 
          ref={localVideoRef}
        />
        
        <div className={styles.controls}>
          <button 
            id="toggleVideo" 
            className={`${styles.control_btn} ${!isVideoEnabled ? styles.muted : styles.active}`}
            title="Toggle Camera"
            onClick={toggleVideo}
            style={{ backgroundColor: isVideoEnabled ? 'rgba(255, 255, 255, 0.2)' : '#f44336' }}
          >
            📹
          </button>
          
          <button 
            id="toggleAudio" 
            className={`${styles.control_btn} ${!isAudioEnabled ? styles.muted : styles.active}`}
            title="Toggle Microphone"
            onClick={toggleAudio}
            style={{ backgroundColor: isAudioEnabled ? 'rgba(255, 255, 255, 0.2)' : '#f44336' }}
          >
            🎤
          </button>
          
          <button 
            id="endCall" 
            className={`${styles.control_btn} ${styles.control_btn_end_call}`}
            title="End Call"
            onClick={endCall}
          >
            📞
          </button>
        </div>
      </div>
    </div>
  );
}
