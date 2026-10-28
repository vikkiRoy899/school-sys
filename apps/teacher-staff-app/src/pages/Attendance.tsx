import { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Search } from 'lucide-react';

const students = [
  { id: 1, name: 'Aarav Patel', roll: 1, status: 'present' },
  { id: 2, name: 'Diya Sharma', roll: 2, status: 'present' },
  { id: 3, name: 'Rohan Kumar', roll: 3, status: 'absent' },
  { id: 4, name: 'Priya Singh', roll: 4, status: 'late' },
  { id: 5, name: 'Arjun Gupta', roll: 5, status: 'present' },
];

const statusOptions = [
  { value: 'present', label: 'Present', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
  { value: 'absent', label: 'Absent', icon: XCircle, color: 'text-red-600 bg-red-100' },
  { value: 'late', label: 'Late', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
  { value: 'excused', label: 'Excused', icon: AlertCircle, color: 'text-blue-600 bg-blue-100' },
];

export function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState(students.map(s => ({ ...s })));

  const updateStatus = (id: number, status: string) => {
    setAttendance(attendance.map(s => s.id === id ? { ...s, status } : s));
  };

  const submitAttendance = () => {
    console.log('Submitting attendance:', attendance);
    alert('Attendance submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500">Mark attendance for Class 10-A</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={submitAttendance} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Present: {attendance.filter(s => s.status === 'present').length}</span>
            <span>Absent: {attendance.filter(s => s.status === 'absent').length}</span>
            <span>Late: {attendance.filter(s => s.status === 'late').length}</span>
          </div>
        </div>

        <div className="divide-y">
          {attendance
            .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
            .map((student) => (
              <div key={student.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center text-gray-500">{student.roll}</span>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">Student ID: STU-{String(student.id).padStart(4, '0')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateStatus(student.id, opt.value)}
                        className={`p-2 rounded-lg transition-colors ${
                          attendance.find(a => a.id === student.id)?.status === opt.value
                            ? opt.color
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <opt.icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}