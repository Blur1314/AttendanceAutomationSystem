import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddData from './AddData';
import StudentOverall from './StudentOverall';

export default function Teacher() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [viewMode, setViewMode] = useState('Weekly');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'Overview') {
      setSelectedDivision(null);
      setSelectedLecture(null);
    }
  };

  const teacherClasses = [
    {
      year: '1st Year',
      semesters: [
        { name: 'Sem 1 (Physics)', divisions: ['Div A', 'Div B', 'Div C'] },
        { name: 'Sem 2 (Applied Sciences)', divisions: ['Div A', 'Div B'] }
      ]
    },
    {
      year: '3rd Year',
      semesters: [
        { name: 'Sem 5 (Electromagnetics)', divisions: ['Div A'] },
        { name: 'Sem 6 (Quantum Mechanics)', divisions: ['Div B', 'Div C'] }
      ]
    }
  ];

  const globalWeeklyData = [
    { day: 'Monday', class: 'Sem 1 - Div A', time: '09:00 AM', attendance: '88%', topic: 'Kinematics' },
    { day: 'Tuesday', class: 'Sem 1 - Div B', time: '11:00 AM', attendance: '92%', topic: 'Thermodynamics' },
    { day: 'Wednesday', class: 'Sem 5 - Div A', time: '10:00 AM', attendance: '76%', topic: 'Maxwell Equations' },
    { day: 'Thursday', class: 'Sem 1 - Div C', time: '02:00 PM', attendance: '85%', topic: 'Optics' },
    { day: 'Friday', class: 'Sem 6 - Div B', time: '01:00 PM', attendance: '90%', topic: 'Wave Functions' },
  ];

  const globalTimelineData = [
    { time: '09:00 AM - 10:30 AM', subject: 'Physics Lab', class: 'Sem 1 - Div A', room: '102', status: 'Completed', color: 'bg-emerald-500' },
    { time: '11:00 AM - 12:00 PM', subject: 'Applied Sciences', class: 'Sem 2 - Div B', room: '305', status: 'Active', color: 'bg-indigo-500' },
    { time: '02:00 PM - 03:30 PM', subject: 'Electromagnetics', class: 'Sem 5 - Div A', room: '201', status: 'Upcoming', color: 'bg-slate-300' },
  ];

  // UNIQUE TIMETABLES FOR EVERY DIVISION
  const divisionTimetables = {
    'Sem 1 (Physics) - Div A': {
      'Monday': [
        { id: '1A_M1', time: '09:00 AM - 10:30 AM', subject: 'Physics Lab', room: '102', topic: 'Kinematics' },
        { id: '1A_M2', time: '11:00 AM - 12:00 PM', subject: 'Theory', room: '301', topic: 'Newtonian Mechanics' }
      ],
      'Tuesday': [
        { id: '1A_T1', time: '10:00 AM - 11:00 AM', subject: 'Tutorial', room: '305', topic: 'Problem Solving' }
      ],
      'Wednesday': [
        { id: '1A_W1', time: '01:00 PM - 03:00 PM', subject: 'Workshop', room: '105', topic: 'Basic Measurements' },
        { id: '1A_W2', time: '03:15 PM - 04:15 PM', subject: 'Theory', room: '301', topic: 'Friction' }
      ],
      'Thursday': [],
      'Friday': [
        { id: '1A_F1', time: '09:00 AM - 11:00 AM', subject: 'Physics Lab', room: '102', topic: 'Dynamics' }
      ]
    },
    'Sem 1 (Physics) - Div B': {
      'Monday': [
        { id: '1B_M1', time: '01:00 PM - 02:00 PM', subject: 'Theory', room: '302', topic: 'Thermodynamics' }
      ],
      'Tuesday': [
        { id: '1B_T1', time: '09:00 AM - 11:00 AM', subject: 'Physics Lab', room: '102', topic: 'Heat Transfer' },
        { id: '1B_T2', time: '11:15 AM - 12:15 PM', subject: 'Tutorial', room: '306', topic: 'Entropy' }
      ],
      'Wednesday': [],
      'Thursday': [
        { id: '1B_Th1', time: '10:00 AM - 12:00 PM', subject: 'Workshop', room: '105', topic: 'Calorimetry' }
      ],
      'Friday': [
        { id: '1B_F1', time: '02:00 PM - 03:00 PM', subject: 'Theory', room: '302', topic: 'Gas Laws' },
        { id: '1B_F2', time: '03:15 PM - 04:15 PM', subject: 'Seminar', room: '101', topic: 'Modern Physics' }
      ]
    },
    'Sem 1 (Physics) - Div C': {
      'Monday': [
        { id: '1C_M1', time: '10:00 AM - 12:00 PM', subject: 'Physics Lab', room: '103', topic: 'Optics' }
      ],
      'Tuesday': [],
      'Wednesday': [
        { id: '1C_W1', time: '09:00 AM - 10:00 AM', subject: 'Theory', room: '303', topic: 'Light Waves' },
        { id: '1C_W2', time: '10:15 AM - 11:15 AM', subject: 'Tutorial', room: '306', topic: 'Lenses' }
      ],
      'Thursday': [
        { id: '1C_Th1', time: '01:00 PM - 03:00 PM', subject: 'Physics Lab', room: '103', topic: 'Diffraction' }
      ],
      'Friday': []
    },
    'Sem 2 (Applied Sciences) - Div A': {
      'Monday': [
        { id: '2A_M1', time: '09:00 AM - 10:00 AM', subject: 'Theory', room: '304', topic: 'Fluid Dynamics' }
      ],
      'Tuesday': [
        { id: '2A_T1', time: '01:00 PM - 03:00 PM', subject: 'Applied Lab', room: '104', topic: 'Viscosity' }
      ],
      'Wednesday': [],
      'Thursday': [
        { id: '2A_Th1', time: '09:00 AM - 11:00 AM', subject: 'Applied Lab', room: '104', topic: 'Surface Tension' },
        { id: '2A_Th2', time: '11:15 AM - 12:15 PM', subject: 'Tutorial', room: '307', topic: 'Pressure' }
      ],
      'Friday': [
        { id: '2A_F1', time: '10:00 AM - 11:00 AM', subject: 'Theory', room: '304', topic: 'Bernoulli Equation' }
      ]
    },
    'Sem 2 (Applied Sciences) - Div B': {
      'Monday': [
        { id: '2B_M1', time: '11:00 AM - 01:00 PM', subject: 'Applied Lab', room: '104', topic: 'Materials' },
        { id: '2B_M2', time: '02:00 PM - 03:00 PM', subject: 'Theory', room: '305', topic: 'Stress & Strain' }
      ],
      'Tuesday': [],
      'Wednesday': [
        { id: '2B_W1', time: '10:00 AM - 11:00 AM', subject: 'Tutorial', room: '308', topic: 'Elasticity' }
      ],
      'Thursday': [],
      'Friday': [
        { id: '2B_F1', time: '01:00 PM - 03:00 PM', subject: 'Applied Lab', room: '104', topic: 'Youngs Modulus' }
      ]
    },
    'Sem 5 (Electromagnetics) - Div A': {
      'Monday': [
        { id: '5A_M1', time: '10:00 AM - 11:00 AM', subject: 'Theory', room: '401', topic: 'Electrostatics' },
        { id: '5A_M2', time: '11:15 AM - 01:15 PM', subject: 'Advanced Lab', room: '201', topic: 'Electric Fields' }
      ],
      'Tuesday': [
        { id: '5A_T1', time: '02:00 PM - 03:00 PM', subject: 'Theory', room: '401', topic: 'Gauss Law' }
      ],
      'Wednesday': [
        { id: '5A_W1', time: '09:00 AM - 11:00 AM', subject: 'Advanced Lab', room: '201', topic: 'Capacitance' }
      ],
      'Thursday': [
        { id: '5A_Th1', time: '10:00 AM - 11:00 AM', subject: 'Tutorial', room: '402', topic: 'Dielectrics' }
      ],
      'Friday': []
    },
    'Sem 6 (Quantum Mechanics) - Div B': {
      'Monday': [],
      'Tuesday': [
        { id: '6B_T1', time: '09:00 AM - 10:00 AM', subject: 'Theory', room: '403', topic: 'Schrodinger Eq' },
        { id: '6B_T2', time: '10:15 AM - 11:15 AM', subject: 'Tutorial', room: '404', topic: 'Wave Packets' }
      ],
      'Wednesday': [
        { id: '6B_W1', time: '01:00 PM - 03:00 PM', subject: 'Simulation Lab', room: '202', topic: 'Particle in Box' }
      ],
      'Thursday': [
        { id: '6B_Th1', time: '11:00 AM - 12:00 PM', subject: 'Theory', room: '403', topic: 'Uncertainty Principle' }
      ],
      'Friday': [
        { id: '6B_F1', time: '10:00 AM - 12:00 PM', subject: 'Simulation Lab', room: '202', topic: 'Harmonic Oscillator' }
      ]
    },
    'Sem 6 (Quantum Mechanics) - Div C': {
      'Monday': [
        { id: '6C_M1', time: '02:00 PM - 04:00 PM', subject: 'Simulation Lab', room: '202', topic: 'Angular Momentum' }
      ],
      'Tuesday': [],
      'Wednesday': [
        { id: '6C_W1', time: '11:00 AM - 12:00 PM', subject: 'Theory', room: '405', topic: 'Spin' }
      ],
      'Thursday': [
        { id: '6C_Th1', time: '09:00 AM - 11:00 AM', subject: 'Simulation Lab', room: '202', topic: 'Hydrogen Atom' },
        { id: '6C_Th2', time: '11:15 AM - 12:15 PM', subject: 'Tutorial', room: '406', topic: 'Quantum States' }
      ],
      'Friday': [
        { id: '6C_F1', time: '01:00 PM - 02:00 PM', subject: 'Theory', room: '405', topic: 'Perturbation Theory' }
      ]
    }
  };

  const getDaySchedule = (divKey, day) => {
    if (!divisionTimetables[divKey]) return [];
    return divisionTimetables[divKey][day] || [];
  };

  const generateDummyRoster = (lectureId) => {
    return [
      { roll: '2024CS101', name: 'Rahul Sharma', status: 'Present', time: 'On Time' },
      { roll: '2024CS102', name: 'Aditi Verma', status: 'Present', time: 'On Time' },
      { roll: '2024CS103', name: 'Karan Singh', status: 'Absent', time: '--' },
      { roll: '2024CS104', name: 'Priya Patel', status: 'Present', time: 'Late (+5m)' },
      { roll: '2024CS105', name: 'Aman Gupta', status: 'Present', time: 'On Time' },
    ];
  };

  const renderOverview = () => (
    <>
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-slate-800">
            {selectedDivision ? `${selectedDivision} Timetable` : (viewMode === 'Weekly' ? 'Global Weekly Analysis' : 'Global Daily Timeline')}
          </h2>

          {!selectedDivision && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option>August 2026</option>
              <option>September 2026</option>
              <option>October 2026</option>
              <option>November 2026</option>
            </select>
          )}
        </div>

        {!selectedDivision && (
          <button
            onClick={() => setViewMode(viewMode === 'Weekly' ? 'Timeline' : 'Weekly')}
            className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <span>{viewMode === 'Weekly' ? 'Switch to Timeline' : 'Switch to Weekly'}</span>
          </button>
        )}
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10 w-full h-full flex flex-col">

          {selectedLecture ? (
            <div className="flex flex-col h-full bg-white">
              <button
                onClick={() => setSelectedLecture(null)}
                className="self-start mb-4 text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                ← Back to {selectedDivision} Timetable
              </button>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-slate-800">{selectedLecture.subject}</h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">
                    Room {selectedLecture.room} • {selectedLecture.time} • Topic: {selectedLecture.topic}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance Rate</div>
                  <div className="text-3xl font-black text-emerald-500">80%</div>
                </div>
              </div>

              <div className="flex-1 overflow-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-xs uppercase tracking-widest font-bold">
                      <th className="p-4">Roll No</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Check-In Time</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold text-slate-700 divide-y divide-slate-100">
                    {generateDummyRoster(selectedLecture.id).map((stu, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-4 font-mono text-slate-500">{stu.roll}</td>
                        <td className="p-4 text-slate-800">{stu.name}</td>
                        <td className="p-4 text-slate-500">{stu.time}</td>
                        <td className="p-4 text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            stu.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {stu.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          ) : selectedDivision ? (
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-cols-5 gap-4 min-w-[800px] h-full">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="flex flex-col bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                    <h4 className="text-center font-black text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-200">
                      {day}
                    </h4>
                    <div className="space-y-3 flex-1">
                      {getDaySchedule(selectedDivision, day).map((lecture) => (
                        <div
                          key={lecture.id}
                          onClick={() => setSelectedLecture(lecture)}
                          className="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all active:scale-95 group"
                        >
                          <div className="text-xs font-bold text-indigo-600 mb-1 group-hover:text-indigo-700">{lecture.time}</div>
                          <div className="text-sm font-black text-slate-800">{lecture.subject}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase mt-2">Room {lecture.room}</div>
                        </div>
                      ))}
                      {getDaySchedule(selectedDivision, day).length === 0 && (
                        <div className="text-center text-xs font-bold text-slate-300 italic mt-4">
                          No classes
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          ) : viewMode === 'Weekly' ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
              {globalWeeklyData.map((dayData, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col hover:border-indigo-200 transition-colors">
                  <div className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">{dayData.day}</div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Class</div>
                      <div className="text-sm font-bold text-slate-800">{dayData.class}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Time</div>
                      <div className="text-sm font-bold text-slate-700">{dayData.time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Attendance</div>
                      <div className="text-xl font-black text-emerald-600">{dayData.attendance}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-semibold text-slate-500">
                    Topic: {dayData.topic}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex justify-center py-8">
              <div className="max-w-2xl w-full">
                {globalTimelineData.map((item, idx) => (
                  <div key={idx} className="flex gap-6 mb-8 relative">
                    {idx !== globalTimelineData.length - 1 && (
                      <div className="absolute left-3 top-8 bottom-[-2rem] w-0.5 bg-slate-200"></div>
                    )}
                    <div className={`w-6 h-6 rounded-full mt-1 border-4 border-white shadow-sm shrink-0 z-10 ${item.color}`}></div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex-1 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-black text-indigo-600">{item.time}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                          item.status === 'Active' ? 'bg-indigo-100 text-indigo-700 animate-pulse' :
                          item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{item.subject}</h3>
                      <div className="text-sm font-medium text-slate-500 mt-1 flex gap-4">
                        <span>👥 {item.class}</span>
                        <span>📍 Room {item.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 flex justify-between items-center h-16 shadow-sm">
        <div className="flex h-full">
          {['Overview', 'Add Data', 'Student Overall'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`px-6 font-bold text-sm h-full border-b-4 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <div className="text-right">
            <div className="font-bold text-sm text-slate-800">Prof. Mukherjee</div>
            <div className="text-xs font-semibold text-slate-400">Physics Dept</div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-10 h-10 bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 flex max-w-[1600px] mx-auto w-full p-6 gap-6">
        <aside className="w-64 flex-shrink-0 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pb-3 border-b border-slate-100">
            My Classes
          </h2>

          <div className="space-y-6">
            {teacherClasses.map((yr, idx) => (
              <div key={idx}>
                <h3 className="font-extrabold text-slate-800 text-base mb-3">{yr.year}</h3>
                <div className="space-y-4 pl-1">
                  {yr.semesters.map((sem, sIdx) => (
                    <div key={sIdx}>
                      <div className="text-sm font-bold text-slate-700 mb-2">{sem.name}</div>
                      <ul className="space-y-2 pl-4 border-l-2 border-indigo-100 ml-1">
                        {sem.divisions.map((div, dIdx) => {
                          const divKey = `${sem.name} - ${div}`;
                          const isSelected = selectedDivision === divKey;
                          return (
                            <li
                              key={dIdx}
                              onClick={() => {
                                setActiveTab('Overview');
                                setSelectedDivision(divKey);
                                setSelectedLecture(null);
                              }}
                              className={`text-xs font-bold cursor-pointer transition-colors flex items-center gap-2 ${
                                isSelected ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-indigo-300'}`}></span>
                              {div}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Add Data' && <AddData />}
          {activeTab === 'Student Overall' && <StudentOverall />}
        </section>
      </main>
    </div>
  );
}