import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState('idle');
  const [activeLecture, setActiveLecture] = useState(null);
  const [isLectureActive, setIsLectureActive] = useState(false);

  const student = { name: 'Rahul Sharma', rollNo: '2024CS101' };

  const scheduleDb = {
    '301': { subject: 'Data Structures', prof: 'Dr. Sharma', time: '09:00 AM - 10:30 AM' },
    '302': { subject: 'DBMS Practical', prof: 'Prof. Gupta', time: '10:45 AM - 12:15 PM' },
    '201': { subject: 'Microprocessors', prof: 'Dr. Verma', time: '12:30 PM - 01:30 PM' },
    '102': { subject: 'Physics Lab', prof: 'Ms. Mukherjee', time: '01:30 PM - 03:00 PM' },
    '401': { subject: 'Robotics Workshop', prof: 'Dr. Reddy', time: '03:15 PM - 05:30 PM' },
  };

  const checkTimeValidity = (timeStr) => {
    if (!timeStr) return false;
    try {
      const [startStr, endStr] = timeStr.split(' - ');

      const parseTime = (t) => {
        const [time, modifier] = t.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (hours === 12) hours = 0;
        if (modifier === 'PM') hours += 12;
        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d.getTime();
      };

      const now = new Date().getTime();
      return now >= parseTime(startStr) && now <= parseTime(endStr);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const checkStatus = () => {
      const lecture = scheduleDb[roomId];
      if (lecture) {
        setActiveLecture(lecture);
        setIsLectureActive(checkTimeValidity(lecture.time));
      } else {
        setActiveLecture({ subject: 'Free Slot / Open Lab', prof: 'N/A', time: 'No scheduled class' });
        setIsLectureActive(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [roomId]);

  const connectToBeacon = () => {
    setStep('scanning');
    setTimeout(() => setStep('connected'), 1500);
  };

  // --- THE NATIVE WINDOWS HELLO / TOUCH ID INTEGRATION ---
  const triggerBiometrics = async () => {
    setStep('authenticating');

    try {
      // Check if the browser supports native biometrics (WebAuthn API)
      if (window.PublicKeyCredential) {

        // Generate random challenges for the demo
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        const userId = new Uint8Array(16);
        window.crypto.getRandomValues(userId);

        // This triggers the native OS Prompt (Windows Hello / TouchID)
        await navigator.credentials.create({
          publicKey: {
            challenge: challenge,
            rp: { name: "Ozymandias Attendance System" },
            user: {
              id: userId,
              name: student.rollNo,
              displayName: student.name
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
            authenticatorSelection: {
              authenticatorAttachment: "platform", // Forces the prompt to use the device's native hardware
              userVerification: "required"
            },
            timeout: 60000,
            attestation: "none"
          }
        });

        // If the promise resolves, Windows Hello succeeded!
        setStep('success');
        localStorage.setItem(`attended_${roomId}`, 'true');

      } else {
        // Fallback for older browsers
        setTimeout(() => {
          setStep('success');
          localStorage.setItem(`attended_${roomId}`, 'true');
        }, 1500);
      }
    } catch (error) {
      console.error("Biometric failed or cancelled:", error);
      // If they click 'Cancel' on Windows Hello, bounce them back so they can try again
      setStep('connected');
      alert("Verification cancelled or failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

        <div className="bg-slate-900 p-6 text-center relative">
          <button onClick={() => navigate('/map')} className="absolute left-4 top-6 text-slate-400 hover:text-white font-bold text-sm">
            ← Back
          </button>

          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg border-4 border-slate-800 mb-3 transition-colors ${isLectureActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
            <span className="text-2xl font-black text-white">{roomId}</span>
          </div>

          <h2 className="text-xl font-bold text-white">BLE Zone {roomId}</h2>

          {isLectureActive ? (
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1 animate-pulse">
              ● Signal Strength: Excellent
            </p>
          ) : (
            <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mt-1">
              ○ Beacon Inactive / Out of Range
            </p>
          )}
        </div>

        <div className="p-6">

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
            <span className="text-xs font-bold text-indigo-600 block mb-1">SCHEDULED NOW</span>
            <h3 className="font-black text-lg text-slate-800">{activeLecture?.subject}</h3>
            <p className="text-sm text-slate-500 font-medium">{activeLecture?.prof} • {activeLecture?.time}</p>
          </div>

          {step === 'idle' && (
            isLectureActive ? (
              <button onClick={connectToBeacon} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95 flex justify-center items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                Connect to Classroom Beacon
              </button>
            ) : (
              <button disabled className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 font-bold text-lg border-2 border-slate-200 cursor-not-allowed flex justify-center items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
                No Active Broadcast Found
              </button>
            )
          )}

          {step === 'scanning' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold animate-pulse">Handshaking with ESP32 Beacon...</p>
            </div>
          )}

          {step === 'connected' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-800">Connection Secured</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Device bound to <strong>{student.name} ({student.rollNo})</strong>. Verify biometric identity to complete attendance.
                </p>
              </div>

              <button onClick={triggerBiometrics} className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                Verify Fingerprint
              </button>
            </div>
          )}

          {step === 'authenticating' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <svg className="w-16 h-16 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
              <p className="text-slate-500 font-bold">Awaiting OS Biometric API...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-6 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800">Attendance Marked!</h3>
              <p className="text-slate-500 font-medium mt-2 mb-6">You have been verified for {activeLecture?.subject}.</p>
              <button onClick={() => navigate('/map')} className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all">
                Return to Floor Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}