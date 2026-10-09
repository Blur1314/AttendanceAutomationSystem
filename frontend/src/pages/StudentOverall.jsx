import React from 'react';

export default function StudentOverall() {
  const studentData = [
    { roll: '2024CS101', name: 'Rahul Sharma', attendance: 84, status: 'Good' },
    { roll: '2024CS102', name: 'Aditi Verma', attendance: 92, status: 'Excellent' },
    { roll: '2024CS103', name: 'Karan Singh', attendance: 65, status: 'Warning' },
    { roll: '2024CS104', name: 'Priya Patel', attendance: 78, status: 'Average' },
    { roll: '2024CS105', name: 'Aman Gupta', attendance: 45, status: 'Critical' },
  ];

  return (
    <>
      <div className="mb-4 px-1">
        <h2 className="text-2xl font-black text-slate-800">Student Overall Performance</h2>
      </div>
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase tracking-widest font-bold">
              <th className="p-5">Roll No</th>
              <th className="p-5">Student Name</th>
              <th className="p-5 text-center">Total Attendance</th>
              <th className="p-5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold text-slate-700 divide-y divide-slate-100">
            {studentData.map((student, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-mono text-slate-500">{student.roll}</td>
                <td className="p-5 font-bold text-slate-800">{student.name}</td>
                <td className="p-5 text-center">
                  <span className={`px-3 py-1 rounded-full font-bold ${
                    student.attendance >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {student.attendance}%
                  </span>
                </td>
                <td className="p-5 text-center">
                  <span className={`text-xs uppercase tracking-wider font-bold ${
                    student.status === 'Critical' ? 'text-rose-600' :
                    student.status === 'Warning' ? 'text-amber-500' : 'text-emerald-600'
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}