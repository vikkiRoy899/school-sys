import { useState } from 'react';
import { Plus, Search, Download } from 'lucide-react';

const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'];
const terms = ['Term 1 Mid-Term', 'Term 1 Final', 'Term 2 Mid-Term', 'Annual Final'];

const marksData = [
  { id: 1, student: 'Aarav Patel', roll: 1, math: { theory: 78, practical: 18 }, science: { theory: 82, practical: 19 }, english: { theory: 75, practical: 17 }, social: { theory: 80, practical: 18 }, hindi: { theory: 85, practical: 19 } },
  { id: 2, student: 'Diya Sharma', roll: 2, math: { theory: 92, practical: 20 }, science: { theory: 88, practical: 19 }, english: { theory: 90, practical: 20 }, social: { theory: 85, practical: 18 }, hindi: { theory: 95, practical: 20 } },
  { id: 3, student: 'Rohan Kumar', roll: 3, math: { theory: 65, practical: 15 }, science: { theory: 70, practical: 16 }, english: { theory: 68, practical: 17 }, social: { theory: 72, practical: 16 }, hindi: { theory: 75, practical: 17 } },
];

export function Marks() {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTerm, setSelectedTerm] = useState('Term 1 Mid-Term');
  const [search, setSearch] = useState('');

  const getSubjectData = (student: any, subject: string) => {
    const key = subject.toLowerCase();
    return student[key] || { theory: 0, practical: 0 };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
          <p className="text-gray-500">Enter and manage student marks</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={18} />
            <span>Add Marks</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-500">Roll</th>
              <th className="p-3 text-left text-sm font-medium text-gray-500">Student Name</th>
              <th className="p-3 text-center text-sm font-medium text-gray-500">Theory (80)</th>
              <th className="p-3 text-center text-sm font-medium text-gray-500">Practical (20)</th>
              <th className="p-3 text-center text-sm font-medium text-gray-500">Total (100)</th>
              <th className="p-3 text-center text-sm font-medium text-gray-500">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {marksData
              .filter(s => s.student.toLowerCase().includes(search.toLowerCase()))
              .map((student) => {
                const subjData = getSubjectData(student, selectedSubject);
                const total = subjData.theory + subjData.practical;
                const grade = total >= 91 ? 'A1' : total >= 81 ? 'A2' : total >= 71 ? 'B1' : total >= 61 ? 'B2' : total >= 51 ? 'C1' : total >= 41 ? 'C2' : total >= 33 ? 'D' : 'E';
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-900">{student.roll}</td>
                    <td className="p-3 text-sm font-medium text-gray-900">{student.student}</td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        defaultValue={subjData.theory}
                        min={0}
                        max={80}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        defaultValue={subjData.practical}
                        min={0}
                        max={20}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 text-center text-sm font-medium text-gray-900">{total}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                        grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                        grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' :
                        grade === 'D' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}