import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Mail, Phone } from 'lucide-react';

const students = [
  { id: 1, name: 'Aarav Patel', class: '10-A', roll: 1, admission: 'ADM-2024-001', father: 'Rajesh Patel', mother: 'Priya Patel', phone: '+91 98765 43210', email: 'aarav.patel@email.com', address: '123 Main St, City', status: 'Active' },
  { id: 2, name: 'Diya Sharma', class: '10-A', roll: 2, admission: 'ADM-2024-002', father: 'Amit Sharma', mother: 'Sunita Sharma', phone: '+91 98765 43211', email: 'diya.sharma@email.com', address: '456 Oak Ave, City', status: 'Active' },
  { id: 3, name: 'Rohan Kumar', class: '10-A', roll: 3, admission: 'ADM-2024-003', father: 'Vikash Kumar', mother: 'Meera Kumar', phone: '+91 98765 43212', email: 'rohan.kumar@email.com', address: '789 Pine Rd, City', status: 'Active' },
];

export function Students() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500">Manage student records</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          <span>Add Student</span>
        </button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, roll, or admission..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Roll</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Class</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Admission No.</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Parents</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Contact</th>
                <th className="p-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="p-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students
                .filter(s => 
                  s.name.toLowerCase().includes(search.toLowerCase()) ||
                  s.admission.toLowerCase().includes(search.toLowerCase()) ||
                  s.roll.toString().includes(search)
                )
                .map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-900">{student.roll}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 font-medium">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.admission}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-900">{student.class}</td>
                    <td className="p-3 text-sm text-gray-500 font-mono">{student.admission}</td>
                    <td className="p-3 text-sm text-gray-900">
                      <p>{student.father} / {student.mother}</p>
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1"><Phone size={12} /> {student.phone}</span>
                        <span className="flex items-center gap-1"><Mail size={12} /> {student.email}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {student.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}