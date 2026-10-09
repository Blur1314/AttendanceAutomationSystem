import React, { useState } from 'react';

export default function AddData() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the success popup
    setShowPopup(true);

    // Clear the form fields (optional for a prototype, but feels realistic)
    e.target.reset();

    // Hide the popup automatically after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
      <div className="mb-4 px-1">
        <h2 className="text-2xl font-black text-slate-800">Add / Modify Records</h2>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">

        {/* SUCCESS POPUP (TOAST) */}
        {showPopup && (
          <div className="absolute top-6 right-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-4 animate-in slide-in-from-top-4 fade-in duration-300 z-50">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-sm">Attendance Updated</h4>
              <p className="text-xs font-semibold text-emerald-600 mt-0.5">Manual record successfully synced to database.</p>
            </div>
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-700 mb-6">Manual Attendance Override</h3>

        <form className="max-w-3xl space-y-6" onSubmit={handleSubmit}>

          {/* Row 1: Student & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Student Name / Roll No</label>
              <input
                type="text"
                required
                placeholder="e.g., Rahul Sharma (2024CS101)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Lecture</label>
              <input
                type="date"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Year, Sem, Div */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Academic Year</label>
              <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                <option value="">Select Year...</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Semester</label>
              <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                <option value="">Select Sem...</option>
                <option>Sem 1 (Physics)</option>
                <option>Sem 2 (Applied Sciences)</option>
                <option>Sem 5 (Electromagnetics)</option>
                <option>Sem 6 (Quantum Mechanics)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Division</label>
              <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                <option value="">Select Div...</option>
                <option>Div A</option>
                <option>Div B</option>
                <option>Div C</option>
              </select>
            </div>
          </div>

          {/* Row 3: Class & Reason */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class / Subject</label>
              <input
                type="text"
                required
                placeholder="e.g., Physics Lab"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reason for Manual Entry</label>
              <input
                type="text"
                required
                placeholder="e.g., Medical leave, Beacon malfunction"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-100">
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Upload Override Record
            </button>
          </div>

        </form>
      </div>
    </>
  );
}