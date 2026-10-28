import { useState } from 'react';
import { Layout, Login, Dashboard, Attendance, Marks, Students, Settings } from './pages';

type PageType = 'login' | 'dashboard' | 'attendance' | 'marks' | 'students' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [user, setUser] = useState<{ role: string; name: string } | null>(null);

  const handleLogin = (role: string) => {
    setUser({ role, name: role === 'teacher' ? 'John Teacher' : 'Jane Principal' });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Layout
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user!}
          onLogout={handleLogout}
        >
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'attendance' && <Attendance />}
          {currentPage === 'marks' && <Marks />}
          {currentPage === 'students' && <Students />}
          {currentPage === 'settings' && <Settings />}
        </Layout>
      )}
    </div>
  );
}

export default App;