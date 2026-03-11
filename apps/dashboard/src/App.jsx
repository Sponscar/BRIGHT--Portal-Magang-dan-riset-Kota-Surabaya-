import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseConversionProvider } from './context/CourseConversionContext';
import Login from './pages/auth/Login';
import AdminLayout from './pages/admin/AdminLayout';
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

// Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
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

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
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
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
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
            <Route path="/admin" element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardOverview />} />
              <Route path="verification" element={<StudentVerification />} />
              <Route path="mahasiswa" element={<StudentManagement />} />
              <Route path="logbook" element={<ReviewLogbook />} />
              <Route path="reports" element={<FinalReports />} />
              <Route path="teams" element={<TeamManagement />} />
              <Route path="results" element={<AssessmentCertificate />} />
            </Route>
            <Route path="/student" element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/documents" element={
              <ProtectedRoute allowedRole="student">
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/student/logbook" element={
              <ProtectedRoute allowedRole="student">
                <Logbook />
              </ProtectedRoute>
            } />
            <Route path="/student/results" element={
              <ProtectedRoute allowedRole="student">
                <Results />
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute allowedRole="student">
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/student/team/:teamSlug" element={
              <ProtectedRoute allowedRole="student">
                <TeamDetail />
              </ProtectedRoute>
            } />
            <Route path="/student/attendance" element={
              <ProtectedRoute allowedRole="student">
                <Attendance />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CourseConversionProvider>
    </AuthProvider>
  );
}

export default App;
