import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloorMap() {
  const navigate = useNavigate();

  const [selectedFloor, setSelectedFloor] = useState(3);
  const [highlightedRoom, setHighlightedRoom] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const student = {
    name: 'Rahul Sharma',
    rollNo: '2024CS101',
    branch: 'CSE (Cyber & IoT)',
    attendancePct: 84,
  };

  const floorData = {
    1: {
      name: 'Ground Floor (Foundation Labs & Admin)',
      rooms: [
        { id: '101', name: 'Main Auditorium', x: 40, y: 40, w: 340, h: 240, color: '#d1fae5', stroke: '#059669', text: '#064e3b' },
        { id: '102', name: 'Physics Lab', x: 400, y: 40, w: 360, h: 140, color: '#dbeafe', stroke: '#2563eb', text: '#1e3a8a' },
        { id: '103', name: 'Chemistry Lab', x: 400, y: 200, w: 170, h: 140, color: '#fef3c7', stroke: '#d97706', text: '#78350f' },
        { id: '104', name: 'Dean Office', x: 590, y: 200, w: 170, h: 140, color: '#f3e8ff', stroke: '#9333ea', text: '#581c87' },
        { id: '105', name: 'Student Cafe', x: 40, y: 420, w: 720, h: 140, color: '#ffe4e6', stroke: '#e11d48', text: '#881337' },
      ],
    },
    2: {
      name: 'Second Floor (Electrical & Core Engg)',
      rooms: [
        { id: '201', name: 'Microprocessor', x: 40, y: 40, w: 260, h: 300, color: '#cffafe', stroke: '#0891b2', text: '#164e63' },
        { id: '202', name: 'VLSI Design', x: 320, y: 40, w: 440, h: 140, color: '#e0e7ff', stroke: '#4f46e5', text: '#312e81' },
        { id: '203', name: 'Control Systems', x: 320, y: 200, w: 210, h: 140, color: '#ccfbf1', stroke: '#0d9488', text: '#134e4a' },
        { id: '204', name: 'Faculty (EE)', x: 550, y: 200, w: 210, h: 140, color: '#ede9fe', stroke: '#7c3aed', text: '#4c1d95' },
        { id: '205', name: 'Smart Class 205', x: 40, y: 420, w: 720, h: 140, color: '#dbeafe', stroke: '#2563eb', text: '#1e3a8a' },
      ],
    },
    3: {
      name: 'Third Floor (Computer Science & AI Block)',
      rooms: [
        { id: '301', name: 'Lecture Hall 1', x: 40, y: 40, w: 340, h: 240, color: '#dbeafe', stroke: '#2563eb', text: '#1e3a8a' },
        { id: '302', name: 'Computer Lab A', x: 400, y: 40, w: 360, h: 140, color: '#d1fae5', stroke: '#059669', text: '#064e3b' },
        { id: '303', name: 'Seminar Room', x: 400, y: 200, w: 170, h: 140, color: '#fef3c7', stroke: '#d97706', text: '#78350f' },
        { id: '304', name: 'Faculty Cabin', x: 590, y: 200, w: 170, h: 140, color: '#f3e8ff', stroke: '#9333ea', text: '#581c87' },
        { id: '305', name: 'Lecture Hall 2', x: 40, y: 420, w: 440, h: 140, color: '#ffe4e6', stroke: '#e11d48', text: '#881337' },
        { id: '306', name: 'IoT Research Lab', x: 500, y: 420, w: 260, h: 140, color: '#cffafe', stroke: '#0891b2', text: '#164e63' },
      ],
    },
    4: {
      name: 'Fourth Floor (Innovation, Incubation & R&D)',
      rooms: [
        { id: '401', name: 'AI & Robotics Hub', x: 40, y: 40, w: 340, h: 300, color: '#fae8ff', stroke: '#c026d3', text: '#701a75' },
        { id: '402', name: 'Server Data Room', x: 400, y: 40, w: 360, h: 140, color: '#e0f2fe', stroke: '#0284c7', text: '#0c4a6e' },
        { id: '403', name: 'Incubation Centre', x: 400, y: 200, w: 360, h: 140, color: '#ecfccb', stroke: '#65a30d', text: '#3f6212' },
        { id: '404', name: 'Boardroom', x: 40, y: 420, w: 720, h: 140, color: '#f1f5f9', stroke: '#475569', text: '#0f172a' },
      ],
    },
  };

  const schedule = [
    { id: 1, time: '09:00 AM - 10:30 AM', subject: 'Data Structures', room: '301', floor: 3, prof: 'Dr. Sharma' },
    { id: 2, time: '10:45 AM - 12:15 PM', subject: 'DBMS Practical', room: '302', floor: 3, prof: 'Prof. Gupta' },
    { id: 3, time: '12:30 PM - 01:30 PM', subject: 'Microprocessors', room: '201', floor: 2, prof: 'Dr. Verma' },
    { id: 4, time: '01:30 PM - 03:00 PM', subject: 'Physics Lab', room: '102', floor: 1, prof: 'Ms. Mukherjee' },
    { id: 5, time: '03:15 PM - 05:30 PM', subject: 'Robotics Workshop', room: '401', floor: 4, prof: 'Dr. Reddy' },
  ];

  const handleResetDemo = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('attended_')) {
        localStorage.removeItem(key);
      }
    });
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 font-sans">

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">🕒</div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-800">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Attendance Automation
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">Select a classroom to verify beacon proximity</p>
        </div>

        {/* STUDENT PROFILE & LOGOUT WIDGET */}
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800 leading-tight">{student.name}</div>
              <div className="text-xs text-slate-400 font-medium">
                {student.rollNo} • <span className="text-indigo-600 font-semibold">{student.branch}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-widest">Attendance</span>
              <span className="text-base font-black text-emerald-600 leading-none">{student.attendancePct}%</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-10 h-10 bg-slate-50 text-slate-500 hover:bg-rose-100 hover:text-rose-600 rounded-xl flex items-center justify-center transition-colors shadow-sm ml-1"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: SCHEDULE */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-extrabold text-slate-800 mb-3 flex items-center gap-2">
            <span>📅</span> Today's Schedule
          </h2>
          <div className="space-y-2.5">
            {schedule.map((item) => {
              const isSelected = highlightedRoom === item.room;
              return (
                <div
                  key={item.id}
                  onClick={() => { setSelectedFloor(item.floor); navigate(`/room/${item.room}`); }}
                  onMouseEnter={() => { setSelectedFloor(item.floor); setHighlightedRoom(item.room); }}
                  onMouseLeave={() => setHighlightedRoom(null)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    isSelected ? 'bg-indigo-50 border-indigo-300 shadow-md translate-x-1' : 'bg-slate-50 border-slate-100 hover:bg-slate-100/70'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-indigo-600">{item.time}</span>
                    <h3 className="font-bold text-sm text-slate-800 mt-0.5">{item.subject}</h3>
                    <p className="text-xs text-slate-400">{item.prof}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full block">Room {item.room}</span>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Floor {item.floor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: MAP AREA */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase whitespace-nowrap">
                Select Floor:
              </span>
              <button
                onClick={handleResetDemo}
                className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-rose-100 transition-colors"
                title="Clear all saved attendance data for testing"
              >
                Reset Demo
              </button>
            </div>

            <div className="flex gap-2 flex-1 justify-end">
              {[4, 3, 2, 1].map((floor) => {
                const isActive = selectedFloor === floor;
                return (
                  <button
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                      isActive ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>🏢</span> Floor {floor}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-4 border-slate-900 p-6 relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded-md tracking-wider uppercase">
                Floor {selectedFloor} • {floorData[selectedFloor].name}
              </span>
            </div>

            {/* INTERACTIVE SVG MAP */}
            <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden relative">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full drop-shadow-sm transition-all duration-300"
                style={{ background: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              >
                <rect x="20" y="20" width="760" height="560" fill="transparent" stroke="#334155" strokeWidth="8" rx="8" />

                {floorData[selectedFloor].rooms.map((room) => {
                  const isHighlighted = highlightedRoom === room.id;
                  const isDimmed = highlightedRoom !== null && highlightedRoom !== room.id;

                  const hasAttended = localStorage.getItem(`attended_${room.id}`) === 'true';

                  return (
                    <g
                      key={room.id}
                      onClick={() => navigate(`/room/${room.id}`)}
                      onMouseEnter={() => setHighlightedRoom(room.id)}
                      onMouseLeave={() => setHighlightedRoom(null)}
                      className="cursor-pointer transition-all duration-300 origin-center"
                      style={{
                        opacity: isDimmed ? 0.4 : 1,
                        transform: isHighlighted ? 'scale(1.01)' : 'scale(1)',
                        transformOrigin: `${room.x + room.w/2}px ${room.y + room.h/2}px`
                      }}
                    >
                      <rect
                        x={room.x} y={room.y}
                        width={room.w} height={room.h}
                        fill={hasAttended ? '#d1fae5' : room.color}
                        stroke={isHighlighted ? '#1e1b4b' : (hasAttended ? '#059669' : room.stroke)}
                        strokeWidth={isHighlighted ? "4" : "2"}
                        rx="6"
                      />

                      <text x={room.x + room.w / 2} y={room.y + room.h / 2 - 5}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize="28" fontWeight="900" fill={hasAttended ? '#064e3b' : room.text}>
                        {room.id}
                      </text>
                      <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 20}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize="14" fontWeight="600" fill={hasAttended ? '#064e3b' : room.text}>
                        {room.name}
                      </text>

                      {hasAttended && (
                        <text x={room.x + room.w - 30} y={room.y + 30} fontSize="24">
                          ✅
                        </text>
                      )}

                      {isHighlighted && !hasAttended && (
                        <rect x={room.x + room.w / 2 - 50} y={room.y + room.h - 30} width="100" height="22" rx="11" fill="#1e1b4b" />
                      )}
                      {isHighlighted && !hasAttended && (
                        <text x={room.x + room.w / 2} y={room.y + room.h - 19} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="white">
                          TAP TO ENTER
                        </text>
                      )}
                    </g>
                  );
                })}

                <text x="400" y="380" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#94a3b8" letterSpacing="8">
                  MAIN CORRIDOR
                </text>
              </svg>
            </div>
          </div>
            </div>
      </main>
    </div>
  );
}