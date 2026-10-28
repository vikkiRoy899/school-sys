import { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Download, Upload, Key } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance' | 'data'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your preferences and account settings</p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="border-b">
          <nav className="flex overflow-x-auto" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 text-2xl font-bold">JT</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Teacher</h3>
                  <p className="text-gray-500">Teacher • Mathematics</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue="John Teacher" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue="john.teacher@school.edu" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input type="text" defaultValue="EMP-2024-001" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea rows={3} defaultValue="123 Teacher Colony, Education City" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-6">
              {[
                { title: 'Email Notifications', desc: 'Receive email updates for important events', enabled: true },
                { title: 'Push Notifications', desc: 'Get real-time alerts on your device', enabled: true },
                { title: 'Attendance Alerts', desc: 'Notify when students are marked absent', enabled: true },
                { title: 'Fee Reminders', desc: 'Reminders for upcoming fee due dates', enabled: false },
                { title: 'Exam Schedule', desc: 'Notifications for exam timetables and results', enabled: true },
                { title: 'System Updates', desc: 'Information about maintenance and new features', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-2xl space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg"><Key size={24} className="text-blue-600" /></div>
                  <div>
                    <h3 className="font-semibold">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Password</button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg"><Shield size={24} className="text-green-600" /></div>
                  <div>
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Enable 2FA</button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg"><Shield size={24} className="text-orange-600" /></div>
                  <div>
                    <h3 className="font-semibold">Active Sessions</h3>
                    <p className="text-sm text-gray-500">Manage your logged-in devices</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-gray-500">Chrome on Windows • Active now</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Current</span>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">Log out of all other sessions</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Light', 'Dark', 'System'].map((theme) => (
                    <button
                      key={theme}
                      className={`p-4 border-2 rounded-lg transition-colors ${theme === 'Light' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <p className="font-medium capitalize">{theme.toLowerCase()}</p>
                      <p className="text-sm text-gray-500 mt-1">{theme === 'System' ? 'Matches your device' : `${theme} mode`}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Language</h3>
                <select className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Date & Time Format</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dateFormat" defaultChecked className="text-blue-600" />
                    <span>DD/MM/YYYY (28/05/2025)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dateFormat" className="text-blue-600" />
                    <span>MM/DD/YYYY (05/28/2025)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dateFormat" className="text-blue-600" />
                    <span>YYYY-MM-DD (2025-05-28)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="max-w-2xl space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg"><Download size={24} className="text-blue-600" /></div>
                  <div>
                    <h3 className="font-semibold">Export Data</h3>
                    <p className="text-sm text-gray-500">Download your data in various formats</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 flex-wrap">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download size={18} />
                    <span>Export as CSV</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download size={18} />
                    <span>Export as PDF</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download size={18} />
                    <span>Export as Excel</span>
                  </button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg"><Upload size={24} className="text-green-600" /></div>
                  <div>
                    <h3 className="font-semibold">Import Data</h3>
                    <p className="text-sm text-gray-500">Import student records, marks, or other data</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3 flex-wrap">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Upload size={18} />
                    <span>Import CSV</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Upload size={18} />
                    <span>Import Excel</span>
                  </button>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg"><Database size={24} className="text-red-600" /></div>
                  <div>
                    <h3 className="font-semibold text-red-800">Danger Zone</h3>
                    <p className="text-sm text-red-600">Irreversible actions</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}