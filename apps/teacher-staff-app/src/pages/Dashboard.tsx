import { BookOpen, Calendar, Users, TrendingUp, Building2 } from 'lucide-react';

const statCards = [
  { title: 'Total Students', value: '1,247', icon: Users, color: 'bg-blue-500' },
  { title: 'Present Today', value: '1,182', icon: Calendar, color: 'bg-green-500' },
  { title: 'Classes', value: '42', icon: BookOpen, color: 'bg-purple-500' },
  { title: 'Teachers', value: '86', icon: Building2, color: 'bg-orange-500' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your school.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Attendance marked', class: 'Class 10-A', time: '5 min ago' },
              { action: 'Marks entered', class: 'Mathematics - Class 9-B', time: '15 min ago' },
              { action: 'New student enrolled', class: 'Aarav Patel - Class 2-B', time: '1 hour ago' },
              { action: 'Fee payment received', class: 'INV-2025-0891', time: '2 hours ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.class}</p>
                </div>
                <span className="text-sm text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Mark Attendance', icon: Calendar },
              { label: 'Enter Marks', icon: BookOpen },
              { label: 'View Students', icon: Users },
              { label: 'Generate Reports', icon: TrendingUp },
            ].map((action, i) => (
              <button key={i} className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <action.icon size={24} className="text-blue-600 mb-2" />
                <p className="font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}