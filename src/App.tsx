import { Routes, Route, Navigate } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
