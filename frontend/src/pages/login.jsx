import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' or 'teacher'

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login router
    if (role === 'student') {
      navigate('/map');
    } else {
      navigate('/teacher');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100">

        {/* Left Side: Branding */}
        <div className="w-full md:w-5/12 bg-slate-900 p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-2xl">📡</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
              Ozymandias <br/><span className="text-indigo-400">Spatial System</span>
            </h1>
            <p className="text-slate-400 mt-4 text-sm font-medium">
              Next-generation BLE proximity attendance for modern campuses.
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hackathon Prototype v1.0</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-10">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 text-sm font-medium mb-8">Select your portal to continue.</p>

          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              👨‍🎓 Student Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                role === 'teacher' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              👨‍🏫 Professor Portal
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {role === 'student' ? 'Roll Number' : 'Employee ID'}
              </label>
              <input
                type="text"
                defaultValue={role === 'student' ? '2024CS101' : 'FAC-9921'}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="password123"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              Sign In as {role === 'student' ? 'Student' : 'Professor'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}