import { useState } from 'react';
import { School, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';

export function Login({ onLogin }: { onLogin: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'teacher' | 'principal' | 'accountant'>('teacher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
              <School size={32} className="text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher & Staff Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to access your school dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="grid grid-cols-3 gap-3">
                {['teacher', 'principal', 'accountant'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      role === r
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="teacher@school.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 text-center mb-4">Demo Credentials</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <User size={16} className="text-gray-400" />
                <span className="font-mono text-gray-700">teacher@school.edu / Teacher123!</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <User size={16} className="text-gray-400" />
                <span className="font-mono text-gray-700">principal@school.edu / Principal123!</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <Shield size={16} className="text-gray-400" />
                <span className="font-mono text-gray-700">accountant@school.edu / Accountant123!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}