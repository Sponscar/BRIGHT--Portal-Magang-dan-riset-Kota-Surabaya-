import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, getDashboardPath } from './context/AuthContext';
import { TeamProvider } from './context/TeamContext';
import { CourseConversionProvider } from './context/CourseConversionContext';
import { SocketProvider } from './contexts/SocketContext';
import Login from './pages/auth/Login';
import AdminLayout from './pages/admin/AdminLayout';
import StudentLayout from './pages/StudentLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import StudentVerification from './pages/admin/StudentVerification';
import StudentManagement from './pages/admin/StudentManagement';
import ReviewLogbook from './pages/admin/ReviewLogbook';
import StudentDashboard from './pages/StudentDashboard';
import Register from './pages/auth/Register';
import Documents from './pages/Documents';
import Logbook from './pages/Logbook';
import Results from './pages/Results';
import Profile from './pages/Profile';
import TeamDetail from './pages/teams/TeamDetail';
import Attendance from './pages/Attendance';
import FinalReports from './pages/admin/FinalReports';
import TeamManagement from './pages/admin/TeamManagement';
import AssessmentCertificate from './pages/admin/AssessmentCertificate';
import TeamVerification from './pages/admin/TeamVerification';

// Protected Route component - supports array of allowed roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return children;
};

// Public Route (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <CourseConversionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              {/* Admin Routes (BRIDA + OPD) */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin', 'admin_opd', 'koordinator_opd']}>
                <TeamProvider>
                  <AdminLayout />
                </TeamProvider>
                </ProtectedRoute>
              }>
                <Route index element={<DashboardOverview />} />
                <Route path="verification" element={<StudentVerification />} />
                <Route path="mahasiswa" element={<StudentManagement />} />
                <Route path="logbook" element={<ReviewLogbook />} />
                <Route path="reports" element={<FinalReports />} />
                <Route path="teams" element={<TeamManagement />} />
                <Route path="team-verification" element={<TeamVerification />} />
                <Route path="results" element={<AssessmentCertificate />} />
              </Route>
              {/* Student Routes */}
              <Route path="/student" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentLayout />
                </ProtectedRoute>
              }>
                <Route index element={<StudentDashboard />} />
                <Route path="documents" element={<Documents />} />
                <Route path="logbook" element={<Logbook />} />
                <Route path="results" element={<Results />} />
                <Route path="profile" element={<Profile />} />
                <Route path="team/:teamSlug" element={<TeamDetail />} />
                <Route path="attendance" element={<Attendance />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CourseConversionProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
